import { useState } from "react";

const Drawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted:", formData);

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
        className={`fixed left-0 bottom-0 w-full h-[55vh] bg-[#eeeeee] text-[#1a1a1a] dark:bg-white/5 dark:backdrop-blur-2xl dark:text-[#eeeeee]  rounded-t-2xl shadow-xl z-50 p-6 transition-transform duration-300  
        ${isOpen ? "translate-y-0" : "translate-y-full"}
      `}
      >
        <h2 className="text-2xl font-semibold mb-4">Contact Me</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="p-3 border rounded-lg w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="p-3 border rounded-lg w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            className="p-3 border rounded-lg w-full resize-none"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 cursor-pointer transition w-[25  0px]"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Drawer;
