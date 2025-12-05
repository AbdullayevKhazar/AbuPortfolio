// src/pages/EditWork.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Loader2, UploadCloud, X } from "lucide-react";
import Dropzone from "react-dropzone";
import axios from "axios";

interface InitialValue {
  projectName: string;
  projectDetails: string;
  usingTech: string;
  projectLink: string;
  githubLink: string;
  isLive: boolean;
}
type FormValues = InitialValue;

const validationSchema = Yup.object({
  projectName: Yup.string().required("Project name is required"),
  projectDetails: Yup.string()
    .required("Project details are required")
    .max(600, "Max 600 characters"),
  usingTech: Yup.string().required("Technologies are required"),
  projectLink: Yup.string()
    .url("Must be a valid URL")
    .required("Project link is required"),
  githubLink: Yup.string().url("Must be a valid URL").nullable(),
  isLive: Yup.boolean(),
});

// helper → TS error olmasın
const getError = (err: any) => (typeof err === "string" ? err : "");

const EditWork = () => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState<InitialValue | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const res = await axios.get(
          `https://api.xab.net.az/api/my-works/${id}`
        );
        const work = res.data;

        setInitialValues({
          projectName: work.projectName,
          projectDetails: work.projectDetails,
          usingTech: work.usingTech.join(", "),
          projectLink: work.projectLink,
          githubLink: work.githubLink || "",
          isLive: work.isLive || false,
        });

        setPreview(work.mainImage);
      } catch (error) {
        console.error("Failed to fetch work:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchWork();
  }, [id]);

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const formData = new FormData();

      if (file) formData.append("mainImage", file);

      // 🔥 Düz formData append (artıq səhv deyil!)
      Object.entries(values).forEach(([key, value]) =>
        formData.append(key, String(value))
      );

      await axios.put(`https://api.xab.net.az/api/my-works/${id}`, formData);

      alert("Project updated successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500">
        <Loader2 className="animate-spin mr-2" /> Loading project...
      </div>
    );
  }

  if (!initialValues) {
    return (
      <div className="text-center text-red-400 mt-20">
        Failed to load project data.
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto p-8 rounded-2xl backdrop-blur-md shadow-lg border border-gray-200 dark:border-white/10 mt-10 bg-white/70 dark:bg-white/5 transition-colors duration-300">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-gray-100">
        Edit Work
      </h2>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form className="space-y-5">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Project Thumbnail
              </label>

              <Dropzone
                onDrop={(acceptedFiles) => {
                  const file = acceptedFiles[0];
                  setFile(file);
                  setPreview(URL.createObjectURL(file));
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition bg-gray-50/60 dark:bg-white/5 border-gray-300 dark:border-white/5 hover:bg-gray-100/60 dark:hover:bg-white/10"
                  >
                    <input {...getInputProps()} />
                    {preview ? (
                      <div className="relative inline-block">
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-48 h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFile(null);
                            setPreview(null);
                          }}
                          className="absolute top-1 right-1 rounded-full p-1 bg-white/70 dark:bg-white/5 hover:bg-red-600 hover:text-white transition"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-gray-600 dark:text-gray-300">
                        <UploadCloud size={32} className="mb-2" />
                        <p>Drag & drop or click to upload new image</p>
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>

            {/* Project Name */}
            <div>
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                Project Name
              </label>
              <Field
                type="text"
                name="projectName"
                className="w-full rounded-lg border border-gray-300 dark:border-white/5 bg-white dark:bg-white/5 p-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-sky-500 outline-none transition"
              />
              {touched.projectName && (
                <p className="text-red-400 text-sm mt-1">
                  {getError(errors.projectName)}
                </p>
              )}
            </div>

            {/* Project Details */}
            <div>
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                Project Details
              </label>
              <Field
                as="textarea"
                name="projectDetails"
                rows={3}
                maxLength={600}
                className="w-full rounded-lg border border-gray-300 dark:border-white/5 bg-white dark:bg-white/5 p-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-sky-500 outline-none transition"
              />
              {touched.projectDetails && (
                <p className="text-red-400 text-sm mt-1">
                  {getError(errors.projectDetails)}
                </p>
              )}
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                Technologies (comma separated)
              </label>
              <Field
                type="text"
                name="usingTech"
                placeholder="React, Node.js, TailwindCSS"
                className="w-full rounded-lg border border-gray-300 dark:border-white/5 bg-white dark:bg-white/5 p-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-sky-500 outline-none transition"
              />
              {touched.usingTech && (
                <p className="text-red-400 text-sm mt-1">
                  {getError(errors.usingTech)}
                </p>
              )}
            </div>

            {/* Live Link */}
            <div>
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                Live Project Link
              </label>
              <Field
                type="url"
                name="projectLink"
                placeholder="https://example.com"
                className="w-full rounded-lg border border-gray-300 dark:border-white/5 bg-white dark:bg-white/5 p-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-sky-500 outline-none transition"
              />
              {touched.projectLink && (
                <p className="text-red-400 text-sm mt-1">
                  {getError(errors.projectLink)}
                </p>
              )}
            </div>

            {/* GitHub Link */}
            <div>
              <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                GitHub Link (optional)
              </label>
              <Field
                type="url"
                name="githubLink"
                placeholder="https://github.com/username/project"
                className="w-full rounded-lg border border-gray-300 dark:border-white/5 bg-white dark:bg-white/5 p-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-sky-500 outline-none transition"
              />
              {touched.githubLink && (
                <p className="text-red-400 text-sm mt-1">
                  {getError(errors.githubLink)}
                </p>
              )}
            </div>

            {/* isLive */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isLive"
                name="isLive"
                checked={values.isLive}
                onChange={(e) => setFieldValue("isLive", e.target.checked)}
                className="w-4 h-4 accent-sky-500"
              />
              <label
                htmlFor="isLive"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                Is this project live?
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full font-medium py-2 rounded-lg transition flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white shadow-md"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditWork;
