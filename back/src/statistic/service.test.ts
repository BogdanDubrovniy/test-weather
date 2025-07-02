// import { City, OHLC, TemperatureDto } from './types';
// import TemperatureStore from './store';
// import { NotFoundError } from '../utils';
// import {StatisticService} from "./service";
//
// describe('TemperatureService', () => {
//     let mockDataStore: Map<City, Map<string, OHLC>>;
//     const service = StatisticService;
//
//     beforeEach(() => {
//         mockDataStore = new Map<City, Map<string, OHLC>>();
//         jest.spyOn(TemperatureStore, 'get').mockImplementation(city => mockDataStore.get(city));
//         jest.spyOn(TemperatureStore, 'set').mockImplementation((city, map) => mockDataStore.set(city, map));
//     });
//
//     afterEach(() => {
//         jest.clearAllMocks();
//     });
//
//     describe('getDataByCity', () => {
//         it('should return data', () => {
//             const city: City = 'Berlin';
//             mockDataStore.set(city, new Map<string, OHLC>().set('2025-01-01T11:00:00.000Z', {
//                 open: 10.5,
//                 close: 25.7,
//                 high: 17.0,
//                 low: 11.0,
//                 timestamp: '2025-01-01T11:00:00.000Z',
//             }));
//
//             const result = tempService.getDataByCity(city);
//
//             expect(result).toEqual([
//                 {
//                     open: 10.5,
//                     close: 25.7,
//                     high: 17.0,
//                     low: 11.0,
//                     timestamp: '2025-01-01T11:00:00.000Z',
//                 },
//             ]);
//             expect(TemperatureStore.get).toHaveBeenCalledWith(city);
//         });
//
//         it('should throw an error', () => {
//             expect(() => service.getDataByCity('dfdfdf' as City)).toThrow(
//                 new NotFoundError('City not found!'),
//             );
//         });
//     });
//
//     describe('processTemperatureData', () => {
//         it('should set new data', () => {
//             const city = 'Tokyo';
//             expect(TemperatureStore.get(city)?.values()).toBe(undefined);
//             const data: TemperatureDto = { temperature: 25, timestamp: '2025-01-01T11:00:00.000Z', city: 'Tokyo' };
//             expect(tempService.processTemperatureData(data)).toEqual(undefined);
//             expect(tempService.getDataByCity(city)).toEqual([{
//                 open: 25,
//                 high: 25,
//                 low: 25,
//                 close: 25,
//                 timestamp: '2025-01-01T11:00:00.000Z',
//             }]);
//         });
//
//         it('should update data', () => {
//             const city: City = 'CapeTown';
//             mockDataStore.set(city, new Map<string, OHLC>().set('2025-01-01T11:00:00.000Z', {
//                 open: 10.5,
//                 close: 15.7,
//                 high: 17.0,
//                 low: 11.0,
//                 timestamp: '2025-01-01T11:00:00.000Z',
//             }));
//             expect(TemperatureStore.get(city)?.values()).not.toBe(undefined);
//
//             const data: TemperatureDto = { temperature: 25, timestamp: '2025-01-01T11:00:00.000Z', city: 'CapeTown' };
//             expect(tempService.processTemperatureData(data)).toEqual(undefined);
//             expect(tempService.getDataByCity(city)).toEqual([{
//                 open: 10.5,
//                 high: 25,
//                 low: 11,
//                 close: 25,
//                 timestamp: '2025-01-01T11:00:00.000Z',
//             }]);
//         });
//     });
// });