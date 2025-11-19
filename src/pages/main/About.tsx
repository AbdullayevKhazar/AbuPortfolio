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
const About = () => {
  const [tab, setTab] = useState("work");

  const [workData, setWorkData] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchExperiences = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/experiences");
      setWorkData(res.data);
    } catch (err) {
      setError("Failed to load work experience.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const educationData = [
    {
      institution: "University of Technology",
      degree: "M.S. in Computer Science",
      image: "https://via.placeholder.com/150/university",
      startDate: new Date("2018-09-01"),
      endDate: new Date("2020-05-20"),
      details: [
        "Specialized in Human-Computer Interaction",
        "Thesis: 'Optimizing Web Performance for Low-Bandwidth Environments'",
      ],
    },
    {
      institution: "State College",
      degree: "B.S. in Web Design & Development",
      image: "https://via.placeholder.com/150/college",
      startDate: new Date("2014-09-01"),
      endDate: new Date("2018-05-20"),
      details: ["Graduated Summa Cum Laude", "President of the Web Dev Club"],
    },
  ];

  // Helper
  const formatDate = (date: any) => {
    if (!date) return "Present";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
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
            className="border-l border-[#1a1a1a]/5 dark:border-[#eeeeee]/5 h-full"
          />
        ))}
      </div>

      <Container>
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
            onClick={() => setTab("work")}
            className={`
              flex-1 py-2 rounded-lg transition-all duration-300
              ${
                tab === "work"
                  ? "bg-[#eeeeee] dark:bg-black/30 text-[#1a1a1a] dark:text-[#eeeeee] shadow-sm"
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
                  ? "bg-[#eeeeee] dark:bg-black/30 text-[#1a1a1a] dark:text-[#eeeeee] shadow-sm"
                  : "text-[#1a1a1a]/50 dark:text-[#eeeeee]/40 hover:bg-[#1a1a1a]/10 dark:hover:bg-[#eeeeee]/10"
              }
            `}
          >
            Education
          </button>
        </div>

        {/* Content Box */}
        <div
          className="
          p-4 md:p-8 rounded-xl shadow
          border border-[#1a1a1a]/10 dark:border-[#eeeeee]/10
          bg-white dark:bg-[#eeeeee]/5 
          backdrop-blur-md min-h-[300px] transition-all duration-300
          relative z-10
        "
        >
          {tab === "work" && (
            <div className="text-[#1a1a1a] dark:text-[#eeeeee] space-y-8">
              {loading && <p>Loading work experience...</p>}
              {error && <p className="text-red-500">{error}</p>}

              {!loading &&
                !error &&
                workData.map((job) => (
                  <div
                    key={job._id}
                    className="flex flex-col md:flex-row gap-6 items-center md:items-start"
                  >
                    <img
                      src={job.companyImage}
                      alt={`${job.companyName} logo`}
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
                        {formatDate(job.startDate)} –{" "}
                        {job.isCurrentJob ? "Present" : formatDate(job.endDate)}
                      </p>

                      <ul className="mt-3 list-disc list-inside space-y-2 text-xs md:text-sm text-[#1a1a1a]/90 dark:text-[#eeeeee]/90">
                        {job.myContributions.map((item, idx) => (
                          <li
                            key={idx}
                            className="tracking-wide leading-normal"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* EDUCATION TAB (unchanged) */}
          {tab === "education" && (
            <div className="text-[#1a1a1a] dark:text-[#eeeeee] space-y-8">
              {educationData.map((edu) => (
                <div key={edu.institution} className="flex gap-4 items-start">
                  <img
                    src={edu.image}
                    alt={`${edu.institution} logo`}
                    className="w-12 h-12 rounded-lg object-cover border border-[#1a1a1a]/10 dark:border-[#eeeeee]/10 mt-1"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg md:text-xl">
                      {edu.institution}
                    </h3>
                    <p className="font-medium text-[#1a1a1a]/80 dark:text-[#eeeeee]/80">
                      {edu.degree}
                    </p>
                    <p className="text-xs uppercase tracking-wider text-[#1a1a1a]/60 dark:text-[#eeeeee]/60 mt-1">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                    <ul className="mt-3 list-disc list-inside space-y-1.5 text-sm text-[#1a1a1a]/90 dark:text-[#eeeeee]/90">
                      {edu.details.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default About;
