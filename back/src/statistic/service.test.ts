import 'reflect-metadata';
import {createTestingModule, RedisService, TestingModule} from '../utils';
import { StatisticService } from './service';
import { City } from '../city/model';
import { Statistic } from './model';
import {CityService} from "../city/service";

const TEST_CITY_ID = 'test-city-id';
const TEST_CITY_NAME = 'TestCity';

const statisticExample: Statistic = {
    open: 10,
    close: 10.2,
    low: 10,
    high: 10.2,
    cityId: TEST_CITY_ID,
    timestamp: '2025-07-02 10:00:00',
} as Statistic;

const cityExample: City = {
    id: TEST_CITY_ID,
    name: TEST_CITY_NAME,
    statistics: [ statisticExample ],
} as City;

const cityServiceMethods = () => ({
    getById: jest.fn((id: string) => {
        if (id === TEST_CITY_ID) return Promise.resolve<City>(cityExample);
        return null;
    }),
});

describe('CityService', () => {
    let testingModule: TestingModule;
    let service: StatisticService;
    let cityServiceMock: ReturnType<typeof cityServiceMethods>;

    beforeAll(() => {
        cityServiceMock = cityServiceMethods();
        testingModule = createTestingModule()
            .mock(CityService, cityServiceMock)
            .mock(RedisService, jest.fn());
        service = testingModule.get(StatisticService);
    });

    afterAll(() => {
        testingModule.reset();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(testingModule).toBeDefined();
        expect(service).toBeDefined();
        expect(cityServiceMock).toBeDefined();
    });

    describe('getDataById', () => {
        it('should return data by city id', async () => {
            const getOneSpy = jest.spyOn(cityServiceMock, 'getById');
            const resp = await service.getDataById(TEST_CITY_ID);
            expect(resp).toEqual([ statisticExample ]);
            expect(getOneSpy).toHaveBeenCalledTimes(1);
        });
    });
});