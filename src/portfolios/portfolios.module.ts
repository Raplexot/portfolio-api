import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { PortfoliosService } from './portfolios.service'
import { PortfoliosController } from './portfolios.controller'
import { Portfolio } from './portfolios.model'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [SequelizeModule.forFeature([Portfolio]), forwardRef(() => AuthModule),
  ],
  providers: [PortfoliosService],
  controllers: [PortfoliosController],
})
export class PortfoliosModule {}
