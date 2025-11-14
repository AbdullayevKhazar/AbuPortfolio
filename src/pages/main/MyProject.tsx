import { useEffect, useState } from "react";
import Container from "../../components/Container";
import axios from "axios";
import MyWorksBox from "../../components/MyWorksBox";
interface Works {
  _id: string;
  projectName: string;
  projectDetails: string;
  mainImage: string;
  usingTech: string[];
  projectLink?: string;
  githubLink: string;
}
const MyProject = () => {
  const [works, setWorks] = useState<Works[]>([]);
  useEffect(() => {
    const fetchWorks = async () => {
      const res = await axios.get("http://localhost:8000/api/my-works/");
      setWorks(res.data);
    };
    fetchWorks();
  }, []);

  return (
    <div className="relative min-h-auto bg-[#0F0E0E] text-white pt-20">
      <div className="absolute top-0 left-0 w-full h-full z-0 grid grid-cols-20">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="border-l border-gray-50/1 h-full"></div>
        ))}
      </div>
      <Container>
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
    </div>
  );
};

export default MyProject;
