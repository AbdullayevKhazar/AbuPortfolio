import axios from "axios";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "../lib/api";
import type { Work } from "../types/work";
import Container from "./Container";
import MyWorksBox from "./MyWorksBox";
import MyWorksBoxSkeleton from "./MyWorksBoxSkeleton";

const PortfolioPage = () => {
  const { t } = useTranslation();
  const [works, setWorks] = useState<Work[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const featured = await axios.get<Work[]>(API_ENDPOINTS.works.featured);
        if (featured.data.length) {
          setWorks(featured.data);
          return;
        }

        const fallback = await axios.get<Work[]>(API_ENDPOINTS.works.list);
        setWorks(fallback.data.slice(0, 6));
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorks();
  }, []);

  return (
    <section className="overflow-hidden py-24">
      <Container className="">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-ink dark:text-soft text-4xl font-bold">
              {t("projects.title")}
            </h1>
          </div>
          <Link
            to="/projects"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition hover:border-primary hover:text-primary"
          >
            {t("projects.all")}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {[...Array(2)].map((_, index) => (
              <MyWorksBoxSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {works.length ? (
              works.map((project) => (
                <MyWorksBox
                  id={project._id}
                  key={project._id}
                  title={project.projectName}
                  category={project.category}
                  description={
                    project.shortDescription || project.projectDetails
                  }
                  mainImage={project.mainImage}
                  technologies={project.usingTech}
                  liveUrl={project.projectLink}
                  githubLink={project.githubLink}
                />
              ))
            ) : (
              <p className="text-muted-foreground">{t("projects.empty")}</p>
            )}
          </div>
        )}
      </Container>
    </section>
  );
};

export default PortfolioPage;
