import { useEffect, useState } from "react";
import MyWorksBox from "../../components/MyWorksBox";
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
const AllWorks = () => {
  const [works, setWorks] = useState<Works[]>([]);

  useEffect(() => {
    const fetchWorks = async () => {
      const res = await axios.get("https://api.xab.net.az/api/my-works");
      setWorks(res.data);
    };
    fetchWorks();
  }, []);

  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-10">My All Works</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {works &&
            works.map((project) => (
              <MyWorksBox
                id={project._id}
                title={project.projectName}
                description={project.projectDetails}
                mainImage={project.mainImage}
                technologies={project.usingTech}
                liveUrl={project.projectLink}
                githubLink={project.githubLink}
                isAdmin
                onDelete={(deletedId) =>
                  setWorks((prev) => prev.filter((w) => w._id !== deletedId))
                }
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default AllWorks;
