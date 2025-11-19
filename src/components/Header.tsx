import { Earth, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Xezer_CV.pdf";
    link.download = "Abdullayev.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="w-full min-h-dvh relative flex items-center justify-center flex-col overflow-hidden px-4 sm:px-6">
      <div className="absolute top-0 left-0 w-full h-full z-0 grid grid-cols-20">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="border-l border-gray-50/1"></div>
        ))}
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-center justify-center max-w-[600px] text-wrap leading-none text-center">
        <p className="text-[#1a1a1a] dark:text-[#eeeeee]/80  text-sm sm:text-md font-light z-10 leading-loose">
          Based in Azerbaijan
        </p>

        <h1 className="z-10 text-[#1a1a1a] dark:text-white text-2xl sm:text-4xl md:text-5xl font-bold mt-2">
          Quality
          <span className="text-[#59848e] dark:text-[#7fbdcb] block sm:inline px-1 sm:px-2 text-3xl sm:text-[40px]">
            Design & Web Development
          </span>
          Synergy.
        </h1>

        <p className=" text-[#1a1a1a] dark:text-[#eeeeee]/80 text-xs sm:text-sm font-light z-10 leading-relaxed mt-3">
          Hi, I'm Khazar — a Front-End Developer passionate about crafting
          modern digital experiences.
        </p>
      </div>

      {/* Buttons */}
      <div className="z-10 mt-4 flex flex-col sm:flex-row gap-3 sm:gap-6">
        <Link
          to="../projects"
          className="bg-[#eeeeee] shadow dark:bg-[#1A1A1A] text-xs sm:text-sm border border-gray-50/10 py-2 px-4 text-[#1a1a1a] dark:text-[#eeeeee]/90 flex items-center justify-center gap-1 rounded-md hover:text-[#1a1a1a]/50 dark:hover:text-white transition-colors duration-300"
        >
          See My Works
          <MoveRight size={14} />
        </Link>

        <button
          onClick={handleDownload}
          className="text-xs sm:text-sm text-[#59848e] dark:text-[#7fbdcb] flex items-center justify-center gap-1 rounded-md dark:hover:text-white transition-colors duration-300 cursor-pointer"
        >
          Look My CV
          <Earth size={14} />
        </button>
      </div>

      <span className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#1a1a1a] dark:text-white/50 text-xs sm:text-sm z-10">
        Scroll Down
      </span>
    </section>
  );
};

export default Header;
