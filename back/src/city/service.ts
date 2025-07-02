import { Service } from 'typedi';
import { City } from './model';

@Service()
export class CityService {
    getAll() {
        return City.unscoped().findAll();
    }

    getById(id: string) {
        return City.scope('full').findByPk(id);
    }
}
