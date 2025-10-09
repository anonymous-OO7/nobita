"use client";
import React, { useState } from "react";

interface AccordionItemProps {
  header: string;
  text?: string;
  isOpen: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  header,
  text,
  isOpen,
  onClick,
  children,
}) => {
  return (
    <div className="mb-6 w-full rounded-lg bg-white dark:bg-gray-800 shadow transition-all duration-300">
      <button
        className="flex w-full items-center justify-between px-6 py-4 text-left"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
          {header}
        </h4>
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          } text-indigo-600 dark:text-indigo-400`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[400px] px-6 pb-6" : "max-h-0"
        }`}
      >
        {text && <p className="text-gray-600 dark:text-gray-300">{text}</p>}
        {children}
      </div>
    </div>
  );
};

const Accordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
    {
      header: "What does this platform offer?",
      text: "This platform connects people with job opportunities across industries and provides a space to explore, share, and read blogs on diverse subjects such as tech, business, lifestyle, science, travel, and more.",
    },
    {
      header: "How do I find blogs or jobs?",
      text: "Browse our curated categories or use the search function to easily find blogs on your favorite topics or explore job listings that match your profile. You can also filter by interest or industry.",
    },
    {
      header: "Can I contribute as a blog writer?",
      children: (
        <div className="mt-3">
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Absolutely! Register as a contributor to start publishing your own
            blogs and reach a wide audience. Share insights, experiences, or
            knowledge in your areas of expertise.
          </p>
          <button
            onClick={() =>
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSeFT0yElRSlgMQ45MtftSV4DNEXItEmu_a_vTimkPdo4HKu9A/viewform",
                "_blank"
              )
            }
            className="text-sm border border-[#0071e3] text-[#0071e3] px-3 py-1.5 rounded-md hover:bg-[#0071e3] hover:text-white transition"
          >
            Join as a Blog Writer
          </button>
        </div>
      ),
    },
    {
      header: "Is there a cost to use the site?",
      text: "Browsing and reading blogs, as well as searching and applying for jobs, are completely free. Some advanced features or premium job placement and personalized blog promotion may require a small fee or subscription.",
    },
    {
      header: "How do I register and set up my profile?",
      text: "Just click the Sign Up button in the header and fill in your details. You can complete your profile, upload a resume (for jobs), or set up your writer profile (for blogs) at any time.",
    },
    {
      header: "How do I apply for a job?",
      text: "Simply review job details and click the Apply button on any listing. Follow the instructions provided to submit your application, resume, and other required materials.",
    },
    {
      header: "Can I subscribe to blog or job updates?",
      text: "Yes! Subscribe to notifications to receive the latest blogs in your favorite categories or instant job alerts directly to your inbox.",
    },
    {
      header: "What if I have technical issues or need help?",
      text: "Reach out to our support team anytime via the Contact page. We're committed to providing quick assistance and ensuring a smooth experience for all users.",
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 px-4 py-12 md:px-10 lg:px-20">
      <div className="text-center mb-10">
        <span className="block text-sm font-medium text-indigo-600">FAQ</span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
          Any Questions? Look Here
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          General questions about blogs, jobs, and using the platform
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        {faqItems.map((item, index) => (
          <AccordionItem
            key={index}
            header={item.header}
            text={item.text}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            {item.children}
          </AccordionItem>
        ))}
      </div>
    </section>
  );
};

export default Accordion;
