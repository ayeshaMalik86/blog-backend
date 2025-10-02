import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from './entities/blog-post.entity';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost)
    private blogPostRepository: Repository<BlogPost>,
  ) {}

  async create(createBlogPostDto: CreateBlogPostDto): Promise<BlogPost> {
    const blogPost = this.blogPostRepository.create(createBlogPostDto);
    return this.blogPostRepository.save(blogPost);
  }

  async findAll(): Promise<BlogPost[]> {
    return this.blogPostRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<BlogPost> {
    const blogPost = await this.blogPostRepository.findOne({ where: { id } });
    if (!blogPost) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }
    return blogPost;
  }

  async update(
    id: number,
    updateBlogPostDto: UpdateBlogPostDto,
  ): Promise<BlogPost> {
    const blogPost = await this.findOne(id);
    Object.assign(blogPost, updateBlogPostDto);
    return this.blogPostRepository.save(blogPost);
  }

  async remove(id: number): Promise<void> {
    const blogPost = await this.findOne(id);
    await this.blogPostRepository.remove(blogPost);
  }
}
