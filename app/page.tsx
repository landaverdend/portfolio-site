'use client';

import { GlobeIcon, GitHubLogoIcon, LinkedInLogoIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';

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

        <div className="flex flex-col items-center justify-center gap-5">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-extrabold tracking-tighter">Nico Landaverde</h1>
            <span className="text-xl text-gray-500 font-light">Full Stack Developer</span>
          </div>

          <div className="flex flex-row items-center justify-center gap-2">
            <SocialButton href="https://github.com/landaverdend" icon={<GitHubLogoIcon className="w-5 h-5" />} />
            <SocialButton
              href="https://www.linkedin.com/in/nicodemus-landaverde-7562ba19a/"
              icon={<LinkedInLogoIcon className="w-5 h-5" />}
            />
            <SocialButton href="mailto:nicodemus.landaverde98@gmail.com" icon={<EnvelopeClosedIcon className="w-5 h-5" />} />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full gap-5">
          <p className="mx-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          <div className="">
            <button className="bg-indigo-900 rounded-lg px-4 py-2  border border-indigo-400">
              <span>Click Me!</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function SocialButton({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      className="hover:text-indigo-400 transition-colors duration-300 p-2 border border-indigo-800/80 rounded-full hover:bg-indigo-100/10">
      {icon}
    </Link>
  );
}
