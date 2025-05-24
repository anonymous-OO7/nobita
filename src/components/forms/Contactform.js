import React, { useState } from "react";
import { Loader } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useApi from "@/hooks/useApi";
import { FeedbackApi } from "@/apis";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { makeApiCall } = useApi();
  const [isLoading, setIsLoading] = useState(false);

  const notify = (text) => toast.success(text);
  const notifyFail = (text) => toast.error(text);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      notifyFail("All fields are required!");
      return;
    }

    fetchData();
  };

  const fetchData = async () => {
    setIsLoading(true);

    const payload = {
      name: formData.name,
      recipient: formData.email,
      subject: "Feedback from workist",
      body: formData.message,
    };

    makeApiCall(
      FeedbackApi(
        payload.name,
        payload.recipient,
        payload.subject,
        payload.body
      )
    )
      .then(() => {
        notify("Feedback sent successfully");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      })
      .catch((error) => {
        notifyFail(error?.response?.data?.message || "Feedback sending failed");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex justify-center px-4 sm:px-6 mb-20">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-3xl p-8 border border-gray-200">
        <form onSubmit={handleSubmit} className="form-content space-y-6">
          <h2 className="text-3xl font-semibold text-gray-900">Contact Us</h2>

          <div className="space-y-4">
            <input
              className="w-full px-5 py-3 rounded-xl border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:border-[#007aff] transition"
              id="name"
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              className="w-full px-5 py-3 rounded-xl border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:border-[#007aff] transition"
              id="email"
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              rows="6"
              className="w-full px-5 py-3 rounded-xl border border-gray-300 shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:border-[#007aff] transition resize-none"
              id="message"
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-black transition px-6 py-3 rounded-full font-medium shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <Loader className="animate-spin w-5 h-5" />
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ContactForm;
