import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { PortfoliosModule } from './portfolios/portfolios.module'
import { ImagesModule } from './images/images.module'
import { AppController } from './app.controller'
import { UsersController } from './users/users.controller'
import { ImagesController } from './images/images.controller'
import { AuthController } from './auth/auth.controller'
import { PortfoliosController } from './portfolios/portfolios.controller'
import { AppService } from './app.service'
import { ImagesService } from './images/images.service'
import { UsersService } from './users/users.service'
import { AuthService } from './auth/auth.service'
import { PortfoliosService } from './portfolios/portfolios.service'
import { User } from './users/users.model'
import { Portfolio } from './portfolios/portfolios.model'
import { Image } from './images/images.model'
import { Comment } from './images/comments.model'
@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    SequelizeModule.forFeature([Image]),
    SequelizeModule.forFeature([Portfolio]),
    SequelizeModule.forFeature([Comment]),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'portfolio_db',
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    PortfoliosModule,
    ImagesModule,
  ],
  controllers: [AppController, UsersController, ImagesController, AuthController, PortfoliosController],
  providers: [AppService, ImagesService, UsersService, AuthService, PortfoliosService],
})

export class AppModule {}
