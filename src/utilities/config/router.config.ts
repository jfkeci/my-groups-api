import { CommentsModule } from 'src/resources/comments/comments.module';
import { CommunitiesModule } from 'src/resources/communities/communities.module';
import { CommunityMembersModule } from 'src/resources/community-members/community-members.module';
import { PostLikesModule } from 'src/resources/post-likes/post-likes.module';
import { PostsModule } from 'src/resources/posts/posts.module';

export const routerConfig = [
  {
    path: 'posts',
    module: PostsModule,
    children: [
      {
        path: ':postId/post-likes',
        module: PostLikesModule
      },
      {
        path: ':postId/comments',
        module: CommentsModule
      }
    ]
  },
  {
    path: 'communities',
    module: CommunitiesModule,
    children: [
      {
        path: ':communityId/members',
        module: CommunityMembersModule
      }
    ]
  }
];
