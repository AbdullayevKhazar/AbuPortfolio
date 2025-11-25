import { useEffect, useState } from "react";
import Container from "../../components/Container";
import axios from "axios";
import MyWorksBox from "../../components/MyWorksBox";
import { Helmet } from "react-helmet-async";

interface Works {
  _id: string;
  projectName: string;
  projectDetails: string;
  mainImage: string;
  usingTech: string[];
  projectLink?: string;
  githubLink: string;
}

const MyProject = () => {
  const [works, setWorks] = useState<Works[]>([]);

  useEffect(() => {
    const fetchWorks = async () => {
      const res = await axios.get("http://localhost:8000/api/my-works/");
      setWorks(res.data);
    };
    fetchWorks();
  }, []);

  return (
    <>
      <Helmet>
        {/* --- Basic SEO --- */}
        <title>Projects - Portfolio of Khazar Abdullayev</title>
        <meta
          name="description"
          content="Explore the projects developed by Khazar Abdullayev. Modern, fast, and responsive applications built with React, TypeScript, and full-stack technologies."
        />
        <meta
          name="keywords"
          content="Khazar Abdullayev, Portfolio Projects, Frontend Developer Projects, React Projects, Web Development"
        />

        {/* --- Canonical URL --- */}
        <link rel="canonical" href="https://yourdomain.com/projects" />

        {/* --- Open Graph (Facebook, LinkedIn) --- */}
        <meta
          property="og:title"
          content="Projects – Khazar Abdullayev Portfolio"
        />
        <meta
          property="og:description"
          content="Discover modern and professional web applications built with React, TypeScript and more."
        />
        <meta property="og:url" content="https://yourdomain.com/projects" />
        <meta
          property="og:image"
          content="https://yourdomain.com/portfolio_preview.jpg"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects – By Khazar Abdullayev" />
        <meta
          name="twitter:description"
          content="Professional React and full-stack projects built by Khazar Abdullayev."
        />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/portfolio_preview.jpg"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Khazar Abdullayev – Projects",
            url: "https://yourdomain.com/projects",
            description:
              "A collection of frontend and full-stack projects created by Khazar Abdullayev.",
          })}
        </script>
      </Helmet>

      <div className="relative min-h-auto bg-white text-[#1a1a1a] pt-20 dark:text-[#eeeeee] dark:bg-[#0F0E0E]">
        <div className="absolute top-0 left-0 w-full h-full z-0 grid grid-cols-20">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="border-l border-black/4 dark:border-gray-50/1 h-full"
            ></div>
          ))}
        </div>

        <div className="relative z-10">
          <Container className="">
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {works.map((project) => (
                <MyWorksBox
                  id={project._id}
                  key={project._id}
                  title={project.projectName}
                  description={project.projectDetails}
                  mainImage={project.mainImage}
                  technologies={project.usingTech}
                  liveUrl={project.projectLink}
                  githubLink={project.githubLink}
                  isAdmin={false}
                  onDelete={() => {}}
                />
              ))}
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default MyProject;
