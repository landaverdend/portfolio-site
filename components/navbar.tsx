'use client';

import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="w-3/4 mx-auto flex items-center justify-between bg-darkindigo/20 backdrop-blur-md shadow-lg text-white py-4 rounded-full mt-4">
      <div className="w-1/3 text-center flex items-center justify-center gap-2">
        <Image src="/logo.png" alt="logo" width={50} height={50} className="rounded-full" />
        landaverde.io
      </div>

      <div className="mr-4">
        <ul className="flex items-center justify-between gap-5">
          <li>About</li>
          <li>Projects</li>
          <li>Experience</li>
          <li>Contact</li>
        </ul>
      </div>
    </nav>
  );
}
