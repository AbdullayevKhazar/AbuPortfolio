import { Field, Form, Formik } from "formik";
import { ArrowLeft, Loader2, Save, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import ImageUploadField from "../ImageUploadField";
import type { WorkFormValues } from "../../types/work";

const validationSchema = Yup.object({
  projectName: Yup.string()
    .trim()
    .max(100, "Maximum 100 characters")
    .required("Project name is required"),
  shortDescription: Yup.string()
    .trim()
    .max(180, "Maximum 180 characters")
    .required("Short description is required"),
  projectDetails: Yup.string()
    .trim()
    .max(2000, "Maximum 2000 characters")
    .required("Project details are required"),
  usingTech: Yup.string().trim().required("Add at least one technology"),
  category: Yup.string().trim().required("Category is required"),
  projectLink: Yup.string()
    .trim()
    .url("Enter a valid URL")
    .test(
      "live-link",
      "Live URL is required when the project is live",
      function (value) {
        return !this.parent.isLive || Boolean(value);
      },
    ),
  githubLink: Yup.string().trim().url("Enter a valid URL"),
  displayOrder: Yup.number()
    .integer("Use a whole number")
    .min(0, "Order cannot be negative"),
});

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white";

interface WorkFormProps {
  title: string;
  description: string;
  submitLabel: string;
  initialValues: WorkFormValues;
  initialImage?: string;
  isSubmitting: boolean;
  error?: string;
  onSubmit: (values: WorkFormValues, image: File | null) => Promise<void>;
}

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="mt-1.5 text-xs text-red-500">{message}</p> : null;

const WorkForm = ({
  title,
  description,
  submitLabel,
  initialValues,
  initialImage,
  isSubmitting,
  error,
  onSubmit,
}: WorkFormProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState(initialImage);

  useEffect(() => {
    setPreview(initialImage);
  }, [initialImage]);

  useEffect(
    () => () => {
      if (image && preview) URL.revokeObjectURL(preview);
    },
    [image, preview],
  );

  const handleImageChange = (file: File | null) => {
    if (image && preview) URL.revokeObjectURL(preview);
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : initialImage);
  };

  return (
    <div className="mx-auto max-w-6xl py-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            to="/admin/all-works"
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-sky-600 dark:text-slate-400"
          >
            <ArrowLeft className="size-4" />
            Back to projects
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
            {title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => onSubmit(values, image)}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="space-y-6">
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
                  Project information
                </h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <label className="sm:col-span-2">
                    <span className="mb-2 block text-sm font-medium">
                      Project name
                    </span>
                    <Field
                      name="projectName"
                      placeholder="e.g. SaaS analytics dashboard"
                      className={inputClass}
                    />
                    <FieldError
                      message={
                        touched.projectName ? errors.projectName : undefined
                      }
                    />
                  </label>

                  <label>
                    <span className="mb-2 block text-sm font-medium">
                      Category
                    </span>
                    <Field
                      name="category"
                      placeholder="Web Application"
                      className={inputClass}
                    />
                    <FieldError
                      message={touched.category ? errors.category : undefined}
                    />
                  </label>

                  <label>
                    <span className="mb-2 block text-sm font-medium">
                      Technologies
                    </span>
                    <Field
                      name="usingTech"
                      placeholder="React, Node.js, MongoDB"
                      className={inputClass}
                    />
                    <FieldError
                      message={
                        touched.usingTech ? errors.usingTech : undefined
                      }
                    />
                  </label>

                  <label className="sm:col-span-2">
                    <span className="mb-2 flex items-center justify-between text-sm font-medium">
                      Short description
                      <span className="font-normal text-slate-400">
                        {values.shortDescription.length}/180
                      </span>
                    </span>
                    <Field
                      as="textarea"
                      name="shortDescription"
                      rows={3}
                      maxLength={180}
                      placeholder="A concise result-focused summary shown on project cards."
                      className={inputClass}
                    />
                    <FieldError
                      message={
                        touched.shortDescription
                          ? errors.shortDescription
                          : undefined
                      }
                    />
                  </label>

                  <label className="sm:col-span-2">
                    <span className="mb-2 flex items-center justify-between text-sm font-medium">
                      Full case study
                      <span className="font-normal text-slate-400">
                        {values.projectDetails.length}/2000
                      </span>
                    </span>
                    <Field
                      as="textarea"
                      name="projectDetails"
                      rows={8}
                      maxLength={2000}
                      placeholder="Explain the problem, your solution, responsibilities and result."
                      className={inputClass}
                    />
                    <FieldError
                      message={
                        touched.projectDetails
                          ? errors.projectDetails
                          : undefined
                      }
                    />
                  </label>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
                  Project links
                </h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <label>
                    <span className="mb-2 block text-sm font-medium">
                      Live website
                    </span>
                    <Field
                      name="projectLink"
                      type="url"
                      placeholder="https://example.com"
                      className={inputClass}
                    />
                    <FieldError
                      message={
                        touched.projectLink ? errors.projectLink : undefined
                      }
                    />
                  </label>
                  <label>
                    <span className="mb-2 block text-sm font-medium">
                      GitHub repository
                    </span>
                    <Field
                      name="githubLink"
                      type="url"
                      placeholder="https://github.com/..."
                      className={inputClass}
                    />
                    <FieldError
                      message={
                        touched.githubLink ? errors.githubLink : undefined
                      }
                    />
                  </label>
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                <ImageUploadField
                  label="Project cover"
                  description="Use a clean 16:10 screenshot for the best gallery result."
                  preview={preview}
                  onChange={handleImageChange}
                  required={!initialImage}
                  showRemove={!initialImage || Boolean(image)}
                />
              </section>

              <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
                <h2 className="text-base font-semibold">Publishing</h2>
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 dark:border-white/10">
                  <input
                    type="checkbox"
                    checked={values.isLive}
                    onChange={(event) =>
                      setFieldValue("isLive", event.target.checked)
                    }
                    className="mt-1 size-4 accent-sky-600"
                  />
                  <span>
                    <span className="block text-sm font-medium">
                      Project is live
                    </span>
                    <span className="mt-1 block text-xs text-slate-500">
                      Enables the live website action.
                    </span>
                  </span>
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-amber-300/60 bg-amber-50/70 p-4 dark:border-amber-400/20 dark:bg-amber-400/5">
                  <input
                    type="checkbox"
                    checked={values.isFeatured}
                    onChange={(event) =>
                      setFieldValue("isFeatured", event.target.checked)
                    }
                    className="mt-1 size-4 accent-amber-500"
                  />
                  <span>
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <Sparkles className="size-4 text-amber-500" />
                      Feature on Home
                    </span>
                    <span className="mt-1 block text-xs text-slate-500">
                      Adds this project to the Circular Gallery.
                    </span>
                  </span>
                </label>

                <label>
                  <span className="mb-2 block text-sm font-medium">
                    Display order
                  </span>
                  <Field
                    name="displayOrder"
                    type="number"
                    min="0"
                    className={inputClass}
                  />
                  <p className="mt-1.5 text-xs text-slate-500">
                    Lower numbers appear first.
                  </p>
                </label>
              </section>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Save className="size-4" />
                )}
                {isSubmitting ? "Saving..." : submitLabel}
              </button>
            </aside>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default WorkForm;
