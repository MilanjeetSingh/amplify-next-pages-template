"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();
  
  return (
    <nav className="bg-gray-100 p-4 mb-6">
      <div className="container mx-auto">
        <ul className="flex space-x-6">
          <li>
            <Link 
              href="/" 
              className={`${pathname === '/' ? 'font-bold text-blue-600' : 'text-gray-700'}`}
            >
              Home (CSR)
            </Link>
          </li>
          <li>
            <Link 
              href="/todos" 
              className={`${pathname === '/todos' ? 'font-bold text-blue-600' : 'text-gray-700'}`}
            >
              Todos (SSR + CSR)
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
} 