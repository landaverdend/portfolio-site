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
          className="max-w-3xl bg-indigo-950/95 backdrop-blur-md border-indigo-300/50 text-white shadow-[0_0_60px_rgba(129,140,248,0.4)]"
          onInteractOutside={() => setIsDialogOpen(false)}
          showCloseButton={true}
          hideOverlay={true}>
          {selectedProject && (
            <div className="flex flex-col gap-6">
              <DialogTitle className="text-3xl lg:text-4xl font-bold text-white">{selectedProject.title}</DialogTitle>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-indigo-400/30 shadow-lg">
                <Image
                  src={selectedProject.href}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 672px"
                  loading="eager"
                />
              </div>
              <DialogDescription className="text-base lg:text-lg text-white/90 leading-relaxed">
                {selectedProject.description}
              </DialogDescription>
              <div className="flex justify-end pt-2">
                <Link
                  href={selectedProject.link}
                  target="_blank"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-colors duration-300 border border-indigo-400/50">
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
      className="group relative bg-indigo-900/30 backdrop-blur-sm border border-indigo-300/50 p-1 rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(129,140,248,0.6)] hover:border-indigo-300/80 data-[selected=true]:scale-[1.02] data-[selected=true]:shadow-[0_0_50px_rgba(129,140,248,0.6)] data-[selected=true]:border-indigo-300/80 animate-slide-up-fade opacity-0"
      style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="relative w-full aspect-video overflow-hidden rounded-lg">
        <Image
          src={project.href}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110 group-data-[selected=true]:scale-110"
          sizes="(max-width: 768px) 80vw, (max-width: 1024px) 40vw, 35vw"
          loading="eager"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-indigo-950/90 via-indigo-950/20 to-transparent opacity-0 group-hover:opacity-100 group-data-[selected=true]:opacity-100 transition-opacity duration-300" />

        {/* Static project name - bottom left */}
        <div className="absolute bottom-0 left-0 p-4 group-hover:opacity-0 group-data-[selected=true]:opacity-0 transition-opacity duration-300 z-10">
          <h3 className="text-white font-bold bg-indigo-900/80 backdrop-blur-md px-4 py-2 rounded-lg text-lg lg:text-xl shadow-lg border border-indigo-400/30">
            {project.title}
          </h3>
        </div>

        {/* Hover overlay - bottom portion */}
        <div className="absolute bottom-0 left-0 right-0 bg-indigo-900/95 backdrop-blur-xl border-t border-indigo-400/40 flex flex-col gap-3 py-5 px-5 transform translate-y-full group-hover:translate-y-0 group-data-[selected=true]:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 group-data-[selected=true]:opacity-100 z-20">
          <h3 className="text-white font-bold text-xl lg:text-2xl">{project.title}</h3>
          <p className="text-white/90 text-sm lg:text-base leading-relaxed line-clamp-3">{project.description}</p>
          <Link
            href={project.link}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            className="text-white font-semibold bg-indigo-600 hover:bg-indigo-500 w-fit px-4 py-2 rounded-lg transition-colors duration-300 border border-indigo-400/50 mt-1">
            Visit Project →
          </Link>
        </div>
      </div>
    </div>
  );
}
