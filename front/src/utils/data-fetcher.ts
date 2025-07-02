import { BACK_END_BASE_URL, CANDLE_ENDPOINT, CITY_ENDPOINT } from '../constants';
import type { City, OHLC } from '../components/app/types.ts';

export async function fetchStatistic(cityId: string): Promise<OHLC[]> {
    return await getBackEndResponse<OHLC[]>(`${CANDLE_ENDPOINT}/${cityId}`);
}

export async function fetchCities(): Promise<City[]> {
    return await getBackEndResponse<City[]>(`${CITY_ENDPOINT}`);
}

async function getBackEndResponse<T>(url: string): Promise<T | never> {
    const response = await fetch(`${BACK_END_BASE_URL}/${url}`);
    if (!response.ok) throw new Error(`There is no resource by request: ${url}`);

    const jsonData = await response.json();
    if (!jsonData) throw new Error('No Response from server');
    if (!Array.isArray(jsonData)) throw new Error('There must have been an array');
    return jsonData as T;
}
