import { Code2 } from "lucide-react";
import { useState } from "react";
import { getSimpleIconUrl } from "../lib/simpleIcons";

interface SkillIconProps {
  name: string;
  imageUrl?: string;
  iconSlug?: string;
  iconColor?: string;
  className?: string;
}

const SkillIcon = ({
  name,
  imageUrl,
  iconSlug,
  iconColor,
  className = "size-12",
}: SkillIconProps) => {
  const [imageFailed, setImageFailed] = useState(false);
  const source =
    imageUrl ||
    (iconSlug ? getSimpleIconUrl(iconSlug, iconColor || "111827") : "");

  if (!source || imageFailed) {
    return (
      <Code2
        className={`${className} text-blue-600 dark:text-blue-400`}
        aria-label={`${name} icon unavailable`}
      />
    );
  }

  return (
    <img
      src={source}
      alt={`${name} icon`}
      className={`${className} object-contain`}
      loading="lazy"
      onError={() => setImageFailed(true)}
    />
  );
};

export default SkillIcon;
