import { Service } from 'typedi';
import { TemperatureDto } from './types';
import { NotFoundError, REDIS_CHANNEL, RedisService } from '../utils';
import { CityService } from '../city/service';
import { Statistic } from './model';
import { logger } from '../utils/logger';

@Service()
export class StatisticService {
  constructor(
    private readonly cityService: CityService,
    private readonly redisService: RedisService) {
  }

  public async getDataById(id: string) {
    const city = await this.cityService.getById(id);
    if (!city) throw new NotFoundError('City not found!');
    return city.statistics || [];
  }

  public listenData() {
    this.redisService.getSubscriber().subscribe(REDIS_CHANNEL, async (dataString: string) => {
      try {
        const data: TemperatureDto = JSON.parse(dataString);
        await this.processTemperatureData(data);
      } catch (e: unknown) {
        logger.error(e, `Cannot process data from redis channel: ${REDIS_CHANNEL}`);
      }
    });
  }

  private async processTemperatureData(data: TemperatureDto) {
    const { city, temperature: gotTemperature, timestamp } = data;

    const cityEntry = await this.cityService.getByCityName(city);
    if (!cityEntry) return;

    const temperature = gotTemperature;
    // todo add for testing!!
    // const temperature = gotTemperature + Math.round((Math.random() * (2.02 + 2.02) - 2.02) * 100) / 100;
    const timestampKey = this.buildTimestampString(timestamp); // hour as a key!
    let statisticEntry = await Statistic.unscoped().findOne({
      where: {
        cityId: cityEntry.id,
        timestamp: timestampKey,
      },
    });

    if (!statisticEntry)
      statisticEntry = await Statistic.create(this.buildNewStatisticData(cityEntry.id, timestampKey, temperature));

    await this.updateOldTemperatureValues(statisticEntry, temperature);
  }

  private buildTimestampString(initialTimestamp: string) {
    // adjust our data:
    const date = new Date(initialTimestamp);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.toISOString(); // an hour as a key!
  }

  private async updateOldTemperatureValues(statistic: Statistic, temperature: number) {
    statistic.close = temperature;
    if (temperature > statistic.high) statistic.high = temperature;
    if (temperature < statistic.low) statistic.low = temperature;
    if (statistic.changed()) await statistic.save();
  }

  private buildNewStatisticData(cityId: string, hourKey: string, temperature: number): Partial<Statistic> {
    return {
      open: temperature,
      high: temperature,
      low: temperature,
      close: temperature,
      timestamp: hourKey,
      cityId,
    };
  }
}
