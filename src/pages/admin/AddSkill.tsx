import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const validateSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  iconName: Yup.string().required("Icon is required"),
});

const AddSkill = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full p-4">
      <Formik
        initialValues={{ name: "", description: "", iconName: "" }}
        validationSchema={validateSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await axios.post("https://api.xab.net.az/api/skills/add-skill", {
            name: values.name,
            description: values.description,
            iconName: values.iconName,
          });
          setSubmitting(false);
          navigate(-1);
        }}
      >
        {({ isSubmitting }) => (
          <Form
            className="flex flex-col gap-6 p-8 rounded-xl shadow-lg w-full max-w-full
                       backdrop-blur-lg transition-all duration-300
                       border border-gray-200
                       dark:border-white/10 dark:bg-white/5"
          >
            {/* --- Form Header --- */}
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
              Add New Skill
            </h2>

            {/* --- Name Field --- */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Skill Name
              </label>
              <Field
                name="name"
                type="text"
                className="w-full px-4 py-2 rounded-md border transition-all duration-300
                           text-gray-900 dark:text-white
                           bg-white/50 dark:bg-white/5
                           border-gray-300 dark:border-white/10
                           focus:border-blue-500 focus:ring-blue-500
                           dark:focus:border-blue-400 dark:focus:ring-blue-400
                           focus:ring-2 focus:outline-none"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 dark:text-red-400 text-xs"
              />
            </div>

            {/* --- Description Field --- */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Description
              </label>
              <Field
                name="description"
                as="textarea" // Changed to textarea for better UX
                rows={3}
                className="w-full px-4 py-2 rounded-md border transition-all duration-300
                           text-gray-900 dark:text-white
                           bg-white/50 dark:bg-white/5
                           border-gray-300 dark:border-white/10
                           focus:border-blue-500 focus:ring-blue-500
                           dark:focus:border-blue-400 dark:focus:ring-blue-400
                           focus:ring-2 focus:outline-none resize-none"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 dark:text-red-400 text-xs"
              />
            </div>

            {/* --- Icon Name Field --- */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="iconName"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Icon Name
              </label>
              <Field
                name="iconName"
                type="text" // Corrected from "iconName"
                className="w-full px-4 py-2 rounded-md border transition-all duration-300
                           text-gray-900 dark:text-white
                           bg-white/50 dark:bg-white/5
                           border-gray-300 dark:border-white/10
                           focus:border-blue-500 focus:ring-blue-500
                           dark:focus:border-blue-400 dark:focus:ring-blue-400
                           focus:ring-2 focus:outline-none"
              />
              <ErrorMessage
                name="iconName"
                component="div"
                className="text-red-500 dark:text-red-400 text-xs"
              />
            </div>

            {/* --- Submit Button --- */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-5 rounded-lg font-semibold text-white transition-all duration-300
                         bg-blue-600 hover:bg-blue-700
                         dark:bg-blue-500 dark:hover:bg-blue-400
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Add Skill"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddSkill;
