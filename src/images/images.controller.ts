import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req, ValidationPipe, BadRequestException } from '@nestjs/common'
import { ImagesService } from './images.service'
import { CreateImageDto } from '../dto/create-image.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { Public } from 'src/decorators/public.decorator'

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
  @Body(new ValidationPipe({ exceptionFactory: (errors) => new BadRequestException(errors) })) createImageDto: CreateImageDto, 
    @Req() req
  ) {
    return this.imagesService.create(createImageDto, req.user.id)
  }

  @Public()
  @Get('feed')
  async getImageFeed() {
    return this.imagesService.getImageFeed()
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    if (!id) {
      throw new BadRequestException('Image id is required')
    }

    return this.imagesService.delete(id, req.user.id)
  }
}
