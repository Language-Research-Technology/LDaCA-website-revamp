import React from 'react';
import Post from 'types/post';
import PostSummary from 'components/PostSummary';
import {getAllPosts} from 'lib/postMarkdown';
import Prose from 'components/Prose';
import Title from 'components/Title';

type Props = {
  posts: Post[];
};

export default function Posts({posts}: Props) {
  return (
    <div>
      <Title pageTitle="Posts" />
      <Prose>
        <h1>Posts</h1>
      </Prose>
      <div className="mt-8 flex flex-col space-y-2">
        {posts
          .filter(post => !(post.draft ?? false))
          .map(post => (
            <PostSummary
              key={post.title}
              title={post.title}
              author={post.author}
              date={post.date}
              slug={post.slug}
            />
          ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts(['title', 'date', 'slug', 'author', 'draft']);

  return {
    props: {posts},
  };
}
