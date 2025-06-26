import { City, OHLC } from './types';

class TemperatureStore {
    private readonly dataStore = new Map<City, Map<string, OHLC>>();

    public get(city: City) {
        return this.dataStore.get(city);
    }

    public set(city: City, cityMap: Map<string, OHLC>) {
        return this.dataStore.set(city, cityMap);
    }
}

export default new TemperatureStore();
