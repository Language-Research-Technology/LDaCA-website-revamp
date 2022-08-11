import MarkdownArticle from 'components/MarkdownContent';
import markdownToHtml from 'lib/markdownToHTML';
import {getPageContent} from 'lib/pageMarkdown';
import {getSearchContent} from 'lib/searchContent';
import {useSearch} from 'lib/useSearch';
import Post from 'types/post';

type Props = {
  content: string;
  searchContent: {posts: Post[]; pages: Post[]};
};

export default function Home({content, searchContent}: Props) {
  useSearch(searchContent);
  return <MarkdownArticle content={content} />;
}

export async function getStaticProps() {
  const home = getPageContent('home');
  const content = await markdownToHtml(home);
  const searchContent = getSearchContent();

  return {
    props: {content, searchContent},
  };
}
