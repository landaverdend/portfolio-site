'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PersonIcon, EnvelopeOpenIcon, ArchiveIcon, BackpackIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

export default function Navbar() {
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  return (
    <div
      className="w-full flex items-center justify-center fixed bottom-5 left-0 right-0 z-50
      lg:top-5 lg:bottom-auto">
      <nav
        className="flex items-center justify-center text-center
        lg:min-w-fit lg:justify-between lg:max-w-3/4 py-1 lg:py-4 px-10 rounded-full bg-indigo-500/40 dark:bg-indigo-400/10 backdrop-blur-md border border-white/20 dark:border-indigo-400/30">

        <div className="hidden text-center lg:w-1/5 lg:flex items-center justify-center gap-2">
          <div className="relative w-12 h-12">
            {!isLogoLoaded && (
              <div className="absolute inset-0 bg-zinc-800 animate-pulse rounded-full">
                <div className="absolute inset-0 bg-linear-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-[shimmer_1.5s_infinite] rounded-full overflow-hidden" />
              </div>
            )}
            <Image
              src="/logo.png"
              alt="logo"
              width={48}
              height={48}
              className={`rounded-full transition-opacity duration-300 ${isLogoLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsLogoLoaded(true)}
            />
          </div>
          <span className="font-semibold">landaverde.io</span>
        </div>

        <div className="">
          <ul className="flex items-center justify-between gap-5">
            <li>
              <NavbarItem href="/" icon={<PersonIcon />}>
                About
              </NavbarItem>
            </li>
            <li>
              <NavbarItem href="/projects" icon={<ArchiveIcon />}>
                Projects
              </NavbarItem>
            </li>
            <li>
              <NavbarItem href="/experience" icon={<BackpackIcon />}>
                Experience
              </NavbarItem>
            </li>
            <li>
              <NavbarItem href="/contact" icon={<EnvelopeOpenIcon />}>
                Contact
              </NavbarItem>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

function NavbarItem({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex flex-row gap-2 items-center justify-center transition-colors duration-300 hover:bg-indigo-100/10 rounded-full py-2 px-3">
      {icon}
      <span className="hidden lg:block">{children}</span>
    </Link>
  );
}
