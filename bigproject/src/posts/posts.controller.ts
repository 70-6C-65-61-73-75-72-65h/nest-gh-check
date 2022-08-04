import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-auth.guard';
import { EditPostDto } from './types';
import JwtTwoFactorGuard from 'src/authentication/guards/jtw-2fa.guard';

@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  @UseGuards(JwtTwoFactorGuard)
  async createPost(@Body() post: EditPostDto) {
    return this.postsService.createPost(post);
  }

  @Put(':id')
  @UseGuards(JwtAuthenticationGuard)
  async replacePost(@Param('id') id: string, @Body() post: EditPostDto) {
    return this.postsService.updatePost(Number(id), post);
  }

  @Delete(':id')
  @UseGuards(JwtTwoFactorGuard)
  async deletePost(@Param('id') id: string) {
    this.postsService.deletePost(Number(id));
  }
}
