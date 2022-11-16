import MarkdownArticle from 'components/MarkdownContent';
import markdownToHtml from 'lib/markdownToHTML';
import {getAllPageSlugs, getPageContent} from 'lib/pageMarkdown';
import {getSearchContent} from 'lib/searchContent';
import {useSearch} from 'lib/useSearch';
import {GetStaticPaths, GetStaticProps} from 'next';
import React from 'react';
import SearchContent from 'types/searchContent';

type Props = {
  content: string;
  searchContent: SearchContent;
};

export default function ContentPage({content, searchContent}: Props) {
  useSearch(searchContent);
  return <MarkdownArticle content={content} />;
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const content = await markdownToHtml(getPageContent(params?.page as string));
  const searchContent = getSearchContent();
  return {props: {content, searchContent}};
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = getAllPageSlugs(['home']).filter(slug => slug !== 'contact');

  return {
    paths: pages.map(page => ({params: {page}})),
    fallback: false,
  };
};
