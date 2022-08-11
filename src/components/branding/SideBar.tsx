import Searchbar from 'components/Searchbar';
import Link from 'next/link';
import React from 'react';
import MenuLink from 'types/menuLink';

type Props = {
  open: boolean;
  close(): void;
  urls: MenuLink[];
};

export default function SideBar({open, close, urls}: Props) {
  if (!open) return <div></div>;
  return (
    <div className="fixed top-20 left-0 z-50 flex h-full w-full">
      <div className="flex-1 backdrop-brightness-50" onClick={close}></div>
      <div className="w-1/2 bg-gray-50 py-4 text-gray-700 md:w-1/3 lg:w-1/4">
        <div className="px-2">
          <Searchbar initialExpanded onSearch={close} />
        </div>
        <nav>
          <ul className="flex flex-col">
            {urls.map(({url, name}) => (
              <Link href={url} key={url}>
                <li
                  className="cursor-pointer p-4 transition hover:bg-gray-200"
                  onClick={close}
                >
                  {name}
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
