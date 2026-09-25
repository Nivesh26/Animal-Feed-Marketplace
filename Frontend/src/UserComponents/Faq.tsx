import { useState } from "react";
import { HiChevronDown } from "react-icons/hi2";

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "How do I choose the right feed for my animal's age and breed?",
        answer:
            "Every animal species and life stage requires specific nutritional balances. You can filter our products by animal category (Dog, Cat, Cattle, Poultry, etc.) and check the product features for age recommendations. For specific dietary requirements or medical conditions, we always recommend consulting your veterinarian.",
    },
    {
        question: "Are all feeds and supplements quality tested and authentic?",
        answer:
            "Yes. We partner exclusively with certified animal nutrition brands and licensed distributors. Every batch is verified for freshness, proper seal integrity, and compliance with national pet and livestock feed safety standards.",
    },
    {
        question: "What are your delivery timeframes and shipping rates?",
        answer:
            "Standard orders are delivered within 2 to 4 business days. Express next-day delivery is available in select major cities. Shipping costs are calculated based on parcel weight and destination, with free delivery available on qualifying orders above Rs. 5,000.",
    },
    {
        question: "Do you offer wholesale or bulk purchase discounts for farms and shelters?",
        answer:
            "Yes! We provide tailored wholesale pricing and recurring scheduled shipments for commercial livestock farms, stables, breeding centers, and animal rescue shelters. Contact our support team via our Contact page for customized bulk quotes.",
    },
    {
        question: "What is your return or replacement policy?",
        answer:
            "If you receive an incorrect, damaged, or expired item, you can request a hassle-free replacement or full refund within 7 days of delivery. Please ensure that the packaging remains unopened and in its original condition.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-12 sm:py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                        Frequently Asked Questions
                    </h2>
                </div>

                {/* FAQ Accordion List */}
                <div className="space-y-3">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <div
                                key={index}
                                className="border border-gray-100 rounded-2xl overflow-hidden transition-colors duration-200 bg-white shadow-2xs hover:border-gray-200"
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-6 py-4.5 sm:py-5 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                                    aria-expanded={isOpen}
                                >
                                    <span className="text-xs sm:text-sm font-semibold text-gray-900">
                                        {faq.question}
                                    </span>
                                    <HiChevronDown
                                        className={`shrink-0 w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-gray-700" : ""
                                            }`}
                                    />
                                </button>

                                {isOpen && (
                                    <div className="px-6 pb-4 sm:pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQ;