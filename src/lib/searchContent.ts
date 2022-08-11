import {getAllPages} from './pageMarkdown';
import {getAllPosts} from './postMarkdown';
import SearchContent from 'types/searchContent';

export function getSearchContent(): SearchContent {
  const fields = ['title', 'slug', 'tags', 'content'];
  const posts = getAllPosts(fields);
  const pages = getAllPages([], fields);

  return {posts, pages};
}
