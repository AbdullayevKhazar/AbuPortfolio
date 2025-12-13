import { useState } from "react";
import Container from "../../components/Container";
import TabsBox from "../../components/TabsBox";

const About = () => {
  const [tab, setTab] = useState("experience");

  return (
    <>
      <title>Experience and Education Khazar's</title>
      <meta
        name="description"
        content="Experience and Education details of Khazar Abdullayev, showcasing work history and academic background."
      />
      <div
        className="
      h-auto w-full 
      bg-white text-[#1a1a1a] 
      dark:bg-[#0F0E0E] dark:text-[#eeeeee] 
      relative pt-24 md:pt-60 pb-20
      "
      >
        {/* Background Grid */}
        <div className="absolute top-0 left-0 w-full h-full z-0 grid grid-cols-20">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="border-l border-[#1a1a1a]/3 dark:border-[#eeeeee]/2 h-full"
            />
          ))}
        </div>

        <Container className="">
          {/* Tabs */}
          <div
            className="
          flex items-center w-full rounded-xl overflow-hidden 
          border border-[#1a1a1a]/10 dark:border-[#1a1a1a]
          bg-white dark:bg-[#eeeeee]/5 
          backdrop-blur-md p-1 mb-6 relative z-10
          "
          >
            <button
              onClick={() => setTab("experience")}
              className={`
              flex-1 py-2 rounded-lg transition-all duration-300
              ${
                tab === "experience"
                  ? "bg-[#eeeeee] dark:bg-black/30 text-[#1a1a1a] dark:text-[#eeeeee]"
                  : "text-[#1a1a1a]/50 dark:text-[#eeeeee]/40 hover:bg-[#1a1a1a]/10 dark:hover:bg-[#eeeeee]/10"
              }
            `}
            >
              Work
            </button>

            <button
              onClick={() => setTab("education")}
              className={`
              flex-1 py-2 rounded-lg transition-all duration-300
              ${
                tab === "education"
                  ? "bg-[#eeeeee] dark:bg-black/30 text-[#1a1a1a] dark:text-[#eeeeee]"
                  : "text-[#1a1a1a]/50 dark:text-[#eeeeee]/40 hover:bg-[#1a1a1a]/10 dark:hover:bg-[#eeeeee]/10"
              }
              `}
            >
              Education
            </button>
          </div>

          <TabsBox tab={tab} />
        </Container>
      </div>
    </>
  );
};

export default About;
