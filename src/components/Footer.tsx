// src/components/Footer.tsx
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">AI World</h2>
          <p className="text-gray-400">Sharing knowledge on AI, coding, and technology.</p>
        </div>
        <div className="flex space-x-4">
          <Link href="https://twitter.com/yourprofile" target="_blank" legacyBehavior>
            <a className="hover:text-blue-500">Twitter</a>
          </Link>
          <Link href="https://facebook.com/yourprofile" target="_blank" legacyBehavior>
            <a className="hover:text-blue-500">Facebook</a>
          </Link>
          <Link href="https://linkedin.com/in/yourprofile" target="_blank" legacyBehavior>
            <a className="hover:text-blue-500">LinkedIn</a>
          </Link>
        </div>
        <div className="text-center md:text-right">
          <p>&copy; {new Date().getFullYear()} AI World. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;