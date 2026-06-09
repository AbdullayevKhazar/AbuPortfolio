import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkForm from "../../components/admin/WorkForm";
import {
  apiClient,
  API_ENDPOINTS,
  getApiErrorMessage,
} from "../../lib/api";
import type { WorkFormValues } from "../../types/work";

const initialValues: WorkFormValues = {
  projectName: "",
  shortDescription: "",
  projectDetails: "",
  usingTech: "",
  category: "Web Application",
  projectLink: "",
  githubLink: "",
  isLive: false,
  isFeatured: false,
  displayOrder: 0,
};

const AddWorks = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (
    values: WorkFormValues,
    image: File | null,
  ) => {
    if (!image) {
      setError("Project cover image is required.");
      return;
    }

    setError("");
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("mainImage", image);
      Object.entries(values).forEach(([key, value]) =>
        formData.append(key, String(value)),
      );
      await apiClient.post(API_ENDPOINTS.works.add, formData);
      navigate("/admin/all-works");
    } catch (submitError) {
      setError(
        getApiErrorMessage(submitError, "Failed to add the project."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <WorkForm
      title="Add a new project"
      description="Create a polished portfolio case study with a strong cover, concise summary and clear project links."
      submitLabel="Publish project"
      initialValues={initialValues}
      isSubmitting={isSubmitting}
      error={error}
      onSubmit={handleSubmit}
    />
  );
};

export default AddWorks;
