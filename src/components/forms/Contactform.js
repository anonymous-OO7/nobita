import React, { useState } from "react";
import axios from "axios";
import { Loader } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Phone } from "lucide-react";
import { Mail } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const notify = (text) => toast.success(text);
  const notifyfail = (text) => toast.error(text);

  const payload = {
    name: formData.name,
    recipient: formData.email,
    subject: "Query Received by Connect Residuary Private Limited",
    body: formData.message,
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // fetchData();
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      console.log(payload);
      const response = await axios.post(
        "https://feedbackservice-u5ab3vfhaa-uw.a.run.app/sendemail",
        payload
      );
      setIsLoading(false);
      notify("Message sent!");
    } catch (error) {
      setIsLoading(false);
      notifyfail("Error occurred!!");
      setError(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center w-full mb-20">
      <div className="w-[80%] mt-0"></div>
      <div className="contact-form-container flex-1 w-full mt-5 flex justify-center">
        <div className="contact-form-content grid grid-cols-1 lg:grid-cols-2 gap-4 w-[80%]">
          <div className="contact-form">
            <form
              onSubmit={handleSubmit}
              className="form-content relative flex flex-col justify-center items-center mt-2"
            >
              <div className="form-inputs flex flex-col justify-between mb-2 w-3/4 sm:w-full">
                <input
                  className="input-field shadow px-2 py-3 rounded outline-none focus:ring-0 my-2"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  className="input-field shadow px-2 py-3 rounded outline-none focus:ring-0 my-2"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-textarea flex flex-row justify-center items-center mt-2 mb-4 w-3/4 sm:w-full h-40">
                <textarea
                  rows="6"
                  className="textarea-field w-full h-full px-2 shadow border rounded focus:outline-none focus:shadow-outline"
                  id="message"
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-button flex items-center justify-center w-full">
                <button
                  className="submit-button rounded w-full bg-[#00006A] text-white font-roboto py-3 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  {isLoading ? <Loader /> : <div>Send Message</div>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ContactForm;
