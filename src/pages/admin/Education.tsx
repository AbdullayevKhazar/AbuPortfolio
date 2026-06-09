import { useEffect, useState } from "react";
import { GraduationCap, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  apiClient,
  API_ENDPOINTS,
  getApiErrorMessage,
} from "../../lib/api";

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

const formatDate = (date?: string) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      })
    : "Present";

const Education = () => {
  const [educations, setEducations] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<EducationItem[]>(API_ENDPOINTS.education.list)
      .then(({ data }) => setEducations(data))
      .catch((requestError) =>
        setError(
          getApiErrorMessage(requestError, "Failed to load education records."),
        ),
      )
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this education record?")) return;
    setError("");
    try {
      await apiClient.delete(API_ENDPOINTS.education.delete(id));
      setEducations((current) =>
        current.filter((item) => item._id !== id),
      );
    } catch (requestError) {
      setError(
        getApiErrorMessage(
          requestError,
          "Failed to delete education record.",
        ),
      );
    }
  };

  return (
    <section className="mx-auto max-w-5xl space-y-6">
      <div>
        <p className="text-sm font-medium text-blue-600">Background</p>
        <h1 className="text-3xl font-bold">Education</h1>
      </div>

      {loading && <p>Loading education records...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="space-y-4">
        {educations.map((education) => (
          <article
            key={education._id}
            className="flex flex-col gap-4 rounded-xl border bg-card p-5 shadow-sm sm:flex-row"
          >
            {education.schoolImage ? (
              <img
                src={education.schoolImage}
                alt={education.schoolName}
                className="size-14 rounded-lg border object-cover"
              />
            ) : (
              <div className="flex size-14 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                <GraduationCap className="size-6" />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold">{education.schoolName}</h2>
              <p className="font-medium text-muted-foreground">
                {[education.degree, education.fieldOfStudy]
                  .filter(Boolean)
                  .join(" - ")}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                {formatDate(education.startDate)} -{" "}
                {education.isCurrent
                  ? "Present"
                  : formatDate(education.endDate)}
              </p>
              {education.description && (
                <p className="mt-3 text-sm">{education.description}</p>
              )}
            </div>

            <div className="flex shrink-0 gap-2 sm:flex-col">
              <Link
                to={`/admin/edit-education/${education._id}`}
                className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-accent"
              >
                <Pencil className="size-4" /> Edit
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(education._id)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10"
              >
                <Trash2 className="size-4" /> Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      {!loading && !educations.length && (
        <p className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
          No education records added yet.
        </p>
      )}
    </section>
  );
};

export default Education;
