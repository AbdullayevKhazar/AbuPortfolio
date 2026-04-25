import { useEffect, useState } from "react";
import Container from "./Container";
import MyWorksBox from "./MyWorksBox";
import axios from "axios";
import MyWorksBoxSkeleton from "./MyWorksBoxSkeleton";
import { API_ENDPOINTS } from "../lib/api";

interface Works {
  _id: string;
  projectName: string;
  projectDetails: string;
  mainImage: string;
  usingTech: string[];
  projectLink?: string;
  githubLink: string;
}
const PortfolioPage = () => {
  const [works, setWorks] = useState<Works[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await axios.get(API_ENDPOINTS.works.list);
        setWorks(res.data);
        setIsLoading(false);
      } catch {
        console.log("");
      }
    };
    fetchWorks();
  }, []);

  return (
    <Container className={""}>
      <h2 className="text-4xl font-bold text-[#1a1a1a] dark:text-[#eeeeee]">
        My Real Works
      </h2>

      <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2 mb-20">
        {isLoading
          ? [...Array(2)].map((_, i) => <MyWorksBoxSkeleton key={i} />)
          : works.map((project) => (
              <MyWorksBox
                id={project._id}
                key={project._id}
                title={project.projectName}
                description={project.projectDetails}
                mainImage={project.mainImage}
                technologies={project.usingTech}
                liveUrl={project.projectLink}
                githubLink={project.githubLink}
                isAdmin={false}
                onDelete={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            ))}
      </div>
    </Container>
  );
};

export default PortfolioPage;
