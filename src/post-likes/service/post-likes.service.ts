import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/resources/users/service/users.service';
import { PrismaService } from 'src/utilities/prisma/prisma.service';
import { PostLikeDto } from '../dto/post-like.dto';

@Injectable()
export class PostLikesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService
  ) {}

  async togglePostLike(data: PostLikeDto) {
    const user = await this.prisma.users.findUnique({
      where: { id: Number(data.user) }
    });

    if (!user) throw new NotFoundException('MYBnfe001');

    const post = await this.prisma.posts.findUnique({
      where: { id: Number(data.post) }
    });

    if (!post) throw new NotFoundException('MYBnfe001');

    const postLike = await this.prisma.post_likes.findFirst({ where: data });

    if (postLike) {
      await this.prisma.post_likes.deleteMany({ where: data });
    } else {
      await this.prisma.post_likes.create({ data: data });
    }

    let posts;

    if (post.community) {
      posts = await this.userService.getUserCommunityPosts(
        Number(data.user),
        Number(post.community)
      );
    } else {
      posts = await this.userService.getUserPostsForAllCommunities(
        Number(data.user)
      );
    }

    return posts;
  }
}
