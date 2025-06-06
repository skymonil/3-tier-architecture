import { useState } from "react";

const AdmissionHelp = () => {
  // Sample FAQ Data
  const faqs = [
    {
      question: "How to apply for admission?",
      answer:
        "You can apply for admission through our online portal or by visiting the admissions office.",
    },
    {
      question: "What are the eligibility criteria?",
      answer:
        "Eligibility criteria vary by course. Please refer to the respective course details for more information.",
    },
    {
      question: "What documents are required?",
      answer:
        "You will need a photo ID, your mark sheets, and other documents as specified in the guidelines.",
    },
  ];

  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-[#9c231b]">
        Help & Support
      </h2>

      {/* FAQs Section */}
      <div className="mb-8">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
          Frequently Asked Questions
        </h3>
        <div>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 pb-4 mb-4"
            >
              <div
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center cursor-pointer py-2"
              >
                <span className="text-sm sm:text-base font-medium text-gray-700">
                  {faq.question}
                </span>
                <i
                  className={`fas fa-chevron-down transform transition-transform duration-300 ${
                    openFAQ === index ? "rotate-180" : ""
                  }`}
                ></i>
              </div>
              {openFAQ === index && (
                <div className="pl-6 pt-2 text-gray-600 text-sm sm:text-base">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Info Section */}
      <div>
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
          Contact Information
        </h3>
        <ul className="space-y-3 text-sm sm:text-base text-gray-700">
          <li>
            <strong>Phone:</strong> +91 91753 12345
          </li>
          <li>
            <strong>Email:</strong> support@college.com
          </li>
          <li>
            <strong>Address:</strong> Samrat, Vile Parle
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdmissionHelp;
