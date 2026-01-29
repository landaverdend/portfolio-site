'use client';

import Button from '@/components/button';
import { GlobeIcon, GitHubLogoIcon, LinkedInLogoIcon, EnvelopeClosedIcon, DownloadIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);
  return (
    <div className="">
      <main
        className="w-full flex flex-col items-center justify-center gap-4 
        lg:flex-row lg:gap-10 lg:items-start">
        <div
          className="flex flex-col items-center justify-center gap-2 animate-slide-up-fade opacity-0"
          style={{ animationDelay: '0.1s' }}>
          <div className="relative w-[148px] h-[148px]">
            {!isProfileLoaded && (
              <div className="absolute inset-0 bg-zinc-800 animate-pulse rounded-full">
                <div className="absolute inset-0 bg-linear-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-[shimmer_1.5s_infinite] rounded-full overflow-hidden" />
              </div>
            )}
            <Image
              src="/me.jpg"
              alt="logo"
              width={148}
              height={148}
              className={`rounded-full border-1 border-gray-100 shadow-lg transition-opacity duration-300 ${isProfileLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsProfileLoaded(true)}
            />
          </div>
          <div
            className="flex flex-row items-center justify-center gap-2 animate-slide-up-fade opacity-0"
            style={{ animationDelay: '0.2s' }}>
            <GlobeIcon className="w-4 h-4" />
            <span>Americas (EST)</span>
          </div>

          <div
            className="flex flex-row items-center justify-center gap-2 animate-slide-up-fade opacity-0"
            style={{ animationDelay: '0.3s' }}>
            <span className="text-white bg-indigo-400/10 rounded-lg px-2 py-1 text-xs border border-gray-400">English</span>
            <span className="text-white bg-indigo-400/10 rounded-lg px-2 py-1 text-xs border border-gray-400">Spanish</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-5 lg:w-1/4 lg:items-start">
          <div
            className="flex flex-col items-center lg:items-start animate-slide-up-fade opacity-0"
            style={{ animationDelay: '0.2s' }}>
            <h1 className="text-4xl font-extrabold tracking-tighter lg:text-6xl">
              Nico <span className="animate-gradient">Landaverde</span>
            </h1>
            <span className="text-xl text-gray-500 font-light lg:text-2xl">Full Stack Developer</span>
          </div>

          <div
            className="flex flex-row items-center justify-center gap-2 animate-slide-up-fade opacity-0"
            style={{ animationDelay: '0.4s' }}>
            <SocialButton href="https://github.com/landaverdend" icon={<GitHubLogoIcon className="w-5 h-5" />} />
            <SocialButton
              href="https://www.linkedin.com/in/nicodemus-landaverde-7562ba19a/"
              icon={<LinkedInLogoIcon className="w-5 h-5" />}
            />
            <SocialButton
              href="mailto:nicodemus.landaverde98@gmail.com?subject=Hello&body=Hi%20Nico,"
              icon={<EnvelopeClosedIcon className="w-5 h-5" />}
            />
          </div>

          <p className="mx-5 lg:text-left lg:mx-auto animate-slide-up-fade opacity-0" style={{ animationDelay: '0.5s' }}>
            I like solving problems with computers, especially when a simple piece of software can save someone time or effort.
            I’ve been working as a developer for about five years, across both small teams and larger, Fortune 50 companies.
            Strong interest in Bitcoin, decentralized systems, and making silly little projects.
          </p>

          <div className="flex flex-row items-center gap-2 animate-slide-up-fade opacity-0" style={{ animationDelay: '0.6s' }}>
            <Button
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/docs/landaverde_resume.pdf';
                link.download = 'landaverde_resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}>
              <span className="flex flex-row items-center gap-2 text-nowrap">
                Download CV
                <DownloadIcon className="w-4 h-4" />
              </span>
            </Button>
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
