import 'reflect-metadata';
import { createTestingModule, TestingModule } from '../utils';
import { CityService } from './service';
import { City } from './model';
import { Statistic } from '../statistic/model';

const TEST_CITY_ID = 'test-city-id';

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
  name: 'TestCity',
  statistics: [ statisticExample ],
} as City;

jest.mock('./model', () => {
  const cityMethods = {
    findAll: jest.fn(() => Promise.resolve<City[]>([ cityExample ])),
    findByPk: jest.fn((id: string) => {
      if (id === TEST_CITY_ID) return Promise.resolve<City>(cityExample);
      return null;
    }),
  };

  return {
    City: {
      unscoped: jest.fn(() => cityMethods),
      scope: jest.fn(() => cityMethods),
      ...cityMethods,
    },
  };
});

describe('CityService', () => {
  let testingModule: TestingModule;
  let service: CityService;

  beforeAll(() => {
    testingModule = createTestingModule();
    service = testingModule.get(CityService);
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
  });

  describe('getAll', () => {
    it('should return an array of all cities', async () => {
      const getAllSpy = jest.spyOn(City, 'findAll');
      const resp = await service.getAll();
      expect(resp).toEqual([ cityExample ]);
      expect(getAllSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById', () => {
    it('should return a city', async () => {
      const getOneSpy = jest.spyOn(City, 'findByPk');
      const resp = await service.getById(TEST_CITY_ID);
      expect(resp).toEqual(cityExample);
      expect(getOneSpy).toHaveBeenCalledTimes(1);
    });

    it('should return null', async () => {
      const getOneSpy = jest.spyOn(City, 'findByPk');
      const resp = await service.getById('sdsdsds');
      expect(resp).toEqual(null);
      expect(getOneSpy).toHaveBeenCalledTimes(1);
    });
  });
});
