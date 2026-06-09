import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { API_ENDPOINTS } from "../lib/api";

const Drawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await axios.post(API_ENDPOINTS.contact.create, formData);
    setFormData({ name: "", email: "", message: "" });
    setLoading(false);

    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
          role="button"
        />
      )}

      <div
        className={`fixed left-0 bottom-0 w-full h-[55vh] bg-card text-card-foreground dark:backdrop-blur-2xl rounded-t-2xl shadow-xl z-50 p-6 transition-transform duration-300
        ${isOpen ? "translate-y-0" : "translate-y-full"}
      `}
      >
        <h2 className="text-2xl font-semibold mb-4">{t("contact.title")}</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder={t("contact.name")}
            className="p-3 border rounded-lg w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder={t("contact.email")}
            className="p-3 border rounded-lg w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder={t("contact.message")}
            rows={4}
            className="p-3 border rounded-lg w-full resize-none"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="bg-primary text-primary-foreground p-3 rounded-lg hover:bg-primary/90 cursor-pointer transition w-[250px]"
            >
              {loading ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                t("contact.send")
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Drawer;
