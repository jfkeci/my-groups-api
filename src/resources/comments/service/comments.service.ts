import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from 'src/utilities/prisma/prisma.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPostComment(postId: number, data: CreateCommentDto) {
    const post = await this.prisma.posts.findUnique({ where: { id: postId } });

    if (!post) throw new NotFoundException('No post found');

    const user = await this.prisma.users.findUnique({
      where: { id: data.createdBy }
    });

    if (!user) throw new NotFoundException('No user found');

    const comment = await this.prisma.comments.create({
      data: {
        ...data,
        post: postId
      }
    });

    if (!comment) throw new BadRequestException('Failed to create comment');

    return comment;
  }

  async getPostComments(postId: number) {
    const postWithComments = await this.prisma.posts.findUnique({
      where: { id: postId },
      include: {
        comments: {
          include: {
            users: {
              select: {
                username: true,
                firstName: true,
                lastName: true,
                image: true,
                email: true
              }
            }
          }
        }
      }
    });

    if (!postWithComments) {
      throw new NotFoundException('No post found');
    }

    return postWithComments;
  }

  async getPostComment(postId: number, commentId: number) {
    const post = await this.prisma.posts.findUnique({ where: { id: postId } });

    if (!post) throw new NotFoundException('No post found');

    const comment = await this.prisma.comments.findUnique({
      where: { id: commentId }
    });

    if (!comment) {
      throw new NotFoundException('No comment found');
    }

    return comment;
  }

  async updatePostComment(
    postId: number,
    commentId: number,
    data: UpdateCommentDto
  ) {
    const post = await this.prisma.posts.findUnique({ where: { id: postId } });

    if (!post) throw new NotFoundException('No post found');

    const comment = await this.prisma.comments.update({
      where: { id: commentId },
      data: { text: data.text }
    });

    if (!comment) throw new NotFoundException('No comment found');

    return comment;
  }

  async deletePostComment(postId: number, commentId: number) {
    const post = await this.prisma.posts.findUnique({ where: { id: postId } });

    if (!post) throw new NotFoundException('No post found');

    const comment = await this.prisma.comments.delete({
      where: { id: commentId }
    });

    if (!comment) throw new NotFoundException('No comment found');

    return comment;
  }
}
