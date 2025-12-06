'use client';

import { GlobeIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="">
      <main className="w-full flex flex-col items-center justify-center gap-4 pt-10">
        <div className="flex flex-col items-center justify-center gap-2">
          <Image src="/me.jpg" alt="logo" width={148} height={148} className="rounded-full border-1 border-gray-100 shadow-lg" />
          <div className="flex flex-row items-center justify-center gap-2">
            <GlobeIcon className="w-4 h-4" />
            <span>Americas (EST)</span>
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <span className="text-white bg-indigo-400/10 rounded-lg px-2 py-1 text-xs border border-gray-400">English</span>
            <span className="text-white bg-indigo-400/10 rounded-lg px-2 py-1 text-xs border border-gray-400">Spanish</span>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold tracking-tighter">Nico Landaverde</h1>
          <span className="text-xl text-gray-500 font-light">Full Stack Developer</span>
        </div>


      </main>
    </div>
  );
}
