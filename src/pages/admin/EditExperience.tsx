import { useEffect, useState } from "react";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import ImageUploadField from "../../components/ImageUploadField";
import {
  apiClient,
  API_ENDPOINTS,
  getApiErrorMessage,
} from "../../lib/api";

interface Experience {
  companyName: string;
  position: string;
  companyImage: string;
  startDate: string;
  endDate?: string;
  isCurrentJob: boolean;
  myContributions: string[];
}

const validationSchema = Yup.object({
  companyName: Yup.string().trim().required("Company name is required"),
  position: Yup.string().trim().required("Position is required"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string().nullable(),
  isCurrentJob: Yup.boolean(),
  myContributions: Yup.array()
    .of(Yup.string().trim().required("Contribution cannot be empty"))
    .min(1, "Add at least one contribution"),
});

const fieldClass =
  "mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 outline-none focus:ring-2 focus:ring-ring";

const toDateInput = (value?: string) =>
  value ? new Date(value).toISOString().slice(0, 10) : "";

const EditExperience = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<Experience | null>(null);
  const [originalImage, setOriginalImage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    apiClient
      .get<Experience>(API_ENDPOINTS.experience.getById(id!))
      .then(({ data }) => {
        setOriginalImage(data.companyImage);
        setPreview(data.companyImage);
        setInitialValues({
          ...data,
          startDate: toDateInput(data.startDate),
          endDate: toDateInput(data.endDate),
          myContributions: data.myContributions.length
            ? data.myContributions
            : [""],
        });
      })
      .catch((error) =>
        setPageError(
          getApiErrorMessage(error, "Failed to load experience."),
        ),
      );
  }, [id]);

  useEffect(
    () => () => {
      if (image && preview) URL.revokeObjectURL(preview);
    },
    [image, preview],
  );

  const updateImage = (file: File | null) => {
    if (image && preview) URL.revokeObjectURL(preview);
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : originalImage);
  };

  if (!initialValues) {
    return pageError ? (
      <p className="py-10 text-center text-red-500">{pageError}</p>
    ) : (
      <div className="flex min-h-64 items-center justify-center gap-2">
        <Loader2 className="size-5 animate-spin" /> Loading experience...
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm font-medium text-blue-600">Career</p>
        <h1 className="text-3xl font-bold">Edit experience</h1>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          setStatus("");
          try {
            const formData = new FormData();
            formData.append("companyName", values.companyName.trim());
            formData.append("position", values.position.trim());
            formData.append("startDate", values.startDate);
            formData.append("endDate", values.isCurrentJob ? "" : values.endDate || "");
            formData.append("isCurrentJob", String(values.isCurrentJob));
            formData.append(
              "myContributions",
              JSON.stringify(
                values.myContributions.map((item) => item.trim()),
              ),
            );
            if (image) formData.append("companyImage", image);

            await apiClient.put(
              API_ENDPOINTS.experience.update(id!),
              formData,
            );
            navigate("/admin/experience");
          } catch (error) {
            setStatus(
              getApiErrorMessage(error, "Failed to update experience."),
            );
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, isSubmitting, status, setFieldValue }) => (
          <Form className="space-y-6 rounded-2xl border bg-card p-5 shadow-sm md:p-8">
            <ImageUploadField
              label="Company logo"
              description={
                image
                  ? "A new image is selected. Remove it to restore the current logo."
                  : "Choose a new image only when you want to replace the current logo."
              }
              preview={preview}
              onChange={updateImage}
              required
              showRemove={Boolean(image)}
            />

            <div className="grid gap-5 md:grid-cols-2">
              <label className="text-sm font-medium">
                Company name
                <Field name="companyName" className={fieldClass} />
                <ErrorMessage name="companyName" component="p" className="mt-1 text-sm text-red-500" />
              </label>
              <label className="text-sm font-medium">
                Position
                <Field name="position" className={fieldClass} />
                <ErrorMessage name="position" component="p" className="mt-1 text-sm text-red-500" />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="text-sm font-medium">
                Start date
                <Field name="startDate" type="date" className={fieldClass} />
              </label>
              {!values.isCurrentJob && (
                <label className="text-sm font-medium">
                  End date
                  <Field name="endDate" type="date" className={fieldClass} />
                </label>
              )}
            </div>

            <label className="flex items-center gap-3 rounded-lg border p-3 text-sm font-medium">
              <Field
                type="checkbox"
                name="isCurrentJob"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  void setFieldValue("isCurrentJob", event.target.checked);
                  if (event.target.checked) void setFieldValue("endDate", "");
                }}
                className="size-4 accent-blue-600"
              />
              I currently work here
            </label>

            <FieldArray name="myContributions">
              {({ push, remove }) => (
                <div className="space-y-3">
                  <h2 className="font-semibold">Contributions</h2>
                  {values.myContributions.map((_, index) => (
                    <div key={index}>
                      <div className="flex gap-2">
                        <Field name={`myContributions.${index}`} className={fieldClass} />
                        <button
                          type="button"
                          disabled={values.myContributions.length === 1}
                          onClick={() => remove(index)}
                          className="mt-1 rounded-lg p-2.5 text-red-500 hover:bg-red-500/10 disabled:opacity-30"
                          aria-label={`Remove contribution ${index + 1}`}
                        >
                          <Trash2 className="size-5" />
                        </button>
                      </div>
                      <ErrorMessage name={`myContributions.${index}`} component="p" className="mt-1 text-sm text-red-500" />
                    </div>
                  ))}
                  <button type="button" onClick={() => push("")} className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-accent">
                    <Plus className="size-4" /> Add contribution
                  </button>
                </div>
              )}
            </FieldArray>

            {status && <p className="text-sm text-red-500">{status}</p>}
            <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => navigate("/admin/experience")} className="rounded-lg border px-5 py-2.5 font-medium hover:bg-accent">
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-60">
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

export default EditExperience;
