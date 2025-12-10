'use client';

import Image from 'next/image';

type Project = {
  title: string;
  description: string;
  href: string;
};

export default function Projects() {
  const images = [
    '/projects/battle_snakes.png',
    '/projects/btc_tools.png',
    '/projects/fox_site.png',
    '/projects/galaxy.png',
    '/projects/isle_advance.png',
    '/projects/trivia.png',
    '/projects/voltorb_flip.png',
  ];
  const projects: Project[] = [];

  for (const image of images) {
    projects.push({
      title: 'Project',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      href: image,
    });
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-3/5 grid grid-cols-1 md:grid-cols-2  gap-4">
        {projects.map((project, index) => (
          <div key={index} className="bg-indigo-800/20 border border-indigo-300 p-4 rounded-lg">
            <div className="relative w-full aspect-video">
              <Image src={project.href} alt="Fox" fill className="object-cover " />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
