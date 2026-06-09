import { useMemo, useState } from "react";
import { Check, Search } from "lucide-react";
import simpleIcons from "simple-icons/icons.json";
import SkillIcon from "./SkillIcon";

interface IconData {
  title: string;
  slug: string;
  hex: string;
  aliases?: {
    aka?: string[];
  };
}

interface SkillIconPickerProps {
  selectedSlug: string;
  onSelect: (icon: IconData) => void;
}

const icons = simpleIcons as IconData[];

const SkillIconPicker = ({
  selectedSlug,
  onSelect,
}: SkillIconPickerProps) => {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const filteredIcons = useMemo(() => {
    const matches = normalizedQuery
      ? icons.filter((icon) => {
          const aliases = icon.aliases?.aka?.join(" ").toLowerCase() || "";
          return (
            icon.title.toLowerCase().includes(normalizedQuery) ||
            icon.slug.includes(normalizedQuery) ||
            aliases.includes(normalizedQuery)
          );
        })
      : icons;

    return matches.slice(0, 120);
  }, [normalizedQuery]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search 3,370 technology and brand icons..."
          className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-3 outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Showing {filteredIcons.length}
        {normalizedQuery ? " matching" : " popular alphabetic"} results. Search
        by technology or brand name.
      </p>

      <div className="grid max-h-72 grid-cols-3 gap-2 overflow-y-auto rounded-xl border bg-muted/20 p-2 sm:grid-cols-4 lg:grid-cols-6">
        {filteredIcons.map((icon) => {
          const selected = selectedSlug === icon.slug;
          return (
            <button
              key={icon.slug}
              type="button"
              onClick={() => onSelect(icon)}
              className={`relative flex min-h-24 flex-col items-center justify-center gap-2 rounded-lg border p-2 text-center transition ${
                selected
                  ? "border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/20"
                  : "border-transparent bg-background hover:border-border hover:bg-accent"
              }`}
              title={icon.title}
            >
              {selected && (
                <span className="absolute right-1.5 top-1.5 rounded-full bg-blue-600 p-0.5 text-white">
                  <Check className="size-3" />
                </span>
              )}
              <SkillIcon
                name={icon.title}
                iconSlug={icon.slug}
                iconColor={icon.hex}
                className="size-8"
              />
              <span className="line-clamp-2 text-[11px] font-medium">
                {icon.title}
              </span>
            </button>
          );
        })}
      </div>

      {filteredIcons.length === 0 && (
        <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          No icon found. Try another spelling or upload a custom image.
        </p>
      )}
    </div>
  );
};

export default SkillIconPicker;
