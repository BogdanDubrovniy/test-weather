import { Column, Table, Model, DataType, HasMany, Scopes } from 'sequelize-typescript';
import { Statistic } from '../statistic/model';

@Table({
  underscored: true,
})
@Scopes(() => ({
  full: {
    include: [ {
      model: Statistic,
      separate: true,
      order: [ [ 'createdAt', 'ASC' ] ],
    } ],
  },
}))
export class City extends Model {
  @Column({ type: DataType.STRING })
  name!: string;

  @HasMany(() => Statistic)
  statistics!: Statistic[];
}
