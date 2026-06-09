import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WorkForm from "../../components/admin/WorkForm";
import {
  apiClient,
  API_ENDPOINTS,
  getApiErrorMessage,
} from "../../lib/api";
import type { Work, WorkFormValues } from "../../types/work";

const EditWork = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [work, setWork] = useState<Work | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const response = await apiClient.get<Work>(
          API_ENDPOINTS.works.getById(id!),
        );
        setWork(response.data);
      } catch (fetchError) {
        setError(
          getApiErrorMessage(fetchError, "Failed to load the project."),
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchWork();
  }, [id]);

  const handleSubmit = async (
    values: WorkFormValues,
    image: File | null,
  ) => {
    setError("");
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      if (image) formData.append("mainImage", image);
      Object.entries(values).forEach(([key, value]) =>
        formData.append(key, String(value)),
      );
      await apiClient.put(API_ENDPOINTS.works.update(id!), formData);
      navigate("/admin/all-works");
    } catch (submitError) {
      setError(
        getApiErrorMessage(submitError, "Failed to update the project."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center gap-2 text-slate-500">
        <Loader2 className="size-5 animate-spin" />
        Loading project...
      </div>
    );
  }

  if (!work) {
    return <p className="py-20 text-center text-red-500">{error}</p>;
  }

  const initialValues: WorkFormValues = {
    projectName: work.projectName,
    shortDescription: work.shortDescription || work.projectDetails.slice(0, 180),
    projectDetails: work.projectDetails,
    usingTech: work.usingTech.join(", "),
    category: work.category || "Web Application",
    projectLink: work.projectLink || "",
    githubLink: work.githubLink || "",
    isLive: Boolean(work.isLive),
    isFeatured: Boolean(work.isFeatured),
    displayOrder: work.displayOrder || 0,
  };

  return (
    <WorkForm
      title="Edit project"
      description="Keep the project story, links and Home page visibility up to date."
      submitLabel="Save changes"
      initialValues={initialValues}
      initialImage={work.mainImage}
      isSubmitting={isSubmitting}
      error={error}
      onSubmit={handleSubmit}
    />
  );
};

export default EditWork;
