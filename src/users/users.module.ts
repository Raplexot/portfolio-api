import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User } from './users.model'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [SequelizeModule.forFeature([User]), forwardRef(() => AuthModule),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
