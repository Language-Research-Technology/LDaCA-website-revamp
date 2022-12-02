import MarkdownArticle from 'components/MarkdownContent';
import Title from 'components/Title';
import markdownToHtml from 'lib/markdownToHTML';
import {getAllPageSlugs, getPageBySlug, getPageContent} from 'lib/pageMarkdown';
import {getSearchContent} from 'lib/searchContent';
import {useSearch} from 'lib/useSearch';
import {GetStaticPaths, GetStaticProps} from 'next';
import React from 'react';
import SearchContent from 'types/searchContent';

type Props = {
  title?: string;
  content: string;
  searchContent: SearchContent;
};

export default function ContentPage({content, searchContent, title}: Props) {
  useSearch(searchContent);
  return (
    <>
      <Title pageTitle={title} />
      <MarkdownArticle content={content} />;
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const slug = (params?.page as string) ?? '';
  const {title} = getPageBySlug(slug, ['title']);
  const content = await markdownToHtml(getPageContent(params?.page as string));
  const searchContent = getSearchContent();
  return {props: {content, searchContent, title}};
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = getAllPageSlugs(['home']).filter(slug => slug !== 'contact');

  return {
    paths: pages.map(page => ({params: {page}})),
    fallback: false,
  };
};
