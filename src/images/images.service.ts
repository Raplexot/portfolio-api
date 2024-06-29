import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Image } from './images.model'
import { CreateImageDto } from '../dto/create-image.dto'
import { Portfolio } from '../portfolios/portfolios.model'
import { Comment } from './comments.model'
import { PortfoliosService } from 'src/portfolios/portfolios.service'

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image)
    private readonly imageModel: typeof Image,
    @InjectModel(Portfolio)
    private readonly portfolioModel: typeof Portfolio,
    private readonly portfolioService: PortfoliosService,
  ) {}

  async validateImageUniqueness(portfolioId: string, name: string) {
    let maybeImage: Image | null = null
    try {
      maybeImage = await this.imageModel.findOne({ where: { portfolioId: portfolioId, name: name } })
    } catch (error) { return }
  
    if (maybeImage) {
      throw new BadRequestException('Image with the same name already exists for the portfolio')
    }
  }

  async create(createImageDto: CreateImageDto, userId: string): Promise<Image> {
    const { portfolioId, name } = createImageDto
    try {
      await this.portfolioService.validateUserPortfolio(portfolioId, userId)
      await this.validateImageUniqueness(portfolioId, name)
    } catch (error) {
      throw new BadRequestException(error.message)
    }

    const { comments: commentsData, ...imageData } = createImageDto
    const image = await new Image(imageData).save()

    await Promise.all(commentsData?.map(async (commentText) => {
      const comment  = new Comment({ content: commentText, imageId: image.id })
      await comment.save()
    }))

    return await this.imageModel.findByPk(image.id, {
      include: [
        {
          model: Comment,
          attributes: ['id', 'content'],
        },
      ],
    })
  }

  async getImageFeed() {
    return this.imageModel.findAll({
      include: [
        {
          model: Portfolio,
          attributes: ['id', 'name'],
        },
        {
          model: Comment,
          attributes: ['id', 'content'],
        },
      ],
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'name', 'description', 'createdAt', 'imageUrl'],
    })
  }
  

  async findAll(): Promise<Image[]> {
    return this.imageModel.findAll()
  }

  async findOne(id: string): Promise<Image> {
    const portfolio = await this.imageModel.findByPk(id)
    if (!portfolio) {
      throw new NotFoundException('Portfolio not found')
    }
    return portfolio
  }

  async delete(imageId: string, userId: string): Promise<void> {
    const image = await this.imageModel.findOne({ where: { id: imageId } })
    if (!image) {
      throw new NotFoundException('Image not found')
    }
    const portfolio = await this.portfolioModel.findOne({ where: { id: image.portfolioId } })
    if (portfolio.userId !== userId) {
      throw new ForbiddenException('You do not have permission to delete this image')
    }

    const comments = await Comment.findAll({ where: { imageId } })
    await Promise.all(comments.map((comment) => comment.destroy()))
    await image.destroy()
  }
}
