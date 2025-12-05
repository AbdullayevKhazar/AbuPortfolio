import { useEffect, useState } from "react";
import SkillsBox from "./SkillsBox";
import axios from "axios";
import Container from "./Container";
interface SkillsProps {
  _id: string;
  name: string;
  description: string;
  iconName: string;
}

const Skills = () => {
  const [skills, setSkills] = useState<SkillsProps[]>([]);
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get<SkillsProps[]>(
          "https://api.xab.net.az/api/skills"
        );
        setSkills(res.data);
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
          {skills.map((items) => (
            <SkillsBox
              id={items._id}
              name={items.name}
              description={items.description}
              iconName={items.iconName}
              forAdmin={false}
            />
          ))}{" "}
        </div>
      </div>
    </Container>
  );
};

export default Skills;
