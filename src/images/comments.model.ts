import { Table, Column, Model, PrimaryKey, Default, DataType, ForeignKey, BelongsTo, CreatedAt } from 'sequelize-typescript'
import { Image } from '../images/images.model'

@Table
export class Comment extends Model<Comment> {
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
    content: string

  @ForeignKey(() => Image)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
    imageId: string

  @BelongsTo(() => Image)
    image: Image

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
    createdAt: Date
}
