import { Trash2 } from "lucide-react";
import { apiClient, API_ENDPOINTS } from "../lib/api";
import SkillIcon from "./SkillIcon";
import { useTranslation } from "react-i18next";

const SkillsBox = ({
  name,
  description,
  imageUrl,
  iconSlug,
  iconColor,
  forAdmin,
  id,
  onDelete,
}: {
  name: string;
  description: string;
  imageUrl?: string;
  iconSlug?: string;
  iconColor?: string;
  forAdmin: boolean;
  id?: string;
  onDelete?: (id: string) => void;
}) => {
  const { t } = useTranslation();
  const deleteSkill = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!window.confirm(t("skills.deleteConfirm", { name }))) return;

    await apiClient.delete(API_ENDPOINTS.skills.delete(id!));
    if (id) onDelete?.(id);
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
        <SkillIcon
          name={name}
          imageUrl={imageUrl}
          iconSlug={iconSlug}
          iconColor={iconColor}
          className="size-12"
        />
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
                     text-gray-600 dark:text-soft/80 z-10"
        >
          {description}
        </p>
      </div>
      {forAdmin && (
        <button
          type="button"
          onClick={deleteSkill}
          className="ml-auto rounded-md p-2 text-red-500 transition hover:bg-red-500/10"
          aria-label={t("skills.deleteLabel", { name })}
        >
          <Trash2 className="size-4" />
        </button>
      )}
    </div>
  );
};

export default SkillsBox;
