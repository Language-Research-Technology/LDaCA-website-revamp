import {useContent} from 'contexts/ContentProvider';
import SearchContent from 'types/searchContent';

export function useSearch(content: SearchContent) {
  const {posts, pages, setPosts, setPages} = useContent();
  if (
    posts.length !== content.posts.length ||
    pages.length !== content.pages.length
  ) {
    setPosts(content.posts);
    setPages(content.pages);
  }
}
