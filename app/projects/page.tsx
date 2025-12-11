'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Link from 'next/link';

const projects: Project[] = [
  {
    title: 'Battle Snakes',
    description:
      'A multiplayer, round-based snake game where you can battle other players online in real time. Built with React, Node.js, and Socket.io.',
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
    <div className="w-full flex flex-col items-center gap-10 pt-5">
      <h1 className="text-5xl font-bold text-center">Projects</h1>

      <div className="w-4/5 grid grid-cols-1 md:grid-cols-2  gap-10">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            index={index}
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
        <DialogContent className="max-w-2xl bg-indigo-950/95 border-indigo-300/30 text-white">
          {selectedProject && (
            <div className="flex flex-col gap-4">
              <DialogTitle className="text-2xl text-white">{selectedProject.title}</DialogTitle>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <Image
                  src={selectedProject.href}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 672px"
                  loading="eager"
                />
              </div>
              <DialogDescription className="text-base text-white/90">{selectedProject.description}</DialogDescription>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProjectCard({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-indigo-800/20 border border-indigo-300 p-4 rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(129,140,248,0.8)] animate-slide-up-fade opacity-0"
      style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="relative w-full aspect-video overflow-hidden rounded">
        <Image
          src={project.href}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 80vw, calc(40vw - 2.5rem)"
          loading="eager"
        />

        {/* Static project name - bottom left */}
        <div className="absolute bottom-0 left-0 p-3 group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="text-white font-semibold bg-indigo-900/70 dark:bg-indigo-950/60 backdrop-blur-sm px-3 py-1.5 rounded-md text-md lg:text-xl">
            {project.title}
          </h3>
        </div>

        {/* Combined overlay - bottom portion */}
        <div className="absolute bottom-0 left-0 right-0 bg-indigo-900/50 dark:bg-indigo-950/40 backdrop-blur-lg border-t border-white/20 dark:border-indigo-400/30 flex flex-col gap-2 py-4 px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
          <h3 className="text-white font-semibold">{project.title}</h3>
          <p className="text-white text-sm line-clamp-2">{project.description}</p>
          <Link
            href={project.link}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            className="text-white text-lg bg-indigo-900/70 dark:bg-indigo-950/60 w-fit px-2 py-1 rounded-md hover:text-indigo-400 transition-colors duration-300">
            Visit
          </Link>
        </div>
      </div>
    </div>
  );
}
