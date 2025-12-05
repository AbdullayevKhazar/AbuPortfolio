import { useEffect, useState } from "react";
import axios from "axios";
import { Briefcase, Calendar, CheckCircle, X } from "lucide-react";
import { Link } from "react-router-dom";

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

const Experiences = () => {
  const [data, setData] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchExperiences = async () => {
    try {
      const res = await axios.get("https://api.xab.net.az/api/experiences");
      setData(res.data);
    } catch (err) {
      setError("Failed to load experiences" + err);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id: string) => {
    await axios.delete(`https://api.xab.net.az/api/experiences/${id}`);
    fetchExperiences();
  };
  useEffect(() => {
    fetchExperiences();
  }, []);

  if (loading)
    return <p className="text-center py-10">Loading experiences...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {data.map((exp) => (
        <Link
          to={`/admin/edit-experience/${exp._id}`}
          key={exp._id}
          className="flex gap-4 p-4 rounded-xl shadow-md border bg-white hover:shadow-lg transition"
        >
          <img
            src={exp.companyImage}
            alt={exp.companyName}
            className="w-16 h-16 rounded-lg object-cover border "
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Briefcase size={20} />
              <h2 className="font-semibold text-lg">{exp.position}</h2>
            </div>

            <p className="text-gray-700">{exp.companyName}</p>

            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <Calendar size={16} />
              <span>
                {new Date(exp.startDate).toLocaleDateString()} —{" "}
                {exp.isCurrentJob
                  ? "Present"
                  : exp.endDate
                  ? new Date(exp.endDate).toLocaleDateString()
                  : ""}
              </span>
            </div>

            {exp.myContributions.length > 0 && (
              <ul className="mt-3 space-y-1">
                {exp.myContributions.map((c, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle size={14} className="text-green-600" />
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>{" "}
          <div onClick={() => handleDelete(exp._id)}>
            <X />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Experiences;
