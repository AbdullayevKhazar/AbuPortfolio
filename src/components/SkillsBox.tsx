import { X } from "lucide-react";
import DynamicIcon from "./DynamicIcons";
import axios from "axios";

const SkillsBox = ({
  name,
  description,
  iconName,
  forAdmin,
  id,
}: {
  name: string;
  description: string;
  iconName: string;
  forAdmin: boolean;
  id?: string;
}) => {
  const deleteSkill = async () => {
    await axios.delete(`https://api.xab.net.az/api/skills/delete/${id}`);
  };
  return (
    <div
      className="flex items-start gap-4 p-4 w-full rounded-xl relative
                 border backdrop-blur-lg transition-all duration-300  z-10
                  border-gray-200  bg-white/90 dark:bg-white/5 hover:bg-white/90 shadow-md
                  dark:border-white/10  dark:backdrop-blur-lg dark:hover:bg-white/10"
      key={id}
    >
      <div
        className="flex items-center justify-center w-12 h-12 rounded-md
                   text-gray-800 dark:text-white z-10"
      >
        <DynamicIcon iconName={iconName} size={36} />
      </div>
      {/* Text Content */}
      <div className="flex flex-col z-10">
        <h3
          className="text-lg font-semibold 
                     text-gray-900 dark:text-white z-10"
        >
          {name}
        </h3>
        <p
          className="text-xs leading-relaxed
                     text-gray-600 dark:text-[#eeeeee]/80 z-10"
        >
          {description}
        </p>
      </div>
      {forAdmin && (
        <button onClick={deleteSkill}>
          <X size={16} color="red" />
        </button>
      )}
    </div>
  );
};

export default SkillsBox;
