// src/components/MyWorksBox/MyWorksBox.jsx

import { FiExternalLink, FiGithub } from "react-icons/fi";
import { Link } from "react-router-dom";

const MyWorksBox = ({
  title,
  description,
  mainImage,
  technologies,
  liveUrl,
  githubLink,
}: {
  title: string;
  description: string;
  mainImage: string;
  technologies: string[];
  liveUrl?: string;
  githubLink: string;
}) => {
  return (
    <Link
      to={``}
      className="group flex flex-col overflow-hidden rounded-xl bg-[#1A1A1A] transition-all duration-300 z-10 border border-[#00bcd4]/5"
    >
      <div className="aspect-video overflow-hidden">
        <img
          src={mainImage}
          alt={`Screenshot of ${title}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-semibold text-slate-100">{title}</h3>
        <p className="mt-2 flex-1 text-slate-400">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="rounded-full bg-slate-700 px-3 py-1 text-xs font-medium text-sky-300"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-6">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-semibold text-sky-400 transition-colors hover:text-sky-300"
            >
              <FiExternalLink />
              <span>Live Demo</span>
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-semibold text-slate-300 transition-colors hover:text-slate-100"
            >
              <FiGithub />
              <span>View Code</span>
            </a>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MyWorksBox;
