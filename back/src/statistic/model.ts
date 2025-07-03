import { Table, Model, Column, ForeignKey, DefaultScope, DataType, CreatedAt } from 'sequelize-typescript';
import { City } from '../city/model';

@Table({
  underscored: true,
})
@DefaultScope(() => ({
  order: [ [ 'createdAt', 'ASC' ] ],
}))
export class Statistic extends Model {
  @Column({})
  open!: number;

  @Column({})
  close!: number;

  @Column({})
  high!: number;

  @Column({})
  low!: number;

  @Column({})
  timestamp!: string;

  @ForeignKey(() => City)
  @Column({})
  cityId!: string;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt!: Date;
}
