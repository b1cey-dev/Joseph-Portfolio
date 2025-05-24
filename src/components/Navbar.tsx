'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon,
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Role } from '@prisma/client';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

const clientLinks = [
  { href: '/client/dashboard', label: 'Dashboard' },
  { href: '/client/status', label: 'Project Status' },
  { href: '/client/support', label: 'Support' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => pathname === path;
  const isClient = (session?.user?.role as Role | undefined) === 'CLIENT';

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">Joseph</span>
            <span className="text-xl font-bold text-blue-500">Robinson</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm ${
                  isActive(link.href)
                    ? 'text-blue-500'
                    : 'text-slate-300 hover:text-white'
                } transition-colors`}
              >
                {link.label}
              </Link>
            ))}

            {status === 'authenticated' && isClient && (
              <>
                <div className="h-4 w-px bg-slate-700" />
                {clientLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm ${
                      isActive(link.href)
                        ? 'text-blue-500'
                        : 'text-slate-300 hover:text-white'
                    } transition-colors`}
                  >
                    {link.label}
                  </Link>
                ))}
              </>
            )}

            {/* Profile Menu */}
            {status === 'authenticated' ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
                >
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || ''}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <UserCircleIcon className="w-8 h-8" />
                  )}
                  <span className="text-sm">{session.user?.name}</span>
                  <ChevronDownIcon className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 py-2 bg-slate-800 rounded-lg shadow-xl border border-slate-700"
                    >
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <UserCircleIcon className="w-5 h-5 mr-2" />
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Cog6ToothIcon className="w-5 h-5 mr-2" />
                        Settings
                      </Link>
                      <div className="h-px bg-slate-700 my-2" />
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          signOut({ callbackUrl: '/' });
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors"
                      >
                        <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-300 hover:text-white"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-800"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {status === 'authenticated' && (
                <div className="flex items-center space-x-3 pb-4 border-b border-slate-700">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || ''}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <UserCircleIcon className="w-10 h-10 text-slate-400" />
                  )}
                  <div>
                    <div className="text-sm font-medium text-white">
                      {session.user?.name}
                    </div>
                    <div className="text-xs text-slate-400">
                      {session.user?.email}
                    </div>
                  </div>
                </div>
              )}
              
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block text-sm ${
                    isActive(link.href)
                      ? 'text-blue-500'
                      : 'text-slate-300 hover:text-white'
                  } transition-colors`}
                >
                  {link.label}
                </Link>
              ))}

              {status === 'authenticated' && isClient && (
                <>
                  <div className="h-px bg-slate-800 my-4" />
                  {clientLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block text-sm ${
                        isActive(link.href)
                          ? 'text-blue-500'
                          : 'text-slate-300 hover:text-white'
                      } transition-colors`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </>
              )}

              {status === 'authenticated' && (
                <>
                  <div className="h-px bg-slate-800 my-4" />
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="block text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setIsOpen(false)}
                    className="block text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    Settings
                  </Link>
                </>
              )}

              <div className="pt-4">
                {status === 'authenticated' ? (
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: '/' });
                      setIsOpen(false);
                    }}
                    className="w-full text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 