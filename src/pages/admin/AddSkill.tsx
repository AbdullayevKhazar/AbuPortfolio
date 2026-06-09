import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import SkillIcon from "../../components/SkillIcon";
import SkillIconPicker from "../../components/SkillIconPicker";
import {
  apiClient,
  API_ENDPOINTS,
  getApiErrorMessage,
} from "../../lib/api";

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
  iconSlug: Yup.string(),
  iconColor: Yup.string(),
  image: Yup.mixed<File>().nullable(),
}).test(
  "icon-required",
  "Select an icon or upload a custom image",
  (values) => Boolean(values?.iconSlug || values?.image),
);

const AddSkill = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const [submitError, setSubmitError] = useState("");

  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview],
  );

  const initialValues: SkillFormValues = {
    name: "",
    description: "",
    iconSlug: "",
    iconColor: "",
    image: null,
  };

  return (
    <section className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="text-sm font-medium text-blue-600">Skills</p>
        <h1 className="text-3xl font-bold">Add skill</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose from the complete Simple Icons catalog or upload your own
          image.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitError("");
          try {
            const formData = new FormData();
            formData.append("name", values.name.trim());
            formData.append("description", values.description.trim());
            if (values.image) {
              formData.append("image", values.image);
            } else {
              formData.append("iconSlug", values.iconSlug);
              formData.append("iconColor", values.iconColor);
            }

            await apiClient.post(API_ENDPOINTS.skills.add, formData);
            navigate("/admin");
          } catch (error) {
            setSubmitError(getApiErrorMessage(error, "Failed to add skill."));
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue, values, errors, submitCount }) => (
          <Form className="space-y-6 rounded-2xl border bg-card p-5 shadow-sm md:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-sm font-medium">
                  Skill name
                </label>
                <Field
                  id="name"
                  name="name"
                  placeholder="React"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 outline-none focus:ring-2 focus:ring-ring"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="description" className="text-sm font-medium">
                  Short description
                </label>
                <Field
                  id="description"
                  name="description"
                  placeholder="Component-based frontend library"
                  maxLength={100}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 outline-none focus:ring-2 focus:ring-ring"
                />
                <div className="flex justify-between">
                  <ErrorMessage
                    name="description"
                    component="p"
                    className="text-sm text-red-500"
                  />
                  <span className="ml-auto text-xs text-muted-foreground">
                    {values.description.length}/100
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-semibold">Catalog icon</h2>
                  <p className="text-sm text-muted-foreground">
                    Search and select any available brand or technology.
                  </p>
                </div>
                {values.iconSlug && (
                  <button
                    type="button"
                    onClick={() => {
                      void setFieldValue("iconSlug", "");
                      void setFieldValue("iconColor", "");
                    }}
                    className="text-sm font-medium text-red-500 hover:underline"
                  >
                    Clear selection
                  </button>
                )}
              </div>

              {values.iconSlug && (
                <div className="flex items-center gap-3 rounded-xl border bg-muted/30 p-3">
                  <SkillIcon
                    name={values.name || values.iconSlug}
                    iconSlug={values.iconSlug}
                    iconColor={values.iconColor}
                    className="size-10"
                  />
                  <div>
                    <p className="font-medium">{values.iconSlug}</p>
                    <p className="text-xs text-muted-foreground">
                      Selected catalog icon
                    </p>
                  </div>
                </div>
              )}

              <SkillIconPicker
                selectedSlug={values.iconSlug}
                onSelect={(icon) => {
                  if (preview) URL.revokeObjectURL(preview);
                  setPreview("");
                  void setFieldValue("image", null);
                  void setFieldValue("iconSlug", icon.slug);
                  void setFieldValue("iconColor", icon.hex);
                  if (!values.name) void setFieldValue("name", icon.title);
                }}
              />
            </div>

            <div className="space-y-3 border-t pt-6">
              <div>
                <h2 className="font-semibold">Custom icon</h2>
                <p className="text-sm text-muted-foreground">
                  Optional. Uploading a custom image replaces the catalog icon.
                </p>
              </div>

              {preview ? (
                <div className="flex items-center justify-between rounded-xl border p-3">
                  <img
                    src={preview}
                    alt="Custom icon preview"
                    className="size-14 rounded-lg object-contain"
                  />
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      URL.revokeObjectURL(preview);
                      setPreview("");
                      void setFieldValue("image", null);
                    }}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-500/10"
                    aria-label="Remove custom icon"
                  >
                    <Trash2 className="size-5" />
                  </button>
                </div>
              ) : (
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed p-5 text-sm font-medium transition hover:bg-accent">
                  <ImagePlus className="size-5" />
                  Upload custom image
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

            {submitCount > 0 && typeof errors === "string" && (
              <p role="alert" className="text-sm text-red-500">
                {errors}
              </p>
            )}
            {submitError && (
              <p role="alert" className="text-sm text-red-500">
                {submitError}
              </p>
            )}

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
                Add skill
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default AddSkill;
