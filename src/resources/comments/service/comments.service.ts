import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import {
  userSelectFields,
  UsersService
} from 'src/resources/users/service/users.service';
import { PrismaService } from 'src/utilities/prisma/prisma.service';
import { CommentOwnerDto } from '../dto/comment-id-param.dto';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService
  ) {}

  async createPostComment(postId: number, data: CreateCommentDto) {
    const post = await this.prisma.posts.findUnique({ where: { id: postId } });

    if (!post) throw new NotFoundException('MYBnfe008');

    const user = await this.prisma.users.findUnique({
      where: { id: data.createdBy }
    });

    if (!user) throw new NotFoundException('MYBnfe001');

    const comment = await this.prisma.comments.create({
      data: {
        createdBy: data.createdBy,
        text: data.text,
        post: postId
      }
    });

    if (!comment) throw new BadRequestException('MYBbre006');

    let posts;

    if (data.community) {
      posts = await this.userService.getUserCommunityPosts(
        Number(data.createdBy),
        Number(data.community)
      );
    } else {
      posts = await this.userService.getUserPostsForAllCommunities(
        Number(data.createdBy)
      );
    }

    return posts;
  }

  async isUserCommentOwner(data: CommentOwnerDto) {
    console.log(data);

    const comment = await this.prisma.comments.findFirst({ where: data });

    console.log(comment);

    if (comment) {
      return true;
    }

    return false;
  }

  async getPostComments(postId: number) {
    const postWithComments = await this.prisma.posts.findUnique({
      where: { id: postId },
      include: {
        comments: { include: { users: { select: userSelectFields } } }
      }
    });

    if (!postWithComments) {
      throw new NotFoundException('MYBnfe008');
    }

    return postWithComments;
  }

  async getPostComment(postId: number, commentId: number) {
    const post = await this.prisma.posts.findUnique({ where: { id: postId } });

    if (!post) throw new NotFoundException('MYBnfe008');

    const comment = await this.prisma.comments.findUnique({
      where: { id: commentId }
    });

    if (!comment) {
      throw new NotFoundException('MYBnfe009');
    }

    return comment;
  }

  async updatePostComment(
    postId: number,
    commentId: number,
    data: UpdateCommentDto
  ) {
    const post = await this.prisma.posts.findUnique({ where: { id: postId } });

    if (!post) throw new NotFoundException('MYBnfe008');

    const comment = await this.prisma.comments.update({
      where: { id: commentId },
      data: { text: data.text }
    });

    if (!comment) throw new NotFoundException('MYBnfe009');

    let posts;

    if (data.community) {
      posts = await this.userService.getUserCommunityPosts(
        Number(comment.createdBy),
        Number(data.community)
      );
    } else {
      posts = await this.userService.getUserPostsForAllCommunities(
        Number(comment.createdBy)
      );
    }

    return posts;
  }

  async deletePostComment(
    postId: number,
    commentId: number,
    community?: number
  ) {
    const post = await this.prisma.posts.findUnique({ where: { id: postId } });

    if (!post) throw new NotFoundException('MYBnfe008');

    const comment = await this.prisma.comments.findUnique({
      where: { id: commentId }
    });

    if (!comment) throw new NotFoundException('MYBnfe009');

    await this.prisma.comments.delete({
      where: { id: commentId }
    });

    let posts;

    if (community) {
      posts = await this.userService.getUserCommunityPosts(
        Number(comment.createdBy),
        Number(community)
      );
    } else {
      posts = await this.userService.getUserPostsForAllCommunities(
        Number(comment.createdBy)
      );
    }

    return posts;
  }
}
