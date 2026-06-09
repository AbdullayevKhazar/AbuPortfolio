import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import SkillIcon from "../../components/SkillIcon";
import SkillIconPicker from "../../components/SkillIconPicker";
import {
  apiClient,
  API_ENDPOINTS,
  getApiErrorMessage,
} from "../../lib/api";

interface Skill {
  _id: string;
  name: string;
  description: string;
  imageUrl?: string;
  iconSlug?: string;
  iconColor?: string;
}

interface SkillFormValues {
  name: string;
  description: string;
  iconSlug: string;
  iconColor: string;
  image: File | null;
}

const validationSchema = Yup.object({
  name: Yup.string().trim().required("Skill name is required"),
  description: Yup.string()
    .trim()
    .max(100, "Description can contain at most 100 characters")
    .required("Description is required"),
});

const EditSkill = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState("");
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    apiClient
      .get<Skill>(API_ENDPOINTS.skills.getById(id!))
      .then(({ data }) => setSkill(data))
      .catch((error) =>
        setPageError(getApiErrorMessage(error, "Failed to load skill.")),
      )
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview],
  );

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center gap-2">
        <Loader2 className="size-5 animate-spin" /> Loading skill...
      </div>
    );
  }

  if (!skill) {
    return <p className="py-10 text-center text-red-500">{pageError}</p>;
  }

  const initialValues: SkillFormValues = {
    name: skill.name,
    description: skill.description,
    iconSlug: skill.iconSlug || "",
    iconColor: skill.iconColor || "",
    image: null,
  };

  return (
    <section className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="text-sm font-medium text-blue-600">Skills</p>
        <h1 className="text-3xl font-bold">Edit skill</h1>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          setStatus("");
          try {
            const formData = new FormData();
            formData.append("name", values.name.trim());
            formData.append("description", values.description.trim());
            if (values.image) {
              formData.append("image", values.image);
            } else if (values.iconSlug) {
              formData.append("iconSlug", values.iconSlug);
              formData.append("iconColor", values.iconColor);
            }
            await apiClient.put(API_ENDPOINTS.skills.update(id!), formData);
            navigate("/admin");
          } catch (error) {
            setStatus(getApiErrorMessage(error, "Failed to update skill."));
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue, values, status }) => (
          <Form className="space-y-6 rounded-2xl border bg-card p-5 shadow-sm md:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-1.5 text-sm font-medium">
                Skill name
                <Field
                  name="name"
                  className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 outline-none focus:ring-2 focus:ring-ring"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-sm text-red-500"
                />
              </label>
              <label className="space-y-1.5 text-sm font-medium">
                Description
                <Field
                  name="description"
                  maxLength={100}
                  className="mt-1 w-full rounded-lg border bg-background px-3 py-2.5 outline-none focus:ring-2 focus:ring-ring"
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="text-sm text-red-500"
                />
              </label>
            </div>

            <div className="flex items-center gap-3 rounded-xl border bg-muted/30 p-4">
              <SkillIcon
                name={values.name}
                imageUrl={preview ? preview : skill.imageUrl}
                iconSlug={values.iconSlug}
                iconColor={values.iconColor}
                className="size-12"
              />
              <div>
                <p className="font-semibold">Current preview</p>
                <p className="text-sm text-muted-foreground">
                  {values.iconSlug || (preview ? "New custom image" : "Custom image")}
                </p>
              </div>
            </div>

            <SkillIconPicker
              selectedSlug={values.iconSlug}
              onSelect={(icon) => {
                if (preview) URL.revokeObjectURL(preview);
                setPreview("");
                void setFieldValue("image", null);
                void setFieldValue("iconSlug", icon.slug);
                void setFieldValue("iconColor", icon.hex);
              }}
            />

            <div className="border-t pt-6">
              {preview ? (
                <div className="flex items-center justify-between rounded-xl border p-3">
                  <p className="text-sm font-medium">New custom image selected</p>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      URL.revokeObjectURL(preview);
                      setPreview("");
                      void setFieldValue("image", null);
                    }}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-500/10"
                    aria-label="Remove selected custom icon"
                  >
                    <Trash2 className="size-5" />
                  </button>
                </div>
              ) : (
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed p-5 text-sm font-medium hover:bg-accent">
                  <ImagePlus className="size-5" /> Replace with custom image
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    className="sr-only"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0] || null;
                      if (!file) return;
                      setPreview(URL.createObjectURL(file));
                      void setFieldValue("image", file);
                      void setFieldValue("iconSlug", "");
                      void setFieldValue("iconColor", "");
                    }}
                  />
                </label>
              )}
            </div>

            {status && <p className="text-sm text-red-500">{status}</p>}

            <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="rounded-lg border px-5 py-2.5 font-medium hover:bg-accent"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                Save changes
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default EditSkill;
