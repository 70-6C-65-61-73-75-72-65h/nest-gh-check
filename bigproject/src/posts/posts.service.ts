import {
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { EditPostDto } from './types';
import PostModel from '../database/models/post.model';
import { NetworkErrors } from 'src/constants';
import { Model } from 'sequelize-typescript';

@Injectable()
@UseInterceptors(ClassSerializerInterceptor)
export class PostsService {
  constructor(
    @Inject('POST_MODEL')
    private postsRepository: typeof PostModel,
  ) {}

  async getAllPosts() {
    return await this.postsRepository.findAll({ raw: true });
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findByPk(id);
    if (post) {
      return post.get({ plain: true });
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async updatePost(id: number, post: EditPostDto) {
    await this.postsRepository.update(post, { where: { id } });
    const updatedPost = await this.postsRepository.findByPk(id);

    if (updatedPost) {
      return updatedPost.get({ plain: true });
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async getPostByValue(value: string) {
    return await this.postsRepository.findOne({ where: { title: value } });
  }

  async checkIfPostWithSuchTitleExists(postDTO: EditPostDto) {
    const candidate = await this.getPostByValue(postDTO.title);
    if (candidate) {
      throw new HttpException(
        NetworkErrors.POST_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createPost(postDTO: EditPostDto) {
    await this.checkIfPostWithSuchTitleExists(postDTO);
    const createdInfo = await this.postsRepository.create(postDTO);
    return createdInfo.get({ plain: true });
  }

  async deletePost(id: number) {
    const deleteResponseNumber = await this.postsRepository.destroy({
      where: { id },
    });
    if (!deleteResponseNumber) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
