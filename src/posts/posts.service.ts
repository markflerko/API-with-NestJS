import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreatePostDto } from './dto/create-port.dto';
import { UpdatePostDto } from './dto/update-port.dto';
import { Post } from './post.interface';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  getAllPosts() {
    return this.posts;
  }

  getPostById(id: string) {
    return this.posts.find((item) => item.id === id);
  }

  createPost(dto: CreatePostDto) {
    const post = { ...dto, id: uuid.v4() };
    this.posts.push(post);
    return post;
  }

  updatePost(id: string, dto: UpdatePostDto) {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id === id) {
        this.posts[i] = dto;
        return this.posts[i];
      }
    }

    return 'item not found';
  }

  deletePost(id: string) {
    let index = 0;

    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id === id) {
        index = i;
      }
    }

    return this.posts.splice(index, 1);
  }
}
