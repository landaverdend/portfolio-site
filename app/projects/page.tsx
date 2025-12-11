'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

type Project = {
  title: string;
  description: string;
  href: string;
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    <div className="w-full flex flex-col items-center gap-10">
      <h1 className="text-5xl font-bold text-center">Projects</h1>

      <div className="w-4/5 grid grid-cols-1 md:grid-cols-2  gap-10">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} onClick={() => {
            setSelectedProject(project);
            setIsDialogOpen(true);
          }} />
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) {
          setTimeout(() => setSelectedProject(null), 200);
        }
      }} modal={false}>
        <DialogContent className="max-w-2xl bg-indigo-950/95 border-indigo-300/30 text-white">
          {selectedProject && (
            <div className="flex flex-col gap-4">
              <DialogTitle className="text-2xl text-white">{selectedProject.title}</DialogTitle>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <Image src={selectedProject.href} alt={selectedProject.title} fill className="object-cover" />
              </div>
              <DialogDescription className="text-base text-white/90">{selectedProject.description}</DialogDescription>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-indigo-800/20 border border-indigo-300 p-4 rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(129,140,248,0.8)]">
      <div className="relative w-full aspect-video overflow-hidden rounded">
        <Image src={project.href} alt="Fox" fill className="object-cover" />

        {/* Combined overlay - bottom portion */}
        <div className="absolute bottom-0 left-0 right-0 bg-indigo-900/50 dark:bg-indigo-950/40 backdrop-blur-lg border-t border-white/20 dark:border-indigo-400/30 flex flex-col gap-2 py-4 px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
          <h3 className="text-white font-semibold">{project.title}</h3>
          <p className="text-white text-sm line-clamp-2">{project.description}</p>
        </div>
      </div>
    </div>
  );
}
