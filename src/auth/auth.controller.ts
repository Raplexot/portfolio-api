
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { Public } from 'src/decorators/public.decorator'
import { CreateUserDto } from 'src/dto/create-user.dto'
import { SignInDto } from 'src/dto/sign-in.dto'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  appendCookie(response: Response, loginResult: { access_token: string, id: string } | void) {
    if (loginResult) {
      const token = loginResult.access_token
      response.cookie('jwt', token, { httpOnly: true })
      response.status(HttpStatus.OK).json(loginResult) // Explicitly send the response
      return
    }
    
    response.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' })
  }

  @UseGuards(AuthGuard)
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body(new ValidationPipe({ exceptionFactory: (errors) => new BadRequestException(errors) })) signInDto: SignInDto,
      @Res() response: Response, @Request() req,
  ): Promise<{ access_token: string } | void> {
    if (req.cookies.jwt) {
      throw new BadRequestException('You are already logged in')
    }

    const result = await this.authService.signIn(signInDto.username, signInDto.password)
    this.appendCookie(response, result) 
  }


  @UseGuards(AuthGuard)
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(
    @Body(new ValidationPipe({ exceptionFactory: (errors) => new BadRequestException(errors) })) createUserDto: CreateUserDto,
      @Res() response: Response, @Request() req,
  ): Promise<{ access_token: string } | void> {
    if (req.cookies.jwt) {
      throw new BadRequestException('You need to log out before registering a new account')
    }

    const result = await this.authService.signup(createUserDto)
    this.appendCookie(response, result)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt')
    return { success: true }
  }
}