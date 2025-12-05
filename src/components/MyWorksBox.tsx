// src/components/MyWorksBox/MyWorksBox.jsx

import { FiExternalLink, FiGithub, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import type React from "react";

const MyWorksBox = ({
  id,
  title,
  description,
  mainImage,
  technologies,
  liveUrl,
  githubLink,
  isAdmin = false,
  onDelete,
}: {
  id: string;
  title: string;
  description: string;
  mainImage: string;
  technologies: string[];
  liveUrl?: string;
  githubLink: string;
  isAdmin: boolean;
  onDelete: (id: string) => void;
}) => {
  const navigate = useNavigate();

  const handleDelete = async (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      await axios.delete(`https://api.xab.net.az/api/my-works/${id}`);
      if (onDelete) onDelete(id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete project.");
    }
  };

  // ✅ If admin, don’t wrap with Link
  const Wrapper: React.ElementType = isAdmin ? "div" : Link;
  const wrapperProps: Record<string, unknown> = isAdmin
    ? {}
    : { to: `../project/${id}` };

  return (
    <Wrapper
      {...wrapperProps}
      className={`group flex flex-col overflow-hidden rounded-xl transition-all duration-300 border border-gray-200 
      bg-white/90 dark:bg-white/5 hover:bg-white/90 shadow-md dark:border-white/10 dark:backdrop-blur-lg dark:hover:bg-white/10`}
    >
      <div className="aspect-video overflow-hidden relative">
        <img
          src={mainImage}
          alt={`Screenshot of ${title}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col py-6 px-3">
        <h3 className="text-2xl font-semibold dark:text-[#eee]">{title}</h3>
        <p className="mt-2 flex-1 text-gray-600 dark:text-[#eee]/60">
          {description.length > 110
            ? `${description.slice(0, 110)}...`
            : description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="rounded-full text-black border bg-[#eee]/40 px-3 py-1 text-xs font-medium dark:border-white/10 dark:bg-white/10 dark:text-sky-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Admin Buttons or Live/GitHub Links */}
        <div className="mt-6 flex items-center justify-between">
          {!isAdmin ? (
            <div className="flex items-center gap-6">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-semibold transition-colors text-sky-700 dark:text-sky-300 dark:hover:text-sky-600 z-20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiExternalLink />
                  <span>Look Website</span>
                </a>
              )}
              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-semibold text-slate-300 transition-colors hover:text-slate-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiGithub />
                  <span>View Code</span>
                </a>
              )}
            </div>
          ) : (
            // ⚙️ For Admin Panel
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/admin/edit-work/${id}`)}
                className="flex items-center gap-1 px-3 py-1 text-sm rounded-md bg-sky-500 hover:bg-sky-600 text-white transition"
              >
                <FiEdit2 size={14} /> Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-1 px-3 py-1 text-sm rounded-md bg-red-500 hover:bg-red-600 text-white transition"
              >
                <FiTrash2 size={14} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default MyWorksBox;
