import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './users.model'
import { CreateUserDto } from '../dto/create-user.dto'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({ where: { username: createUserDto.username } })
    if (existingUser) {
      throw new BadRequestException('Username already exists')
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
    const user = new User({
      ...createUserDto,
      password: hashedPassword,
    })
    return user.save()
  }

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ where: { username } })
  }

  async delete(userId: string, requestUserId: string): Promise<void> {
    const user = await this.userModel.findByPk(userId)
    if (!user) {
      throw new NotFoundException('User not found')
    }
    if (user.id !== requestUserId) {
      throw new ForbiddenException('You do not have permission to delete this user')
    }
    await user.destroy()
  }
}
