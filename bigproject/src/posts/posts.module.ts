import { DatabaseModule } from './../database/database.module';
import PostModel from '../database/models/post.model';
import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  imports: [DatabaseModule],

  controllers: [PostsController],
  providers: [
    PostsService,
    {
      provide: 'POST_MODEL',
      useValue: PostModel,
    },
  ],
  exports: [PostsService],
})
export class PostsModule {}
