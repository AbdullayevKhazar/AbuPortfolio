import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

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
const TabsBox = ({ tab }: { tab: string }) => {
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
            {loading && (
              <div className="space-y-8">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col md:flex-row gap-6 items-center md:items-start"
                  >
                    <Skeleton className="w-12 h-12 rounded-lg" />

                    <div className="flex-1 space-y-3 w-full">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-3 w-1/4" />
                      <Skeleton className="h-3 w-1/5" />

                      <div className="space-y-2 mt-3">
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-5/6" />
                        <Skeleton className="h-3 w-4/6" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
                      {job.isCurrentJob ? "Present" : formatDate(job.endDate)}
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
            {loading && (
              <div className="space-y-8">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col md:flex-row gap-6 items-center md:items-start"
                  >
                    <Skeleton className="w-12 h-12 rounded-lg" />

                    <div className="flex-1 space-y-3 w-full">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-3 w-1/4" />
                      <Skeleton className="h-3 w-1/5" />

                      <div className="space-y-2 mt-3">
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-5/6" />
                        <Skeleton className="h-3 w-4/6" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

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
    </>
  );
};

export default TabsBox;
