import { useState, useEffect } from "react";
import axios from "axios";
import Container from "../../components/Container";

interface Experience {
  _id: string;
  companyName: string;
  position: string;
  companyImage: string;
  startDate: string;
  endDate?: string;
  isCurrentJob: boolean;
  myContributions: string[];
}

interface Education {
  _id: string;
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string | undefined;
  description?: string;
  schoolImage?: string;
  isCurrent?: boolean;
}

const About = () => {
  const [tab, setTab] = useState("experience");

  const [data, setData] = useState<Education[] | Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://api.xab.net.az/api/${tab}`);
      setData(res.data);
    } catch (err) {
      setError("Failed to load data." + err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, [tab]);

  const formatDate = (date?: string) => {
    if (!date) return "Present";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

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

          {/* Content */}
          <div
            className="
          p-4 md:p-8 rounded-xl shadow
          border border-[#1a1a1a]/10 dark:border-[#eeeeee]/10
          bg-white dark:bg-[#eeeeee]/5 
          backdrop-blur-md min-h-[300px]
          relative z-10
        "
          >
            {/* Work Experience */}
            {tab === "experience" && data.length > 0 && (
              <div className="text-[#1a1a1a] dark:text-[#eeeeee] space-y-8">
                {loading && <p>Loading work experience...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading &&
                  (data as Experience[]).map((job: Experience) => (
                    <div
                      key={job._id}
                      className="flex flex-col md:flex-row gap-6 items-center md:items-start"
                    >
                      <img
                        src={job.companyImage}
                        alt="logo"
                        className="w-12 h-12 rounded-lg object-cover border border-[#1a1a1a]/10 dark:border-[#eeeeee]/10 mt-1"
                      />

                      <div className="flex-1">
                        <h3 className="font-bold text-sm md:text-xl">
                          {job.position}
                        </h3>

                        <p className="font-medium text-[#1a1a1a]/80 dark:text-[#eeeeee]/80">
                          {job.companyName}
                        </p>

                        <p className="text-xs uppercase tracking-wider text-[#1a1a1a]/60 dark:text-[#eeeeee]/60 mt-1">
                          {formatDate(job.startDate)}{" "}
                          {job.isCurrentJob
                            ? "Present"
                            : formatDate(job.endDate)}
                        </p>

                        <ul className="mt-3 list-disc list-inside space-y-2 text-xs md:text-sm">
                          {job.myContributions?.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {/* Education */}
            {tab === "education" && data.length > 0 && (
              <div className="text-[#1a1a1a] dark:text-[#eeeeee] space-y-8">
                {loading && <p>Loading education...</p>}

                {!loading &&
                  (data as Education[]).map((edu) => (
                    <div key={edu._id} className="flex gap-4 items-start">
                      <img
                        src={edu.schoolImage}
                        alt="logo"
                        className="w-12 h-12 rounded-full object-contain border border-[#1a1a1a]/10 dark:border-[#eeeeee]/10 mt-1"
                      />

                      <div className="flex-1">
                        <h3 className="font-bold text-lg md:text-xl">
                          {edu.schoolName}
                        </h3>

                        <p className="font-medium text-[#1a1a1a]/80 dark:text-[#eeeeee]/80">
                          {edu.degree && `${edu.degree} - `} {edu.fieldOfStudy}
                        </p>

                        <p className="text-xs uppercase tracking-wider mt-1">
                          {formatDate(edu.startDate)} –{" "}
                          {edu.isCurrent ? "Present" : formatDate(edu.endDate)}
                        </p>

                        {edu.description && (
                          <p className="mt-3 text-sm opacity-90">
                            {edu.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default About;
