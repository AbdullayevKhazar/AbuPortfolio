import axios from "axios";
import { useEffect, useState } from "react";
import Container from "../../components/Container";
import MyWorksBox from "../../components/MyWorksBox";
import { API_ENDPOINTS } from "../../lib/api";
import type { Work } from "../../types/work";
import { useTranslation } from "react-i18next";

const MyProject = () => {
  const { t } = useTranslation();
  const [works, setWorks] = useState<Work[]>([]);

  useEffect(() => {
    axios
      .get<Work[]>(API_ENDPOINTS.works.list)
      .then((response) => setWorks(response.data));
  }, []);

  return (
    <main className="relative min-h-dvh bg-background pb-24 pt-32 text-foreground">
      <title>{t("projects.title")} | Khazar Abdullayev</title>
      <div className="pointer-events-none absolute inset-0 z-0 grid grid-cols-20">
        {Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className="h-full border-l border-border/40"
          />
        ))}
      </div>

      <Container className="relative z-10">
        <div className="mt-14 grid gap-8 md:grid-cols-2">
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
      </Container>
    </main>
  );
};

export default MyProject;
