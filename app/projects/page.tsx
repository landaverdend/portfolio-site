'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Link from 'next/link';

const projects: Project[] = [
  {
    title: 'mempool.channel',
    description:
      'A real-time room-based Jukebox application with Lightning Network payment integration. Users can create or join rooms, submit content requests via Bitcoin Lightning payments, and interact through a live chat and request queue system.',
    href: '/projects/mempoolchannel.png',
    link: 'https://mempool.channel',
  },

  {
    title: 'Battle Snakes',
    description:
      'A multiplayer, round-based snake game where you can battle other players online in real time. Built with React, Node.js, and Websockets.',
    href: '/projects/battle_snakes.png',
    link: 'https://battlesnakes.io',
  },
  {
    title: 'Bitcoin Script Debugger',
    description:
      'A collection of tools that allow you to write and debug bitcoin scripts in the browser. Includes a debugger and transaction parser, alongside support for legacy and segwit transactions.',
    href: '/projects/btc_tools.png',
    link: 'https://bitcointools.landaverde.io/',
  },
  {
    title: 'Fox Archives',
    description:
      'A progressive web app that archives memorable quotes from my friend, Ryan Fox. Features admin and user roles for adding, editing, and reacting to quotes.',
    href: '/projects/fox_site.png',
    link: 'https://whatdidthefoxsay.com/',
  },
  {
    title: 'Isle Advance',
    description:
      'A homebrew Game Boy Advance game similar to Minecraft, built as a university capstone project with my friend. Implemented procedural generation optimized for the hardware constraints.',
    href: '/projects/isle_advance.png',
    link: 'https://github.com/landaverdend/Procgen-GBA',
  },

  {
    title: 'Tetris Galaxy',
    description: 'A Tetris spinoff developed with 3 friends that won first place at our university hackathon, AppalHack 2019.',
    href: '/projects/galaxy.png',
    link: 'https://github.com/landaverdend/tetrisGalaxy',
  },
  {
    title: 'Voltorb Flip',
    description: 'A browser recreation of the Voltorb Flip minigame from the classic Pokémon games.',
    href: '/projects/voltorb_flip.png',
    link: 'https://voltorb.landaverde.io/',
  },
];

type Project = {
  title: string;
  description: string;
  href: string;
  link: string;
};
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  return (
    <div className="w-full flex flex-col items-center gap-12 pt-10 pb-20">
      <h1
        className="text-4xl lg:text-5xl font-bold text-center animate-slide-up-fade opacity-0"
        style={{ animationDelay: '0.1s' }}>
        Projects
      </h1>

      <div className="w-4/5 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            index={index}
            isSelected={isDialogOpen && selectedProject?.title === project.title}
            onClick={() => {
              // Cancel any pending close timeout
              if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
                closeTimeoutRef.current = null;
              }
              setSelectedProject(project);
              setIsDialogOpen(true);
            }}
          />
        ))}
      </div>

      {/* Blur overlay */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsDialogOpen(false)}
        />
      )}

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            // Cancel any existing timeout
            if (closeTimeoutRef.current) {
              clearTimeout(closeTimeoutRef.current);
            }
            closeTimeoutRef.current = setTimeout(() => setSelectedProject(null), 200);
          } else {
            // Cancel timeout if dialog is being opened
            if (closeTimeoutRef.current) {
              clearTimeout(closeTimeoutRef.current);
              closeTimeoutRef.current = null;
            }
          }
        }}
        modal={false}>
        <DialogContent
          className="max-w-3xl bg-zinc-900/95 backdrop-blur-md border border-zinc-700/50 text-white shadow-2xl"
          onInteractOutside={() => setIsDialogOpen(false)}
          showCloseButton={true}
          hideOverlay={true}>
          {selectedProject && (
            <div className="flex flex-col gap-5">
              <DialogTitle className="text-2xl lg:text-3xl font-semibold text-white">{selectedProject.title}</DialogTitle>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-zinc-700/50">
                <Image
                  src={selectedProject.href}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 672px"
                  loading="eager"
                />
              </div>
              <DialogDescription className="text-base lg:text-lg text-zinc-300 leading-relaxed">
                {selectedProject.description}
              </DialogDescription>
              <div className="flex justify-end pt-2">
                <Link
                  href={selectedProject.link}
                  target="_blank"
                  className="px-5 py-2 bg-white text-zinc-900 font-medium rounded-lg transition-colors duration-200 hover:bg-zinc-200">
                  Visit Project →
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProjectCard({ project, onClick, index, isSelected }: { project: Project; onClick: () => void; index: number; isSelected: boolean }) {
  return (
    <div
      onClick={onClick}
      data-selected={isSelected}
      className="group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] data-[selected=true]:scale-[1.02] animate-slide-up-fade opacity-0"
      style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="relative w-full aspect-video overflow-hidden rounded-xl">
        <Image
          src={project.href}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105 group-data-[selected=true]:scale-105"
          sizes="(max-width: 768px) 80vw, (max-width: 1024px) 40vw, 35vw"
          loading="eager"
        />

        {/* Static project name - bottom left */}
        <div className="absolute bottom-0 left-0 p-4 group-hover:opacity-0 group-data-[selected=true]:opacity-0 transition-opacity duration-300 z-10">
          <h3 className="text-white font-semibold bg-zinc-900/80 backdrop-blur-sm px-4 py-2 rounded-lg text-lg lg:text-xl">
            {project.title}
          </h3>
        </div>

        {/* Hover overlay - bottom portion */}
        <div className="absolute -bottom-2 left-0 right-0 bg-zinc-900/95 backdrop-blur-sm flex flex-col gap-3 pt-5 pb-6 px-5 transform translate-y-full group-hover:translate-y-0 group-data-[selected=true]:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 group-data-[selected=true]:opacity-100 z-20">
          <h3 className="text-white font-semibold text-xl lg:text-2xl">{project.title}</h3>
          <p className="text-zinc-300 text-sm lg:text-base leading-relaxed line-clamp-3">{project.description}</p>
          <Link
            href={project.link}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            className="self-start px-4 py-2 bg-white text-zinc-900 font-medium rounded-lg transition-colors duration-200 hover:bg-zinc-200 text-sm">
            Visit Project →
          </Link>
        </div>
      </div>
    </div>
  );
}
