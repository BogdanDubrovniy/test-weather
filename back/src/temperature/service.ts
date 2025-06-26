import { City, OHLC, TemperatureDto } from './types';
import TemperatureStore from './store';
import { NotFoundError } from '../utils';

class TemperatureService {
    private readonly dataStore = TemperatureStore;

    public getDataByCity(city: City) {
        const cityMap = this.dataStore.get(city);
        if (!cityMap) throw new NotFoundError('City not found!');
        return Array.from(cityMap.values()).sort((a, b) => a.timestamp.localeCompare(b.timestamp));
    }

    public processTemperatureData(data: TemperatureDto) {
        const { city, temperature: gotTemperature, timestamp } = data;

        // todo add for testing!!
        // const temperature = gotTemperature + Math.round((Math.random() * (2.02 + 2.02) - 2.02) * 100) / 100;
        //

        const temperature = gotTemperature;
        const hourKey = this.buildTimestampString(timestamp); // hour as a key!

        let cityMap = this.dataStore.get(city);
        if (!cityMap) {
            cityMap = new Map<string, OHLC>();
            this.dataStore.set(city, cityMap);
        }

        let ohlc = cityMap.get(hourKey);
        if (!ohlc) {
            cityMap.set(hourKey, this.buildNewChartData(hourKey, temperature));
            return;
        }

        this.updateOldTemperatureValues(ohlc, temperature);
    }

    private buildTimestampString(initialTimestamp: string) {
        // adjust our data:
        const date = new Date(initialTimestamp);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.toISOString(); // an hour as a key!
    }

    private updateOldTemperatureValues(ohlc: OHLC, temperature: number) {
        ohlc.close = temperature;
        if (temperature > ohlc.high) ohlc.high = temperature;
        if (temperature < ohlc.low) ohlc.low = temperature;
    }

    private buildNewChartData(hourKey: string, temperature: number): OHLC {
        return {
            open: temperature,
            high: temperature,
            low: temperature,
            close: temperature,
            timestamp: hourKey,
        };
    }
}

export default new TemperatureService();
