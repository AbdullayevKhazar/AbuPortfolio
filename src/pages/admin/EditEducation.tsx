import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import ImageUploadField from "../../components/ImageUploadField";
import {
  apiClient,
  API_ENDPOINTS,
  getApiErrorMessage,
} from "../../lib/api";

interface EducationValues {
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
  schoolImage?: string;
  isCurrent: boolean;
}

const validationSchema = Yup.object({
  schoolName: Yup.string().trim().required("School name is required"),
  degree: Yup.string().trim(),
  fieldOfStudy: Yup.string().trim().required("Field of study is required"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string().nullable(),
  description: Yup.string().trim(),
  isCurrent: Yup.boolean(),
});

const fieldClass =
  "mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 outline-none focus:ring-2 focus:ring-ring";

const toDateInput = (value?: string) =>
  value ? new Date(value).toISOString().slice(0, 10) : "";

const EditEducation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] =
    useState<EducationValues | null>(null);
  const [originalImage, setOriginalImage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    apiClient
      .get<EducationValues>(API_ENDPOINTS.education.getById(id!))
      .then(({ data }) => {
        const currentImage = data.schoolImage || "";
        setOriginalImage(currentImage);
        setPreview(currentImage);
        setInitialValues({
          ...data,
          degree: data.degree || "",
          description: data.description || "",
          startDate: toDateInput(data.startDate),
          endDate: toDateInput(data.endDate),
        });
      })
      .catch((error) =>
        setPageError(
          getApiErrorMessage(error, "Failed to load education record."),
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
        <Loader2 className="size-5 animate-spin" /> Loading education...
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div>
        <p className="text-sm font-medium text-blue-600">Background</p>
        <h1 className="text-3xl font-bold">Edit education</h1>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          setStatus("");
          try {
            const formData = new FormData();
            formData.append("schoolName", values.schoolName.trim());
            formData.append("degree", values.degree.trim());
            formData.append("fieldOfStudy", values.fieldOfStudy.trim());
            formData.append("startDate", values.startDate);
            formData.append("endDate", values.isCurrent ? "" : values.endDate);
            formData.append("description", values.description.trim());
            formData.append("isCurrent", String(values.isCurrent));
            if (image) formData.append("schoolImage", image);

            await apiClient.put(API_ENDPOINTS.education.update(id!), formData);
            navigate("/admin/educations");
          } catch (error) {
            setStatus(
              getApiErrorMessage(error, "Failed to update education record."),
            );
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, isSubmitting, status, setFieldValue }) => (
          <Form className="space-y-6 rounded-2xl border bg-card p-5 shadow-sm md:p-8">
            <ImageUploadField
              label="School logo"
              description="Replace the current image to upload a new Cloudinary asset."
              preview={preview}
              onChange={updateImage}
              showRemove={Boolean(image)}
            />

            <div className="grid gap-5 md:grid-cols-2">
              <label className="text-sm font-medium">
                School name
                <Field name="schoolName" className={fieldClass} />
                <ErrorMessage name="schoolName" component="p" className="mt-1 text-sm text-red-500" />
              </label>
              <label className="text-sm font-medium">
                Degree
                <Field name="degree" className={fieldClass} />
              </label>
            </div>

            <label className="block text-sm font-medium">
              Field of study
              <Field name="fieldOfStudy" className={fieldClass} />
              <ErrorMessage name="fieldOfStudy" component="p" className="mt-1 text-sm text-red-500" />
            </label>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="text-sm font-medium">
                Start date
                <Field name="startDate" type="date" className={fieldClass} />
              </label>
              {!values.isCurrent && (
                <label className="text-sm font-medium">
                  End date
                  <Field name="endDate" type="date" className={fieldClass} />
                </label>
              )}
            </div>

            <label className="flex items-center gap-3 rounded-lg border p-3 text-sm font-medium">
              <Field
                type="checkbox"
                name="isCurrent"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  void setFieldValue("isCurrent", event.target.checked);
                  if (event.target.checked) void setFieldValue("endDate", "");
                }}
                className="size-4 accent-blue-600"
              />
              I currently study here
            </label>

            <label className="block text-sm font-medium">
              Description
              <Field name="description" as="textarea" rows={4} className={`${fieldClass} resize-y`} />
            </label>

            {status && <p className="text-sm text-red-500">{status}</p>}
            <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => navigate("/admin/educations")} className="rounded-lg border px-5 py-2.5 font-medium hover:bg-accent">
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

export default EditEducation;
