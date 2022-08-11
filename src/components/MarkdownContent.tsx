import React from 'react';

type Props = {
  content: string;
};

export default function MarkdownArticle({content}: Props) {
  return (
    <article
      className="prose max-w-none lg:prose-xl"
      dangerouslySetInnerHTML={{__html: content}}
    />
  );
}
