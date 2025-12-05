import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const AddEducation = () => {
  return (
    <>
      <Formik
        initialValues={{
          schoolName: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          description: "",
          schoolImage: "",
          isCurrent: false,
        }}
        validationSchema={Yup.object({
          schoolName: Yup.string().required("Required"),
          degree: Yup.string(),
          fieldOfStudy: Yup.string().required("Required"),
          startDate: Yup.string().required("Required"),
          endDate: Yup.string().nullable(),
          description: Yup.string().required("Required"),
          schoolImage: Yup.string().required("Required"),
          isCurrent: Yup.boolean(),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await axios.post("https://api.xab.net.az/api/educations", values);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ values }) => (
          <Form
            className="flex flex-col gap-6 p-8 rounded-xl shadow-lg w-full max-w-full
                       backdrop-blur-lg transition-all duration-300
                       border border-gray-200
                       dark:border-white/10 dark:bg-white/5"
          >
            <label>School Name</label>
            <Field
              name="schoolName"
              type="text"
              className="w-full px-4 py-2 rounded-md border transition-all duration-300
                           text-gray-900 dark:text-white
                           bg-white/50 dark:bg-white/5
                           border-gray-300 dark:border-white/10
                           focus:border-blue-500 focus:ring-blue-500
                           dark:focus:border-blue-400 dark:focus:ring-blue-400
                           focus:ring-2 focus:outline-none"
            />
            <ErrorMessage name="schoolName" />
            <label>Degree</label>
            <Field
              name="degree"
              type="text"
              className="w-full px-4 py-2 rounded-md border transition-all duration-300
                           text-gray-900 dark:text-white
                           bg-white/50 dark:bg-white/5
                           border-gray-300 dark:border-white/10
                           focus:border-blue-500 focus:ring-blue-500
                           dark:focus:border-blue-400 dark:focus:ring-blue-400
                           focus:ring-2 focus:outline-none"
            />
            <ErrorMessage name="degree" />
            <label>Field of Study</label>
            <Field
              name="fieldOfStudy"
              type="text"
              className="w-full px-4 py-2 rounded-md border transition-all duration-300
                           text-gray-900 dark:text-white
                           bg-white/50 dark:bg-white/5
                           border-gray-300 dark:border-white/10
                           focus:border-blue-500 focus:ring-blue-500
                           dark:focus:border-blue-400 dark:focus:ring-blue-400
                           focus:ring-2 focus:outline-none"
            />
            <ErrorMessage name="fieldOfStudy" />
            <label>Start Date</label>
            <Field
              name="startDate"
              type="date"
              className="w-full px-4 py-2 rounded-md border transition-all duration-300
                           text-gray-900 dark:text-white
                           bg-white/50 dark:bg-white/5
                           border-gray-300 dark:border-white/10
                           focus:border-blue-500 focus:ring-blue-500
                           dark:focus:border-blue-400 dark:focus:ring-blue-400
                           focus:ring-2 focus:outline-none"
            />
            <ErrorMessage name="startDate" />
            {!values.isCurrent && (
              <>
                <label>End Date</label>
                <Field
                  name="endDate"
                  type="date"
                  className="w-full px-4 py-2 rounded-md border transition-all duration-300
          text-gray-900 dark:text-white
          bg-white/50 dark:bg-white/5
          border-gray-300 dark:border-white/10
          focus:border-blue-500 focus:ring-blue-500
          dark:focus:border-blue-400 dark:focus:ring-blue-400
          focus:ring-2 focus:outline-none"
                />
                <ErrorMessage name="endDate" />
              </>
            )}
            <label>Description</label>
            <Field
              name="description"
              as="textarea"
              className="w-full px-4 py-2 rounded-md border transition-all duration-300
                           text-gray-900 dark:text-white
                           bg-white/50 dark:bg-white/5
                           border-gray-300 dark:border-white/10
                           focus:border-blue-500 focus:ring-blue-500
                           dark:focus:border-blue-400 dark:focus:ring-blue-400
                           focus:ring-2 focus:outline-none"
            />
            <ErrorMessage name="description" />
            <label>School Image URL</label>
            <Field
              name="schoolImage"
              type="text"
              className="w-full px-4 py-2 rounded-md border transition-all duration-300
                           text-gray-900 dark:text-white
                           bg-white/50 dark:bg-white/5
                           border-gray-300 dark:border-white/10
                           focus:border-blue-500 focus:ring-blue-500
                           dark:focus:border-blue-400 dark:focus:ring-blue-400
                           focus:ring-2 focus:outline-none"
            />
            <ErrorMessage name="schoolImage" />
            <label className="flex items-center gap-2">
              <Field type="checkbox" name="isCurrent" />
              Is Current?
            </label>
            <button
              type="submit"
              className="w-full py-2.5 px-5 rounded-lg font-semibold text-white transition-all duration-300
                         bg-blue-600 hover:bg-blue-700
                         dark:bg-blue-500 dark:hover:bg-blue-400
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit
            </button>{" "}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddEducation;
