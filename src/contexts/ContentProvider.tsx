import React, {useContext, createContext, useState} from 'react';
import Post from 'types/post';

type ContentContextType = {
  posts: Post[];
  setPosts(posts: Post[]): void;
  pages: Post[];
  setPages(pages: Post[]): void;
};

type Props = {
  children: React.ReactNode;
};

const ContentContext = createContext<ContentContextType | null>(null);

export function ContentProvider({children}: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pages, setPages] = useState<Post[]>([]);

  return (
    <ContentContext.Provider
      value={{
        posts,
        setPosts,
        pages,
        setPages,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);

  if (!context)
    throw new Error('useContent must be used inside a `ContentProvider`');

  return context;
}
