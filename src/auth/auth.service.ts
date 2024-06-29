import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { UsersService } from '../users/users.service'
import { CreateUserDto } from 'src/dto/create-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username)
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async signIn(username: string, password: string): Promise<{ access_token: string, id: string } | void> {
    const user = await this.usersService.findOne(username)

    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    const passwordsMatch = bcrypt.compareSync(password, user.password)

    if (!passwordsMatch) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload = { id: user.id, username: user.username }
    const access_token = await this.jwtService.signAsync(payload)

    return { access_token, id: user.id }
  }

  async signup(user: CreateUserDto): Promise<{ access_token: string, id: string } | void> {
    const newUser = await this.usersService.create(user)
    return this.signIn(newUser.username, user.password)
  }
}
