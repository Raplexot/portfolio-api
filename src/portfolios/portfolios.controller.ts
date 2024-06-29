import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, ValidationPipe, BadRequestException } from '@nestjs/common'
import { PortfoliosService } from './portfolios.service'
import { CreatePortfolioDto } from '../dto/create-portfolio.dto'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('portfolios')
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
  @Body(new ValidationPipe({ exceptionFactory: (errors) => new BadRequestException(errors) })) createPortfolioDto: CreatePortfolioDto,  
    @Req() req
  ) {
    console.log('req.user', req.user)
    return this.portfoliosService.create(createPortfolioDto, req.user.id)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    if (!id) {
      throw new BadRequestException('Portfolio id is required')
    }

    return this.portfoliosService.delete(id, req.user.id)
  }
}
