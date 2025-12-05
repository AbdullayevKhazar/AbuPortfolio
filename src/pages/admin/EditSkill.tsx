import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Loader2 } from "lucide-react";

interface Skill {
  _id: string;
  name: string;
  description: string;
  iconName: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Skill name is required"),
  description: Yup.string().required("Description is required"),
  iconName: Yup.string().required("Icon name is required"),
});

const EditSkill = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const res = await axios.get(`https://api.xab.net.az/api/skills/${id}`);
        setSkill(res.data);
      } catch (err) {
        console.error("Failed to fetch skill:", err);
        setError("Failed to load skill. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchSkill();
  }, [id]);

  const handleSubmit = async (values: Skill) => {
    try {
      setSaving(true);
      await axios.put(`https://api.xab.net.az/api/skills/update/${id}`, values);
      alert("Skill updated successfully!");
      navigate("/admin"); // or wherever your skills list is
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update skill.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <Loader2 className="w-6 h-6 animate-spin mx-auto" />
        <p>Loading skill...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!skill) return null;

  return (
    <section className="max-w-xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Edit Skill</h2>

      <Formik
        initialValues={skill}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => (
          <Form className="space-y-5">
            {/* Skill Name */}
            <div>
              <label className="block font-medium mb-1">Skill Name</label>
              <Field
                name="name"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-sky-400 outline-none"
                placeholder="Enter skill name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium mb-1">Description</label>
              <Field
                as="textarea"
                name="description"
                rows={4}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-sky-400 outline-none"
                placeholder="Enter skill description"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Icon Name */}
            <div>
              <label className="block font-medium mb-1">Icon Name</label>
              <Field
                name="iconName"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-sky-400 outline-none"
                placeholder="Enter icon name (e.g., FaReact)"
              />
              <ErrorMessage
                name="iconName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition flex justify-center items-center"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Update Skill"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default EditSkill;
