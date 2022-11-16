import MarkdownArticle from 'components/MarkdownContent';
import markdownToHtml from 'lib/markdownToHTML';
import {getPageContent} from 'lib/pageMarkdown';
import {getSearchContent} from 'lib/searchContent';
import {useSearch} from 'lib/useSearch';
import {TwitterTimelineEmbed} from 'react-twitter-embed';
import Post from 'types/post';

type Props = {
  content: string;
  searchContent: {posts: Post[]; pages: Post[]};
};

export default function Home({content, searchContent}: Props) {
  useSearch(searchContent);
  return (
    <>
      <MarkdownArticle content={content} />
      <div className="mt-8">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="LDaCA_Program"
          options={{height: 1000}}
        />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const contact = getPageContent('contact');
  const content = await markdownToHtml(contact);
  const searchContent = getSearchContent();

  return {
    props: {content, searchContent},
  };
}
