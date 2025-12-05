import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SkillsBox from "../../components/SkillsBox";
import axios from "axios";

interface Skill {
  id: string | number;
  name: string;
  description: string;
  iconName: string;
  _id: string;
}

const AllSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await axios.get("https://api.xab.net.az/api/skills");
        setSkills(res.data);
      } catch (err) {
        console.error("Failed to fetch skills:", err);
        setError("Failed to load skills. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const handleEditClick = (id: string) => {
    navigate(`/admin/edit-skill/${id}`);
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p>Loading skills...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        My Skills & Expertise
      </h2>
      {skills.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <div
              key={skill._id}
              onClick={() => handleEditClick(skill._id)}
              className="cursor-pointer"
            >
              <SkillsBox
                name={skill.name}
                description={skill.description}
                iconName={skill.iconName}
                forAdmin={true}
                id={skill._id}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No skills to display.</p>
      )}
    </section>
  );
};

export default AllSkills;
