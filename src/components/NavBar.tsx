
import Link from 'next/link';
import { useState } from 'react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 text-white p-4 fixed w-full top-0 shadow-lg z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold flex items-center">
          <Link href="/" passHref legacyBehavior>
            <a className="flex items-center">
              <img src="/assets/images/AIWORLD/logo.png" alt="Logo" className="h-8 w-8 mr-2 bg-white p-1 rounded-full" />
              <span>AI World</span>
            </a>
          </Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/" passHref legacyBehavior>
            <a>Home</a>
          </Link>
          <Link href="/about" passHref legacyBehavior>
            <a>About</a>
          </Link>
          <Link href="/blog" passHref legacyBehavior>
            <a>Blog</a>
          </Link>
          <Link href="/contact" passHref legacyBehavior>
            <a>Contact</a>
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L12 10.586l6.293-6.293a1 1 0 111.414 1.414L13.414 12l6.293 6.293a1 1 0 01-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 01-1.414-1.414L10.586 12 4.293 5.707a1 1 0 010-1.414z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 6h18a1 1 0 010 2H3a1 1 0 010-2zm0 5h18a1 1 0 010 2H3a1 1 0 010-2zm0 5h18a1 1 0 010 2H3a1 1 0 010-2z"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" passHref legacyBehavior>
              <a className="block px-3 py-2 rounded-md text-base font-medium">Home</a>
            </Link>
            <Link href="/about" passHref legacyBehavior>
              <a className="block px-3 py-2 rounded-md text-base font-medium">About</a>
            </Link>
            <Link href="/blog" passHref legacyBehavior>
              <a className="block px-3 py-2 rounded-md text-base font-medium">Blog</a>
            </Link>
            <Link href="/contact" passHref legacyBehavior>
              <a className="block px-3 py-2 rounded-md text-base font-medium">Contact</a>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;