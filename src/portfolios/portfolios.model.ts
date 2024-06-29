import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany, PrimaryKey, Default } from 'sequelize-typescript'
import { User } from '../users/users.model'
import { Image } from '../images/images.model'

@Table
export class Portfolio extends Model<Portfolio> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
    id: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    name: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    description: string

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
    userId: string

  @BelongsTo(() => User)
    user: User

  @HasMany(() => Image)
    images: Image[]
}
