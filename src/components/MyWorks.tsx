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
        const res = await axios.get("http://localhost:8000/api/my-works/");
        setWorks(res.data);
      } catch {}
    };
    fetchWorks();
  }, []);

  return (
    <Container>
      <h2 className="text-4xl font-bold text-[#eeeeee]">My Real Works</h2>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
              onDelete={function (_: string): void {
                throw new Error("Function not implemented.");
              }}
            />
          ))}
      </div>
    </Container>
  );
};

export default PortfolioPage;
