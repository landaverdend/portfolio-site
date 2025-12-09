'use client';

type Project = {
  title: string;
  description: string;
  href: string;
};

export default function Projects() {
  const tmp = {
    title: 'Project',
    description: '',
    href: 'http',
  };

  const projects: Project[] = [];
  for (let i = 0; i < 10; i++) {
    projects.push(tmp);
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <div key={index} className="bg-indigo-800/20 border border-indigo-300 p-4 rounded-lg">
            <h3>
              {project.title} {index}
            </h3>

            <div className="w-[300px] h-[300px]"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
