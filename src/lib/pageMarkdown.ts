import fs from 'fs';
import {join} from 'path';
import matter from 'gray-matter';
import Post from 'types/post';

const pageContentDirectory = join(process.cwd(), 'content', 'pages');

function getPagePaths() {
  return fs.readdirSync(pageContentDirectory);
}

export function getPageContent(slug: string): string {
  const fullPath = join(pageContentDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const {content} = matter(fileContents);
  return content;
}

export function getPageBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(pageContentDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const {data, content} = matter(fileContents);
  const post: Post = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach(field => {
    if (field === 'slug') {
      post[field] = realSlug;
    }
    if (field === 'content') {
      post[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      post[field] = data[field];
    }
  });

  return post;
}

export function getAllPageSlugs(slugsToIgnore: string[]) {
  const slugs = getPagePaths();
  const pages = slugs
    .map(slug => slug.replace(/\.md$/, ''))
    .filter(slug => !slugsToIgnore.includes(slug));

  return pages;
}

export function getAllPages(slugsToIgnore: string[], fields: string[]) {
  return getAllPageSlugs(slugsToIgnore).map(slug =>
    getPageBySlug(slug, fields)
  );
}
