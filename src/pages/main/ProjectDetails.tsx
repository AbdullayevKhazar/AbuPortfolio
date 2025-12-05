import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Work {
  _id: string;
  projectName: string;
  projectDetails: string;
  mainImage: string;
  usingTech: string[];
  projectLink?: string;
  githubLink: string;
}

const ProjectDetails = () => {
  const { id } = useParams();
  const [work, setWork] = useState<Work | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `https://api.xab.net.az/api/my-works/${id}`
        );
        setWork(res.data);
      } catch (err) {
        console.error("Failed to fetch project:", err);
        setError("Failed to load project details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-dvh bg-white text-[#1a1a1a] dark:bg-[#0F0E0E] dark:text-white flex items-center justify-center">
        <h1 className="text-3xl">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-dvh bg-white text-[#1a1a1a] dark:bg-[#0F0E0E] dark:text-white flex items-center justify-center">
        <h1 className="text-3xl text-red-500">{error}</h1>
      </div>
    );
  }

  if (!work) {
    return (
      <div className="min-h-dvh bg-white text-[#1a1a1a] dark:bg-[#0F0E0E] dark:text-white flex items-center justify-center">
        <h1 className="text-3xl">Project not found.</h1>
      </div>
    );
  }
  console.log(work.projectName);

  return (
    <>
      <title>Project Details</title>
      <meta
        name="description"
        content={`Detailed view of the project ${work.projectName} by Khazar Abdullayev.`}
      />
      <div className="relative min-h-dvh bg-white text-[#1a1a1a] dark:bg-[#0F0E0E] dark:text-white pt-24 md:pt-60">
        {/* Grid background */}
        <div className="absolute top-0 left-0 w-full h-full z-0 grid grid-cols-20">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="border-l border-gray-300/30 dark:border-gray-50/2 h-full"
            ></div>
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-10 text-center">
            {work.projectName}
          </h1>

          {/* Iframe preview */}
          <div className="mb-10 shadow-lg rounded-lg overflow-hidden bg-gray-200 dark:bg-transparent">
            <iframe
              src={work.projectLink}
              className="w-full h-[80vh]"
              loading="lazy"
            />
          </div>

          {/* About + Technologies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="md:col-span-2">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                About this project
              </h2>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-400 leading-normal">
                {work.projectDetails}
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Technologies Used
              </h2>
              <ul className="flex flex-wrap gap-2">
                {work.usingTech.map((tech) => (
                  <li
                    key={tech}
                    className="bg-gray-200 text-[#1a1a1a] dark:bg-[#1a1a1a] dark:text-sky-300 px-3 py-2 rounded-full text-sm"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {work.projectLink && (
              <a
                href={work.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold py-3 px-6 rounded-lg transition-colors w-full sm:w-auto text-center
                           bg-gray-200 text-sky-600 hover:bg-gray-300 hover:text-sky-700
                           dark:bg-[#1e1e1e] dark:text-sky-300 dark:hover:text-sky-500 dark:hover:bg-white/5"
              >
                View Live Project
              </a>
            )}

            {work.githubLink && (
              <a
                href={work.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold py-3 px-6 rounded-lg transition-colors w-full sm:w-auto text-center
                           bg-gray-800 text-white hover:bg-gray-900
                           dark:bg-gray-700 dark:hover:bg-gray-800"
              >
                View GitHub Repo
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
