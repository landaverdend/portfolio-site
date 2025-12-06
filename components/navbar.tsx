'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PersonIcon, EnvelopeClosedIcon, ArchiveIcon, BackpackIcon } from '@radix-ui/react-icons';

export default function Navbar() {
  return (
    <div
      className="w-screen flex items-center justify-center fixed bottom-5 left-0 right-0 z-50
      lg:top-5 lg:bottom-auto">
      <nav
        className="flex items-center justify-center text-center
        lg:w-fit lg:justify-between 
        py-2 lg:py-4 px-10 bg-indigo-900 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 border">
        <div className="hidden text-center lg:w-1/5 lg:flex items-center justify-center gap-2">
          <Image src="/logo.png" alt="logo" width={60} height={60} className="rounded-full" />
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
              <NavbarItem href="/contact" icon={<EnvelopeClosedIcon />}>
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
