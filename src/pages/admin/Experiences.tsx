import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Calendar,
  CheckCircle2,
  Pencil,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  apiClient,
  API_ENDPOINTS,
  getApiErrorMessage,
} from "../../lib/api";

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

  useEffect(() => {
    apiClient
      .get<Experience[]>(API_ENDPOINTS.experience.list)
      .then(({ data: experiences }) => setData(experiences))
      .catch((requestError) =>
        setError(
          getApiErrorMessage(requestError, "Failed to load experiences."),
        ),
      )
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this experience?")) return;
    setError("");
    try {
      await apiClient.delete(API_ENDPOINTS.experience.delete(id));
      setData((current) => current.filter((item) => item._id !== id));
    } catch (requestError) {
      setError(
        getApiErrorMessage(requestError, "Failed to delete experience."),
      );
    }
  };

  if (loading) {
    return <p className="py-10 text-center">Loading experiences...</p>;
  }

  return (
    <section className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="text-sm font-medium text-blue-600">Career</p>
        <h1 className="text-3xl font-bold">Experiences</h1>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {data.map((experience) => (
        <article
          key={experience._id}
          className="flex flex-col gap-4 rounded-xl border bg-card p-5 shadow-sm sm:flex-row"
        >
          {experience.companyImage ? (
            <img
              src={experience.companyImage}
              alt={experience.companyName}
              className="size-16 rounded-lg border object-cover"
            />
          ) : (
            <div className="flex size-16 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
              <BriefcaseBusiness className="size-7" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold">{experience.position}</h2>
            <p className="text-muted-foreground">{experience.companyName}</p>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="size-4" />
              {new Date(experience.startDate).toLocaleDateString()} -{" "}
              {experience.isCurrentJob
                ? "Present"
                : experience.endDate
                  ? new Date(experience.endDate).toLocaleDateString()
                  : ""}
            </p>
            <ul className="mt-3 space-y-1">
              {experience.myContributions.map((contribution, index) => (
                <li key={index} className="flex gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-600" />
                  {contribution}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex shrink-0 gap-2 sm:flex-col">
            <Link
              to={`/admin/edit-experience/${experience._id}`}
              className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-accent"
            >
              <Pencil className="size-4" /> Edit
            </Link>
            <button
              type="button"
              onClick={() => handleDelete(experience._id)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10"
            >
              <Trash2 className="size-4" /> Delete
            </button>
          </div>
        </article>
      ))}

      {!data.length && (
        <p className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
          No experiences added yet.
        </p>
      )}
    </section>
  );
};

export default Experiences;
