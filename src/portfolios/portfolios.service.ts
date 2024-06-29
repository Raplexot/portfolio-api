import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Portfolio } from './portfolios.model'
import { CreatePortfolioDto } from '../dto/create-portfolio.dto'

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectModel(Portfolio)
    private readonly portfolioModel: typeof Portfolio,
  ) {}

  async validateUserPortfolio(portfolioId: string, userId: string) {
    let portfolio
    try {
      portfolio = await this.portfolioModel.findOne({ where: { id: portfolioId } })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  
    if (!portfolio) {
      throw new BadRequestException(`Portfolio with ID ${portfolioId} not found`)
    }
    if (portfolio.userId !== userId) {
      throw new ForbiddenException('You do not have permission to add an image to this portfolio')
    }
  }

  async create(createPortfolioDto: CreatePortfolioDto, userId: string): Promise<Portfolio> {
    console.log('@@@@@userId', userId)
    //Check if portfolio with the same name already exists for the user
    const existingPortfolio = await this.portfolioModel.findOne({ where: { name: createPortfolioDto.name, userId } })
    if (existingPortfolio) {
      throw new BadRequestException('Portfolio with the same name already exists for the user')
    }

    const portfolio = new Portfolio({
      ...createPortfolioDto,
      userId,
    })
    return portfolio.save()
  }

  async findAll(): Promise<Portfolio[]> {
    return this.portfolioModel.findAll()
  }

  async findOne(id: string): Promise<Portfolio> {
    const portfolio = await this.portfolioModel.findByPk(id)
    if (!portfolio) {
      throw new NotFoundException('Portfolio not found')
    }
    return portfolio
  }

  async delete(portfolioId: string, userId: string): Promise<void> {
    const portfolio = await this.portfolioModel.findOne({ where: { id: portfolioId, userId } })
    if (!portfolio) {
      throw new NotFoundException('Portfolio not found')
    }
    if (portfolio.userId !== userId) {
      throw new ForbiddenException('You do not have permission to delete this portfolio')
    }
    await portfolio.destroy()
  }
}
