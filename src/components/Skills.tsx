import { useEffect, useState } from "react";
import SkillsBox from "./SkillsBox";
import axios from "axios";
import Container from "./Container";
interface SkillsProps {
  name: string;
  description: string;
  iconName: string;
}

const Skills = () => {
  // const skills = [
  //   {
  //     name: "HTML",
  //     icon: <FaHtml5 className="text-orange-500 text-4xl" />,
  //     description: "Crafting responsive and semantic layouts.",
  //   },
  //   {
  //     name: "CSS",
  //     icon: <FaCss3Alt className="text-blue-500 text-4xl" />,
  //     description: "Styling modern, responsive UIs.",
  //   },
  //   {
  //     name: "JavaScript",
  //     icon: <SiJavascript className="text-yellow-400 text-4xl" />,
  //     description: "Creating interactive web experiences.",
  //   },
  //   {
  //     name: "React",
  //     icon: <FaReact className="text-cyan-400 text-4xl" />,
  //     description: "Building scalable, component-based interfaces.",
  //   },
  //   {
  //     name: "Tailwind CSS",
  //     icon: <SiTailwindcss className="text-sky-400 text-4xl" />,
  //     description: "Designing clean, fast UIs with utility-first CSS.",
  //   },
  //   {
  //     name: "API Integration",
  //     icon: <RiExchangeFundsFill className="text-green-500 text-4xl" />,
  //     description: "Connecting apps with RESTful APIs.",
  //   },
  //   {
  //     name: "Git & GitHub",
  //     icon: <FaGithub className="text-gray-700 text-4xl" />,
  //     description: "Version control and collaboration.",
  //   },
  //   {
  //     name: "CI/CD Pipelines",
  //     icon: <SiGithubactions className="text-indigo-500 text-4xl" />,
  //     description: "Automating build and deployment workflows.",
  //   },
  //   {
  //     name: "Frontend Development",
  //     icon: <MdWeb className="text-purple-500 text-4xl" />,
  //     description: "Optimizing UI/UX and performance.",
  //   },
  // ];
  const [skills, setSkills] = useState<SkillsProps[]>([]);
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get<SkillsProps[]>(
          "http://localhost:8000/api/skills/"
        );
        setSkills(res.data);
      } catch (error) {
        console.error("Error fetching skills data:", error);
      }
    };
    fetchSkills();
  }, []);

  return (
    <Container>
      <div id="skills" className="min-h-[80dvh] mt-20 dark">
        <div className="mb-20">
          <h1 className="text-[#eeeeee] text-4xl font-bold">Current Skills</h1>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((items) => (
            <SkillsBox
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
