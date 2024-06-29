import { Table, Column, Model, PrimaryKey, Default, DataType, ForeignKey, BelongsTo, CreatedAt, HasMany } from 'sequelize-typescript'
import { Portfolio } from '../portfolios/portfolios.model'
import { Comment } from './comments.model'
@Table
export class Image extends Model<Image> {
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
    imageUrl: string

  @ForeignKey(() => Portfolio)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
    portfolioId: string

  @BelongsTo(() => Portfolio)
    portfolio: Portfolio

  @HasMany(() => Comment)
    comments: Comment[]

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
    createdAt: Date
}
