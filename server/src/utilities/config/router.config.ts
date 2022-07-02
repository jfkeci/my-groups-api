import { PostLikesModule } from 'src/resources/post-likes/post-likes.module';
import { PostsModule } from 'src/resources/posts/posts.module';

export const routerConfig = [
  {
    path: 'posts',
    module: PostsModule,
    children: [
      {
        path: ':postId/post-likes',
        module: PostLikesModule,
      },
    ],
  },
];
