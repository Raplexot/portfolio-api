import { Table, Column, Model, DataType, HasMany, PrimaryKey, Default } from 'sequelize-typescript'
import { Portfolio } from '../portfolios/portfolios.model'

@Table
export class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
    id: string

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
    username: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    password: string

  @HasMany(() => Portfolio)
    portfolios: Portfolio[]
}
