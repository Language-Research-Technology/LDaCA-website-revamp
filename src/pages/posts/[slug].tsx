import MarkdownArticle from 'components/MarkdownContent';
import markdownToHtml from 'lib/markdownToHTML';
import {getAllPosts, getPostBySlug} from 'lib/postMarkdown';
import {getSearchContent} from 'lib/searchContent';
import {useSearch} from 'lib/useSearch';
import {GetStaticPaths, GetStaticProps} from 'next';
import React from 'react';
import Post from 'types/post';
import SearchContent from 'types/searchContent';

type Props = {
  post: Post;
  content: string;
  searchContent: SearchContent;
};

export default function Page({post, content, searchContent}: Props) {
  useSearch(searchContent);
  return (
    <div>
      <MarkdownArticle content={content} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const slug = (params?.slug as string) ?? '';
  const post = getPostBySlug(slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'order',
  ]);
  const content = await markdownToHtml(post.content);
  const searchContent = getSearchContent();

  return {
    props: {
      post,
      content,
      searchContent,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};
