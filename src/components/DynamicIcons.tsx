import * as SimpleIcons from "react-icons/si";
import * as simpleIconsData from "simple-icons";

interface DynamicIconProps {
  iconName: string;
  size?: number;
  color?: string;
}

const simpleIconMap: Record<
  string,
  React.ComponentType<{ size?: number; color?: string }>
> = {
  ...SimpleIcons,
};

const DynamicIcon = ({ iconName, size = 48, color }: DynamicIconProps) => {
  // Lucide

  // Simple Icons (React Icons)
  const SimpleIcon = simpleIconMap[`Si${iconName}`];
  if (SimpleIcon) {
    const brandKey = Object.keys(simpleIconsData).find(
      (key) => key.toLowerCase() === iconName.toLowerCase()
    );

    const brand = brandKey
      ? (simpleIconsData as unknown as Record<string, { hex?: string }>)[
          brandKey
        ]
      : null;
    const brandColor = brand?.hex ? `#${brand.hex}` : color || "currentColor";

    return <SimpleIcon size={size} color={color || brandColor} />;
  }

  // Fallback
  const Fallback = simpleIconMap["HelpCircle"];
  return <Fallback size={size} color="gray" />;
};

export default DynamicIcon;
