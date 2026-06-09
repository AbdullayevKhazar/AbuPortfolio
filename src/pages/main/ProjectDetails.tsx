import axios from "axios";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../../components/Container";
import { API_ENDPOINTS } from "../../lib/api";
import type { Work } from "../../types/work";
import { useTranslation } from "react-i18next";

const ProjectDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [work, setWork] = useState<Work | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    axios
      .get<Work>(API_ENDPOINTS.works.getById(id!))
      .then((response) => setWork(response.data))
      .catch(() => setError(t("projects.details.loadError")))
      .finally(() => setLoading(false));
  }, [id, t]);

  if (loading || error || !work) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background text-foreground text-xl">
        {loading
          ? t("projects.details.loading")
          : error || t("projects.details.notFound")}
      </div>
    );
  }

  return (
    <main className="min-h-dvh bg-background pb-24 pt-32 text-foreground">
      <title>
        {t("projects.details.pageTitle", { name: work.projectName })}
      </title>
      <meta
        name="description"
        content={work.shortDescription || work.projectDetails.slice(0, 160)}
      />

      <Container className="">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          {t("projects.details.allProjects")}
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              {work.category || t("common.project")}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
              {work.projectName}
            </h1>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            {work.isLive && work.projectLink && (
              <a
                href={work.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                <ExternalLink className="size-4" />
                {t("projects.details.liveSite")}
              </a>
            )}
            {work.githubLink && (
              <a
                href={work.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold transition hover:border-slate-900 dark:border-white/15 dark:hover:border-white"
              >
                <Github className="size-4" />
                {t("projects.details.source")}
              </a>
            )}
          </div>
        </div>

        <div className="mt-14 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-2xl dark:border-white/10 dark:bg-white/5">
          <img
            src={work.mainImage}
            alt={t("projects.details.imageAlt", { name: work.projectName })}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>

        <div className="mt-14 space-y-12">
          <section>
            <h2 className="text-2xl font-semibold">
              {t("projects.details.technology")}
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {work.usingTech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium dark:border-white/10 dark:bg-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              {t("projects.details.about")}
            </h2>
            <p className="mt-5 max-w-4xl whitespace-pre-line text-base leading-8 text-slate-600 dark:text-slate-400">
              {work.projectDetails}
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
};

export default ProjectDetails;
