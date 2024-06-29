import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ImagesService } from './images.service'
import { ImagesController } from './images.controller'
import { Image } from './images.model'
import { AuthModule } from 'src/auth/auth.module'
import { Portfolio } from 'src/portfolios/portfolios.model'
import { PortfoliosService } from 'src/portfolios/portfolios.service'
import { Comment } from './comments.model'

@Module({
  imports: [SequelizeModule.forFeature([Image, Portfolio, Comment]), forwardRef(() => AuthModule),
  ],
  providers: [ImagesService, PortfoliosService],
  controllers: [ImagesController],
})
export class ImagesModule {}
