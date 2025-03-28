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
    <div className="flex flex-col items-center w-full mb-20">
      <div className="contact-form bg-white shadow-lg rounded-lg p-6 w-full border border-gray-200">
        <form
          onSubmit={handleSubmit}
          className="form-content relative flex flex-col justify-center"
        >
          <h2 className="text-2xl font-normal text-black mb-4">Contact Us</h2>
          <div className="form-inputs flex flex-col justify-between mb-4 w-3/4 sm:w-full">
            <input
              className="input-field shadow-sm px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 my-2 text-black font-medium"
              id="name"
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              className="input-field shadow-sm px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 my-2 text-black font-medium"
              id="email"
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-textarea flex flex-row justify-center items-center mt-2 mb-4 w-3/4 sm:w-full">
            <textarea
              rows="6"
              className="textarea-field w-full h-40 px-4 py-3 shadow-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black font-medium"
              id="message"
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-button flex items-center justify-center w-full">
            <button
              className="submit-button rounded-lg p-5 bg-[#00006A] text-white font-semibold py-3 hover:bg-[#00004A] transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader />
              ) : (
                <div className="text-sm font-normal text-black shadow-lg bg-blue-600 p-3">
                  Send Message
                </div>
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
