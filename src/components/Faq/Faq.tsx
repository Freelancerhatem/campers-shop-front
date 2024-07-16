import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is the return policy?",
    answer:
      "You can return any item within 30 days of purchase for a full refund.",
  },
  {
    question: "How long does shipping take?",
    answer: "Shipping usually takes between 5-7 business days.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we offer international shipping to most countries.",
  },
  // Add more FAQ items as needed
];

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                onClick={() => handleToggle(index)}
                className="w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <div className="flex justify-between items-center py-2">
                  <h3 className="text-lg font-medium">{item.question}</h3>
                  <span>{openIndex === index ? "-" : "+"}</span>
                </div>
              </button>
              {openIndex === index && (
                <div className="mt-2 text-gray-600">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
