import { useEffect, useState } from "react";
import MyWorksBox from "../../components/MyWorksBox";
import axios from "axios";

interface Works {
  projectName: string;
  projectDetails: string;
  mainImage: string;
  usingTech: string[];
  projectLink?: string;
  githubLink: string;
}
const AllWorks = () => {
  const [works, setWorks] = useState<Works[]>([]);
  useEffect(() => {
    const fetchWorks = async () => {
      const res = await axios.get("http://localhost:8000/api/my-works");
      setWorks(res.data);
    };
    fetchWorks();
  }, []);

  return (
    <>
      {works &&
        works.map((project, index) => (
          <MyWorksBox
            key={index}
            title={project.projectName}
            description={project.projectDetails}
            mainImage={project.mainImage}
            technologies={project.usingTech}
            liveUrl={project.projectLink}
            githubLink={project.githubLink}
          />
        ))}
    </>
  );
};

export default AllWorks;
