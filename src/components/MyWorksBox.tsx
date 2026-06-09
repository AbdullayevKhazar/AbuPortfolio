import { ExternalLink, Github, Pencil, Trash2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient, API_ENDPOINTS } from "../lib/api";
import { useTranslation } from "react-i18next";

interface MyWorksBoxProps {
  id: string;
  title: string;
  category?: string;
  description: string;
  mainImage: string;
  technologies: string[];
  liveUrl?: string;
  githubLink?: string;
  isAdmin?: boolean;
  isFeatured?: boolean;
  onDelete?: (id: string) => void;
}

const MyWorksBox = ({
  id,
  title,
  category,
  description,
  mainImage,
  technologies,
  liveUrl,
  githubLink,
  isAdmin = false,
  isFeatured = false,
  onDelete,
}: MyWorksBoxProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [actionError, setActionError] = useState("");

  const handleDelete = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!window.confirm(t("projects.deleteConfirm")))
      return;

    try {
      setActionError("");
      await apiClient.delete(API_ENDPOINTS.works.delete(id));
      onDelete?.(id);
    } catch {
      setActionError(t("projects.deleteError"));
    }
  };

  const Wrapper: React.ElementType = isAdmin ? "article" : Link;
  const wrapperProps = isAdmin ? {} : { to: `/project/${id}` };

  return (
    <Wrapper
      {...wrapperProps}
      className="group flex h-full z-10 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-card"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-white/5">
        <img
          src={mainImage}
          alt={t("projects.coverAlt", { title })}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {(category || isFeatured) && (
          <div className="absolute left-4 top-4 flex gap-2">
            {category && (
              <span className="rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                {category}
              </span>
            )}
            {isFeatured && (
              <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-amber-950">
                {t("projects.featured")}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {description.length > 150
            ? `${description.slice(0, 150)}...`
            : description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/10">
          {isAdmin ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => navigate(`/admin/edit-work/${id}`)}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                <Pencil className="size-4" />
                {t("common.edit")}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-500 hover:text-white"
              >
                <Trash2 className="size-4" />
                {t("common.delete")}
              </button>
            </div>
          ) : (
            <>
              <span className="text-sm font-semibold text-primary">
                {t("projects.caseStudy")}
              </span>
              <div className="flex items-center gap-2">
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("projects.openWebsite", { title })}
                    className="rounded-full p-2 text-muted-foreground transition hover:bg-primary/10 hover:text-primary"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <ExternalLink className="size-4" />
                  </a>
                )}
                {githubLink && (
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("projects.openSource", { title })}
                    className="rounded-full p-2 text-slate-500 transition hover:bg-slate-500/10 hover:text-slate-950 dark:hover:text-white"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Github className="size-4" />
                  </a>
                )}
              </div>
            </>
          )}
        </div>
        {actionError && (
          <p className="mt-3 text-sm text-red-500">{actionError}</p>
        )}
      </div>
    </Wrapper>
  );
};

export default MyWorksBox;
