// src/components/admin/NavBar.tsx
import Link from 'next/link';

const NavBar = ({ handleLogout }: { handleLogout: () => void }) => {
  return (
    <nav className="bg-gray-800 text-white p-4 fixed w-full top-0 shadow-lg z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link href="/" legacyBehavior>
            <a className="hover:underline">AI World</a>
          </Link>
        </div>
        <div className="space-x-4 flex items-center">
          <Link href="/admin/dashboard" legacyBehavior>
            <a className="hover:bg-gray-700 px-3 py-2 rounded">Dashboard</a>
          </Link>
          <Link href="/admin/create" legacyBehavior>
            <a className="hover:bg-gray-700 px-3 py-2 rounded">Create Post</a>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;