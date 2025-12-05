import axios from "axios";
import { Field, Form, Formik, FieldArray } from "formik";
import { Plus } from "lucide-react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  companyName: Yup.string().required("Company Name is required"),
  position: Yup.string().required("Position is required"),
  companyImage: Yup.string()
    .url("Must be a valid URL")
    .required("Company Image is required"),

  startDate: Yup.date()
    .required("Start Date is required")
    .typeError("Invalid date"),

  endDate: Yup.date()
    .nullable()
    .when("isCurrentJob", {
      is: false,
      then: (schema) =>
        schema.required("End Date is required").typeError("Invalid date"),
      otherwise: (schema) => schema.notRequired(),
    }),

  myContributions: Yup.array()
    .of(Yup.string().required("Contribution cannot be empty"))
    .min(1, "At least 1 contribution is required"),
});

const AddExperience = () => {
  return (
    <Formik
      initialValues={{
        companyName: "",
        position: "",
        companyImage: "",
        startDate: "",
        endDate: "",
        isCurrentJob: true,
        myContributions: [],
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        axios.post("https://api.xab.net.az/api/experiences", values);
      }}
    >
      {({ values, errors, touched }) => (
        <Form
          className="flex flex-col gap-6 p-8 rounded-xl shadow-lg w-full max-w-full
                       backdrop-blur-lg transition-all duration-300
                       border border-gray-200
                       dark:border-white/10 dark:bg-white/5"
        >
          {/* Company Name */}
          <label>
            Company Name
            <Field
              name="companyName"
              className="w-full px-4 py-2 rounded-md border transition-all duration-300
                           text-gray-900 dark:text-white
                           bg-white/50 dark:bg-white/5
                           border-gray-300 dark:border-white/10
                           focus:border-blue-500 focus:ring-blue-500
                           dark:focus:border-blue-400 dark:focus:ring-blue-400
                           focus:ring-2 focus:outline-none"
              placeholder="TechNova Solutions"
            />
            {touched.companyName && errors.companyName && (
              <p className="text-red-500 text-sm">{errors.companyName}</p>
            )}
          </label>

          {/* Position */}
          <label>
            Position
            <Field
              name="position"
              className="w-full px-4 py-2 rounded-md border transition-all duration-300
                           text-gray-900 dark:text-white
                           bg-white/50 dark:bg-white/5
                           border-gray-300 dark:border-white/10
                           focus:border-blue-500 focus:ring-blue-500
                           dark:focus:border-blue-400 dark:focus:ring-blue-400
                           focus:ring-2 focus:outline-none"
              placeholder="Frontend Developer"
            />
            {touched.position && errors.position && (
              <p className="text-red-500 text-sm">{errors.position}</p>
            )}
          </label>

          {/* Company Image */}
          <label>
            Company Image URL
            <Field
              name="companyImage"
              className="w-full px-4 py-2 rounded-md border transition-all duration-300
                           text-gray-900 dark:text-white
                           bg-white/50 dark:bg-white/5
                           border-gray-300 dark:border-white/10
                           focus:border-blue-500 focus:ring-blue-500
                           dark:focus:border-blue-400 dark:focus:ring-blue-400
                           focus:ring-2 focus:outline-none"
              placeholder="https://example.com/img.png"
            />
            {touched.companyImage && errors.companyImage && (
              <p className="text-red-500 text-sm">{errors.companyImage}</p>
            )}
          </label>

          {/* Start Date */}
          <label>
            Start Date
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
            {touched.startDate && errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate}</p>
            )}
          </label>

          {/* End Date — only if not current job */}
          {!values.isCurrentJob && (
            <label>
              End Date
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
              {touched.endDate && errors.endDate && (
                <p className="text-red-500 text-sm">{errors.endDate}</p>
              )}
            </label>
          )}

          <label className="flex items-center gap-2">
            <Field type="checkbox" name="isCurrentJob" />
            Is Current Job?
          </label>

          <div>
            <label className="font-semibold">My Contributions</label>

            <FieldArray
              name="myContributions"
              render={(arrayHelpers) => (
                <div className="flex flex-col justify-end gap-2 mt-2">
                  {values.myContributions.length > 0 &&
                    values.myContributions.map((_, index) => (
                      <div key={index} className="flex gap-2">
                        <Field
                          name={`myContributions.${index}`}
                          className="w-full px-4 py-2 rounded-md border transition-all duration-300
                           text-gray-900 dark:text-white
                           bg-white/50 dark:bg-white/5
                           border-gray-300 dark:border-white/10
                           focus:border-blue-500 focus:ring-blue-500
                           dark:focus:border-blue-400 dark:focus:ring-blue-400
                           focus:ring-2 focus:outline-none"
                        />

                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                          className="px-3 py-1 bg-red-500 text-white rounded"
                        >
                          -
                        </button>
                      </div>
                    ))}

                  {errors.myContributions &&
                    typeof errors.myContributions === "string" && (
                      <p className="text-red-500 text-sm">
                        {errors.myContributions}
                      </p>
                    )}

                  <button
                    type="button"
                    onClick={() => arrayHelpers.push("")}
                    className="max-w-max py-2.5 px-5 rounded-lg font-semibold text-white transition-all duration-300
                         bg-blue-600 hover:bg-blue-700
                         dark:bg-blue-500 dark:hover:bg-blue-400
                         disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {" "}
                    <Plus />
                  </button>
                </div>
              )}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 px-5 rounded-lg font-semibold text-white transition-all duration-300
                         bg-blue-600 hover:bg-blue-700
                         dark:bg-blue-500 dark:hover:bg-blue-400
                         disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddExperience;
