import { useEffect, useState } from "react";
import SkillsBox from "./SkillsBox";
import axios from "axios";
import Container from "./Container";
import SkillsBoxSkeleton from "./SkillBoxSkeleton";
import { API_ENDPOINTS } from "../lib/api";
interface SkillsProps {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
}

const Skills = () => {
  const [skills, setSkills] = useState<SkillsProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get<SkillsProps[]>(API_ENDPOINTS.skills.list);
        setSkills(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching skills data:", error);
      }
    };
    fetchSkills();
  }, []);

  return (
    <Container className={""}>
      <div id="skills" className="min-h-[80dvh] mb-20">
        <div className="mb-20">
          <h1 className="text-[#1a1a1a] dark:text-[#eeeeee] text-4xl font-bold">
            Current Skills
          </h1>
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-5">
          {isLoading
            ? Array.from({ length: 5 }).map(() => <SkillsBoxSkeleton />)
            : skills.map((skill) => (
                <SkillsBox
                  key={skill._id}
                  name={skill.name}
                  description={skill.description}
                  imageUrl={skill.imageUrl}
                  forAdmin={false}
                  id={skill._id}
                />
              ))}{" "}
        </div>
      </div>
    </Container>
  );
};

export default Skills;
