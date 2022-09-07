import { PostsModule } from 'src/resources/posts/posts.module';
import { CommunitiesModule } from 'src/resources/communities/communities.module';
import { CommunityMembersModule } from 'src/resources/community-members/community-members.module';

export const routerConfig = [
  {
    path: 'posts',
    module: PostsModule
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
