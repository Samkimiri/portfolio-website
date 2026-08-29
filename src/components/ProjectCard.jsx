export default function ProjectCard({ project }) {
  return (
    <div className="group flex flex-col rounded-2xl border border-neutral-800 bg-neutral-900/50 overflow-hidden hover:border-neutral-700 transition-colors">
      <div className="aspect-video bg-neutral-800 flex items-center justify-center overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-neutral-600 text-sm">Screenshot coming soon</span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-lg font-semibold text-neutral-50">{project.title}</h3>
        <p className="mt-2 text-sm text-neutral-400 flex-1">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs rounded-full bg-neutral-800 text-neutral-300 px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex gap-4 text-sm font-medium">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Live site ↗
          </a>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            Source code
          </a>
        </div>
      </div>
    </div>
  );
}
