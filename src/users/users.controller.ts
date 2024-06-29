import { Controller, Post, Body, UseGuards, Request, Delete, Param, Res } from '@nestjs/common'

import { UsersService } from './users.service'
import { Response } from 'express'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req, @Res() res: Response) {
    try {
      await this.usersService.delete(id, req.user.id)
    } catch (error) {
      res.status(error.status).json({ message: error.message })
      return
    }

    res.clearCookie('jwt')
    res.status(200).json()
  }
}
