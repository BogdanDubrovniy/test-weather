import { BACK_END_BASE_URL, CANDLE_ENDPOINT } from '../constants';
import type { City } from './types.ts';
import type { OHLC } from '../components/app/types.ts';

export async function fetchStatistic(city: City): Promise<OHLC[]> {
    return await getBackEndResponse<OHLC[]>(`${CANDLE_ENDPOINT}?city=${encodeURIComponent(city)}`);
}

async function getBackEndResponse<T>(url: string): Promise<T | never> {
    const response = await fetch(`${BACK_END_BASE_URL}/${url}`);
    if (!response.ok) throw new Error(`There is no resource by request: ${url}`);

    const text = await response.text();
    if (!text) throw new Error('No Response from server');

    let jsonData;
    try {
        jsonData = JSON.parse(text);
    } catch (e) {
        console.error('Cannot parse JSON:', text);
        throw new Error('Cannot parse JSON');
    }

    if (!Array.isArray(jsonData)) throw new Error('There must have been an array');

    return jsonData as T;
}
