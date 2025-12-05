import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Loader2, UploadCloud, X } from "lucide-react";
import Dropzone from "react-dropzone";
import axios from "axios";

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

const AddWorks = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    projectName: "",
    projectDetails: "",
    usingTech: "",
    projectLink: "",
    githubLink: "",
    isLive: false,
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("mainImage", file);
      Object.entries(values).forEach(([key, value]) =>
        formData.append(key, value.toString())
      );
      await axios.post(
        "https://api.xab.net.az/api/my-works/add-work",
        formData
      );
      resetForm();
      setPreview(null);
      setFile(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-full mx-auto p-8 rounded-2xl backdrop-blur-md shadow-lg border border-gray-200 dark:border-white/10 mt-10 bg-white/70 dark:bg-white/5 transition-colors duration-300">
      <h2 className="text-2xl font-semibold mb-6 text-center text-white/5 dark:text-gray-100">
        Add New Work
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form className="space-y-5">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2 text-white/5 dark:text-gray-300">
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
                        <p>Drag & drop or click to upload</p>
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>

            {/* Project Name */}
            <div>
              <label className="block text-sm mb-2 text-white/5 dark:text-gray-300">
                Project Name
              </label>
              <Field
                type="text"
                name="projectName"
                className="w-full rounded-lg border border-gray-300 dark:border-white/5 bg-white dark:bg-white/5 p-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-sky-500 outline-none transition"
              />
              {errors.projectName && touched.projectName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.projectName}
                </p>
              )}
            </div>

            {/* Project Details */}
            <div>
              <label className="block text-sm mb-2 text-white/5 dark:text-gray-300">
                Project Details
              </label>
              <Field
                as="textarea"
                name="projectDetails"
                rows={3}
                maxLength={600}
                className="w-full rounded-lg border border-gray-300 dark:border-white/5 bg-white dark:bg-white/5 p-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-sky-500 outline-none transition"
              />
              {errors.projectDetails && touched.projectDetails && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.projectDetails}
                </p>
              )}
            </div>

            {/* Using Tech */}
            <div>
              <label className="block text-sm mb-2 text-white/5 dark:text-gray-300">
                Technologies (comma separated)
              </label>
              <Field
                type="text"
                name="usingTech"
                placeholder="React, Node.js, TailwindCSS"
                className="w-full rounded-lg border border-gray-300 dark:border-white/5 bg-white dark:bg-white/5 p-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-sky-500 outline-none transition"
              />
              {errors.usingTech && touched.usingTech && (
                <p className="text-red-400 text-sm mt-1">{errors.usingTech}</p>
              )}
            </div>

            {/* Project Link */}
            <div>
              <label className="block text-sm mb-2 text-white/5 dark:text-gray-300">
                Live Project Link
              </label>
              <Field
                type="url"
                name="projectLink"
                placeholder="https://example.com"
                className="w-full rounded-lg border border-gray-300 dark:border-white/5 bg-white dark:bg-white/5 p-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-sky-500 outline-none transition"
              />
              {errors.projectLink && touched.projectLink && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.projectLink}
                </p>
              )}
            </div>

            {/* GitHub Link */}
            <div>
              <label className="block text-sm mb-2 text-white/5 dark:text-gray-300">
                GitHub Link (optional)
              </label>
              <Field
                type="url"
                name="githubLink"
                placeholder="https://github.com/username/project"
                className="w-full rounded-lg border border-gray-300 dark:border-white/5 bg-white dark:bg-white/5 p-2 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-sky-500 outline-none transition"
              />
              {errors.githubLink && touched.githubLink && (
                <p className="text-red-400 text-sm mt-1">{errors.githubLink}</p>
              )}
            </div>

            {/* isLive Toggle */}
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
                className="text-sm text-white/5 dark:text-gray-300"
              >
                Is this project live?
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full font-medium py-2 rounded-lg transition flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white shadow-md"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Uploading...
                </>
              ) : (
                "Add Project"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddWorks;
