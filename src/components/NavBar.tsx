// src/components/NavBar.tsx
import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 fixed w-full top-0 shadow-lg z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold flex items-center">
          <Link href="/" legacyBehavior>
            <a className="flex items-center">
              <img src="/assets/images/AIWORLD/logo.png" alt="Logo" className="h-8 w-8 mr-2 bg-white p-1 rounded-full" />
              <span>AI World</span>
            </a>
          </Link>
        </div>
        <div className="space-x-4">
          <Link href="/" legacyBehavior>
            <a>Home</a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a>About</a>
          </Link>
          <Link href="/blog" legacyBehavior>
            <a>Blog</a>
          </Link>
          <Link href="/contact" legacyBehavior>
            <a>Contact</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;