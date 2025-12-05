import { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

interface EducationItem {
  _id: string;
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  description?: string;
  schoolImage?: string;
  isCurrent?: boolean;
}

const Education = () => {
  const [educations, setEducations] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEducations = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://api.xab.net.az/api/educations");
      setEducations(res.data.data || res.data || []);
    } catch (err) {
      setError("Failed to load educations." + err);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id: string) => {
    await axios.delete(`https://api.xab.net.az/api/educations/${id}`);
    fetchEducations();
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const formatDate = (date: string | undefined) => {
    if (!date) return "Present";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div
      className="w-full min-h-screen pt-28 pb-20 
      bg-white dark:bg-[#0F0E0E] text-[#1a1a1a] dark:text-[#eeeeee]"
    >
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Education</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="space-y-6">
          {educations.map((edu) => (
            <div
              key={edu._id}
              className="
                flex gap-4 p-5 rounded-xl shadow
                border border-[#1a1a1a]/10 dark:border-[#eeeeee]/10
                bg-white dark:bg-white/5 backdrop-blur-md
              "
            >
              <img
                src={edu.schoolImage}
                alt={edu.schoolName}
                className="w-14 h-14 rounded-lg object-cover border border-[#1a1a1a]/10 dark:border-[#eeeeee]/10"
              />

              <div>
                <h3 className="text-lg md:text-xl font-bold">
                  {edu.schoolName}
                </h3>

                <p className="font-medium opacity-80">
                  {edu.degree} — {edu.fieldOfStudy}
                </p>

                <p className="text-xs uppercase tracking-wide mt-1 opacity-70">
                  {formatDate(edu.startDate)} –{" "}
                  {edu.isCurrent ? "Present" : formatDate(edu.endDate)}
                </p>

                {edu.description && (
                  <p className="mt-3 text-sm opacity-90">{edu.description}</p>
                )}
              </div>
              <button onClick={() => handleDelete(edu._id)}>
                <X />
              </button>
            </div>
          ))}
        </div>

        {educations.length === 0 && !loading && (
          <p className="text-center opacity-60 text-sm py-10">
            No education records found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Education;
