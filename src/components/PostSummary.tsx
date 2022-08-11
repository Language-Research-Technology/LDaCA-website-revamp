import Link from 'next/link';
import React from 'react';

type Props = {
  title: string;
  author: string;
  date: string;
  slug: string;
};

export default function PostSummary({title, author, date, slug}: Props) {
  return (
    <Link href={`/posts/${slug}`}>
      <a>
        <div className="w-full cursor-pointer bg-gray-100 p-3 transition hover:bg-blue-100">
          <p className="text-xl font-semibold">{title}</p>
          <div className="mt-1 flex justify-between text-sm">
            <p className="text-gray-800">
              <span className="text-gray-500">by </span>
              {author}
            </p>
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}
