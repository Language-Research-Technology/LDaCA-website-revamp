import {remark} from 'remark';
import html from 'remark-html';
const autoHeadingIds = require('remark-heading-autoid');

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html, {sanitize: false})
    .use(autoHeadingIds)
    .process(markdown);
  return result.toString();
}
