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
    .max(200, "Max 200 characters"),
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
    { resetForm }: any
  ) => {
    if (!file) {
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("mainImage", file);
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      await axios.post("http://localhost:8000/api/my-works/add-work", formData);
      resetForm();
      setPreview(null);
      setFile(null);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-full mx-auto bg-white/10 p-8 rounded-2xl backdrop-blur-md shadow-lg border border-white/10 mt-10 ">
      <h2 className="text-2xl font-semibold text-white mb-6 text-center">
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
              <label className="block text-sm font-medium text-white mb-2">
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
                    className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center cursor-pointer hover:bg-white/5 transition"
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
                          className="absolute top-1 right-1 bg-black/60 rounded-full p-1 hover:bg-red-600 transition"
                        >
                          <X size={16} className="text-white" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-white/60">
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
              <label className="block text-sm text-white mb-2">
                Project Name
              </label>
              <Field
                type="text"
                name="projectName"
                className="w-full rounded-lg bg-white/10 border border-white/20 p-2 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
              />
              {errors.projectName && touched.projectName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.projectName}
                </p>
              )}
            </div>

            {/* Project Details */}
            <div>
              <label className="block text-sm text-white mb-2">
                Project Details
              </label>
              <Field
                as="textarea"
                name="projectDetails"
                rows={3}
                maxLength={200}
                className="w-full rounded-lg bg-white/10 border border-white/20 p-2 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
              />
              {errors.projectDetails && touched.projectDetails && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.projectDetails}
                </p>
              )}
            </div>

            {/* Using Tech */}
            <div>
              <label className="block text-sm text-white mb-2">
                Technologies (comma separated)
              </label>
              <Field
                type="text"
                name="usingTech"
                placeholder="React, Node.js, TailwindCSS"
                className="w-full rounded-lg bg-white/10 border border-white/20 p-2 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
              />
              {errors.usingTech && touched.usingTech && (
                <p className="text-red-400 text-sm mt-1">{errors.usingTech}</p>
              )}
            </div>

            {/* Project Link */}
            <div>
              <label className="block text-sm text-white mb-2">
                Live Project Link
              </label>
              <Field
                type="url"
                name="projectLink"
                placeholder="https://example.com"
                className="w-full rounded-lg bg-white/10 border border-white/20 p-2 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
              />
              {errors.projectLink && touched.projectLink && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.projectLink}
                </p>
              )}
            </div>

            {/* GitHub Link */}
            <div>
              <label className="block text-sm text-white mb-2">
                GitHub Link (optional)
              </label>
              <Field
                type="url"
                name="githubLink"
                placeholder="https://github.com/username/project"
                className="w-full rounded-lg bg-white/10 border border-white/20 p-2 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
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
                className="w-4 h-4 accent-cyan-400"
              />
              <label htmlFor="isLive" className="text-white text-sm">
                Is this project live?
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 rounded-lg transition flex items-center justify-center gap-2"
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
