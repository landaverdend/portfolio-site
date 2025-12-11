'use client';

import Button from '@/components/button';
import { GlobeIcon, GitHubLogoIcon, LinkedInLogoIcon, EnvelopeClosedIcon, DownloadIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="">
      <main
        className="w-full flex flex-col items-center justify-center gap-4 
        lg:flex-row lg:gap-10 lg:items-start">
        <div className="flex flex-col items-center justify-center gap-2">
          <Image src="/me.jpg" alt="logo" width={148} height={148} className="rounded-full border-1 border-gray-100 shadow-lg" />
          <div className="flex flex-row items-center justify-center gap-2">
            <GlobeIcon className="w-4 h-4" />
            <span>Americas (EST)</span>
          </div>

          <div className="flex flex-row items-center justify-center gap-2 ">
            <span className="text-white bg-indigo-400/10 rounded-lg px-2 py-1 text-xs border border-gray-400">English</span>
            <span className="text-white bg-indigo-400/10 rounded-lg px-2 py-1 text-xs border border-gray-400">Spanish</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-5 lg:w-1/4 lg:items-start">
          <div className="flex flex-col items-center lg:items-start">
            <h1 className="text-4xl font-extrabold tracking-tighter lg:text-6xl">Nico Landaverde</h1>
            <span className="text-xl text-gray-500 font-light lg:text-2xl">Full Stack Developer</span>
          </div>

          <div className="flex flex-row items-center justify-center gap-2">
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

          <p className="mx-5 lg:text-left lg:mx-auto">
            I'm a Full stack developer that likes to build end-to-end applications with modern technologies like React and
            Next.js. I'm particularly interested in Bitcoin, financial technology, and creating solutions that span the entire
            development stack. I enjoy working across different domains and technologies.
          </p>

          <div className="flex flex-row items-center gap-2">
            <Button onClick={() => alert('Hello!')}>
              <span className="text-nowrap">Click Here! 🤡</span>
            </Button>
            <Button
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/docs/landaverde_resume.pdf';
                link.download = 'landaverde_resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              alt>
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
