import React from "react";
import { Github, Linkedin, ArrowUpRight, Youtube } from "lucide-react";
import Container from "./Container";

interface SocialItem {
  name: string;
  handle: string;
  url: string;
  color: string;
  icon: React.ElementType;
}

const Socials = () => {
  const socials: SocialItem[] = [
    {
      name: "GitHub",
      handle: "@AbdullayevKhazar",
      url: "https://github.com/AbdullayevKhazar",
      color: "group-hover:text-gray-900 dark:group-hover:text-white",
      icon: Github,
    },
    {
      name: "LinkedIn",
      handle: "/in/KhazarAbu",
      url: "https://www.linkedin.com/in/x%C9%99z%C9%99rabdullayev/",
      color: "group-hover:text-blue-600",
      icon: Linkedin,
    },
    {
      name: "Youtube",
      handle: "@inlineflexbox",
      url: "https://www.youtube.com/@inlineflexbox",
      color: "group-hover:text-red-600",
      icon: Youtube,
    },
  ];

  return (
    <div className="my-60">
      {/* Header Section */}
      <Container className="pb-2">
        <div className="flex items-center justify-between mb-20">
          <h2 className="text-4xl font-bold tracking-tight text-[#1a1a1a] dark:text-[#eeeeee] flex items-center gap-2">
            Online Presence
          </h2>
        </div>
      </Container>

      <Container className="pt-0">
        <div className="flex  flex-col backdrop-blur-lg shadow md:divide-x md:flex-row divide-gray-100 dark:divide-white/5 dark:bg-white/5 dark:backdrop-blur-lg rounded-xl overflow-hidden">
          {socials.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-between py-5 pr-5 pl-3
                         transition-all duration-300 flex-1
                         hover:bg-white dark:hover:bg-white/5"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`
                  p-2 rounded-lg bg-gray-100 dark:bg-white/5 
                  text-gray-500 dark:text-gray-400 
                  transition-colors duration-300 ${item.color}
                `}
                >
                  <item.icon size={22} />
                </div>

                <div className="flex flex-col">
                  <span className="font-medium text-gray-900 dark:text-white dark:group-hover:text-sky-300 text-[15px]">
                    {item.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                    {item.handle}
                  </span>
                </div>
              </div>

              <div className="relative flex items-center justify-center w-8 h-8">
                <ArrowUpRight
                  size={18}
                  className="absolute text-gray-400 transition-all duration-300 
                             group-hover:opacity-0 group-hover:translate-x-2 group-hover:-translate-y-2"
                />
                <ArrowUpRight
                  size={18}
                  className={`absolute transition-all duration-300 opacity-0 -translate-x-2 translate-y-2 
                             group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0
                             ${item.color}`}
                />
              </div>
            </a>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Socials;
