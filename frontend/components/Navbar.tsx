'use client';
import Link from 'next/link';
import { Activity, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('health_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('health_user');
    localStorage.removeItem('health_token');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Activity className="h-8 w-8 text-primary-600" />
              <span className="font-heading font-bold text-2xl tracking-tight text-gray-900">HEALTH</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/symptoms" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Symptom Checker</Link>
            <Link href="/report-analysis" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Report Analysis</Link>
            <Link href="/doctors" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Find Doctors</Link>
            <Link href="/compare" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Govt vs Private</Link>
            <div className="flex items-center space-x-4 ml-4">
              {user ? (
                <div className="flex items-center gap-4">
                   <div className="font-semibold text-gray-700">Hi, {user.name.split(' ')[0]}</div>
                   <button onClick={handleLogout} className="text-primary-600 hover:text-primary-700 font-semibold px-3 py-2 rounded-md hover:bg-primary-50 transition-colors">Logout</button>
                </div>
              ) : (
                <>
                  <Link href="/auth" className="text-primary-600 hover:text-primary-700 font-semibold px-3 py-2 rounded-md hover:bg-primary-50 transition-colors">Login</Link>
                  <Link href="/auth?signup=true" className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition-all hover:shadow">Sign up</Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass absolute top-16 w-full border-b shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/symptoms" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50">Symptom Checker</Link>
            <Link href="/report-analysis" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50">Report Analysis</Link>
            <Link href="/doctors" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50">Find Doctors</Link>
            <Link href="/compare" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50">Govt vs Private</Link>
            <div className="mt-4 pt-4 border-t border-gray-200">
              {user ? (
                 <div className="flex justify-between items-center px-3 py-2">
                   <div className="font-semibold text-gray-700">Hi, {user.name.split(' ')[0]}</div>
                   <button onClick={handleLogout} className="text-primary-600 font-medium">Logout</button>
                 </div>
              ) : (
                <>
                  <Link href="/auth" className="block px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:bg-primary-50">Login</Link>
                  <Link href="/auth?signup=true" className="block px-3 py-2 mt-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700 text-center">Sign up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
