import {useContent} from 'contexts/ContentProvider';
import Link from 'next/link';
import React, {useRef, useState} from 'react';
import Post from 'types/post';

type Props = {
  initialExpanded?: boolean;
  onSearch?(): void;
};

export default function Searchbar({initialExpanded, onSearch}: Props) {
  const [expanded, setExpanded] = useState<boolean>(initialExpanded ?? false);
  const [prompt, setPrompt] = useState('');
  const searchBar = useRef<HTMLInputElement>(null);

  return (
    <div className="relative flex">
      <input
        value={prompt}
        ref={searchBar}
        onChange={e => setPrompt(e.target.value)}
        placeholder="Page name"
        className={`${
          !expanded ? 'w-0' : 'w-40 p-2'
        } mr-2 border transition-all`}
      />
      <button
        onClick={() => {
          setExpanded(!expanded);
          if (searchBar.current) {
            searchBar.current.focus();
          }
        }}
      >
        <SearchIcon />
      </button>
      <SearchResults
        prompt={prompt}
        expanded={expanded}
        onSearch={() => {
          setExpanded(false);
          onSearch && onSearch();
        }}
      />
    </div>
  );
}

type SearchResultProps = {
  prompt: string;
  expanded: boolean;
  onSearch(): void;
};

type PostWithUrl = Post & {
  url: string;
};

function SearchResults({prompt, expanded, onSearch}: SearchResultProps) {
  const {posts, pages} = useContent();
  if (prompt.length < 1 || !expanded) return <></>;

  const isPostRelevant = (post: Post): boolean => {
    if ((post?.title ?? '').includes(prompt)) {
      return true;
    }
    if ((post?.slug ?? '').includes(prompt)) {
      return true;
    }
    if (post.tags) {
      for (const tag of post.tags) {
        if (tag.includes(prompt)) {
          return true;
        }
      }
    }
    return false;
  };

  const postContainsPrompt = (post: Post): boolean =>
    (post?.content ?? '').includes(prompt);

  const getPostUrl = (post: Post): string => `/posts/${post.slug ?? ''}`;
  const getPageUrl = (page: Post): string => '/' + (page.slug ?? '');

  const pagesWithUrls: PostWithUrl[] = pages.map(page => ({
    ...page,
    url: getPageUrl(page),
  }));
  const postsWithUrls: PostWithUrl[] = posts.map(post => ({
    ...post,
    url: getPostUrl(post),
  }));

  const relevantPages: PostWithUrl[] = pagesWithUrls.filter(isPostRelevant);
  const relevantPosts: PostWithUrl[] = postsWithUrls.filter(isPostRelevant);
  const contained = [...pagesWithUrls, ...postsWithUrls].filter(
    postContainsPrompt
  );

  return (
    <div className="absolute top-full w-full bg-white shadow-sm">
      {relevantPages.length === 0 &&
      relevantPosts.length === 0 &&
      contained.length === 0 ? (
        <p>No results</p>
      ) : (
        <div>
          <ResultDisplay
            onClick={onSearch}
            title="Pages"
            posts={relevantPages}
          />
          <ResultDisplay
            onClick={onSearch}
            title="Blog Posts"
            posts={relevantPosts}
          />
          <ResultDisplay
            onClick={onSearch}
            title={`Content containing '${prompt}'`}
            posts={contained.filter(postContainsPrompt)}
          />
        </div>
      )}
    </div>
  );
}

type ResultDisplayProps = {
  title: string;
  posts: PostWithUrl[];
  onClick(): void;
};

function ResultDisplay({title, posts, onClick}: ResultDisplayProps) {
  if (posts.length === 0) return <></>;

  return (
    <div>
      <p className="bg-gray-50 px-2 py-1 font-semibold">{title}</p>
      <ul className="flex flex-col divide-y divide-gray-200">
        {posts.map(post => (
          <li>
            <Link href={post.url}>
              <a>
                <div
                  className="py-4 px-2 transition hover:bg-gray-200"
                  onClick={onClick}
                >
                  {post?.title ?? post?.slug}
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);
