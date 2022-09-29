import React, {useState} from 'react';
import Link from 'next/link';
import Hamburger from './Hamburger';
import SideBar from './SideBar';
import MenuLink from 'types/menuLink';
import Searchbar from 'components/Searchbar';

export default function Header() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="sticky top-0 h-20 bg-white shadow-sm md:static md:shadow-none lg:h-36">
      <nav className="container flex h-full items-center justify-between text-gray-700">
        <Link href="/">
          <a>
            <img src="/logo.png" className="h-16 lg:h-28" />
          </a>
        </Link>

        {/* Right Menu */}
        <div className="hidden items-center space-x-2 md:flex">
          <ul className="flex divide-x divide-slate-400 text-sm">
            {links.map(({name, url}) => (
              <Link key={name} href={url}>
                <a className="cursor-pointer px-4 font-semibold first:pl-0 hover:underline">
                  <li>{name}</li>
                </a>
              </Link>
            ))}
          </ul>
          <Searchbar />
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <Hamburger isOpen={showSidebar} setOpen={setShowSidebar} />
        </div>
      </nav>

      <SideBar
        open={showSidebar}
        close={() => setShowSidebar(false)}
        urls={links}
      />
    </div>
  );
}

const links: MenuLink[] = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'Blog',
    url: '/posts',
  },
  {
    name: 'Background',
    url: '/background',
  },
  {
    name: 'Resources',
    url: '/resources',
  },
  {
    name: 'Organisation',
    url: '/organisation',
  },
];
