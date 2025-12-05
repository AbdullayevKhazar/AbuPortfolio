import { useEffect, useState } from "react";
import Container from "./Container";
import MyWorksBox from "./MyWorksBox";
import axios from "axios";

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
  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await axios.get("https://api.xab.net.az/api/my-works/");
        setWorks(res.data);
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
        {works &&
          works.map((project) => (
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
