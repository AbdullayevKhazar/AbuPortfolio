import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Plus, Trash2 } from "lucide-react";

interface Experience {
  companyName: string;
  position: string;
  companyImage: string;
  startDate: string;
  endDate?: string;
  isCurrentJob: boolean;
  myContributions: string[];
}

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required("Required"),
  position: Yup.string().required("Required"),
  companyImage: Yup.string().url("Invalid URL").required("Image URL required"),
  startDate: Yup.string().required("Start date required"),
  endDate: Yup.string().nullable(),
  isCurrentJob: Yup.boolean(),
  myContributions: Yup.array().of(Yup.string().required("Cannot be empty")),
});

const EditExperience = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState<Experience | null>(null);

  const fetchExperience = async () => {
    try {
      const res = await axios.get(
        `https://api.xab.net.az/api/experiences/${id}`
      );
      setInitialValues(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, [id]);

  if (!initialValues) return <p className="text-center py-10">Loading...</p>;

  const handleSubmit = async (values: Experience) => {
    try {
      await axios.put(`https://api.xab.net.az/api/experiences/${id}`, values);
      navigate("/admin/experience");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Edit Experience</h1>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form className="space-y-6">
            {/* Company Name */}
            <div>
              <label className="font-medium">Company Name</label>
              <Field
                name="companyName"
                className="w-full p-2 border rounded-lg mt-1"
              />
              {touched.companyName && errors.companyName && (
                <p className="text-red-500 text-sm">{errors.companyName}</p>
              )}
            </div>

            {/* Position */}
            <div>
              <label className="font-medium">Position</label>
              <Field
                name="position"
                className="w-full p-2 border rounded-lg mt-1"
              />
              {touched.position && errors.position && (
                <p className="text-red-500 text-sm">{errors.position}</p>
              )}
            </div>

            {/* Company Image URL */}
            <div>
              <label className="font-medium">Company Image URL</label>
              <Field
                name="companyImage"
                className="w-full p-2 border rounded-lg mt-1"
              />
              {touched.companyImage && errors.companyImage && (
                <p className="text-red-500 text-sm">{errors.companyImage}</p>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-medium">Start Date</label>
                <Field
                  type="date"
                  name="startDate"
                  className="w-full p-2 border rounded-lg mt-1"
                />
                {touched.startDate && errors.startDate && (
                  <p className="text-red-500 text-sm">{errors.startDate}</p>
                )}
              </div>

              <div>
                <label className="font-medium">End Date</label>
                <Field
                  type="date"
                  name="endDate"
                  disabled={values.isCurrentJob}
                  className="w-full p-2 border rounded-lg mt-1 disabled:bg-gray-200"
                />
              </div>
            </div>

            {/* Is Current Job */}
            <label className="flex items-center gap-2">
              <Field
                type="checkbox"
                name="isCurrentJob"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue("isCurrentJob", e.target.checked);
                  if (e.target.checked) setFieldValue("endDate", "");
                }}
              />
              Currently Working Here
            </label>

            {/* Contributions */}
            <div>
              <label className="font-medium">My Contributions</label>

              <FieldArray name="myContributions">
                {({ push, remove }) => (
                  <div className="space-y-3 mt-2">
                    {values.myContributions.map((_, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Field
                          name={`myContributions.${index}`}
                          className="w-full p-2 border rounded-lg"
                          placeholder="Contribution..."
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => push("")}
                      className="flex items-center gap-2 mt-3 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      <Plus size={16} />
                      Add Contribution
                    </button>
                  </div>
                )}
              </FieldArray>

              {typeof errors.myContributions === "string" && (
                <p className="text-red-500 text-sm">{errors.myContributions}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save Changes
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditExperience;
