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
      header: "What services do you offer?",
      text: "We provide job listings, referrals, resume help, and career advice.",
    },
    {
      header: "How do I sign up?",
      text: "Click the Sign Up button on the top right and fill in your details.",
    },
    {
      header: "Is there a cost?",
      text: "Basic services are free. Premium features are paid.",
    },
    {
      header: "How do referrals work?",
      text: "We match you with professionals who can refer you directly to companies.",
    },
    {
      header: "Can I become a referral partner?",
      children: (
        <div className="mt-3">
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Yes! Click the button below to sign up as a referral partner and
            start earning.
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
            Become a Referrer
          </button>
        </div>
      ),
    },
    {
      header: "How do I apply for a job?",
      text: "Browse jobs, click on a listing, and follow application instructions.",
    },
    {
      header: "How long does it take to get a referral?",
      text: "Referrals can take a few days to a couple of weeks depending on the job.",
    },
    {
      header: "What if I have technical issues?",
      text: "Contact our support team via the Contact page for help.",
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
          General Questions
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
