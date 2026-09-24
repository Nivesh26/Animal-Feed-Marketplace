import { useState, type FormEvent } from "react";
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineClock,
  HiCheckCircle,
  HiPaperAirplane,
} from "react-icons/hi2";
import { z } from "zod";

import Topbar from "../UserComponents/Topbar";
import Header from "../UserComponents/Header";
import Footer from "../UserComponents/Footer";
import Copyright from "../UserComponents/Copyright";

const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required.")
    .min(2, "Name must be at least 2 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required.")
    .email("Please enter a valid email address."),
  subject: z
    .string()
    .min(1, "Please select a subject."),
  message: z
    .string()
    .trim()
    .min(1, "Message is required.")
    .min(10, "Message should be at least 10 characters so we can assist you better."),
});

type ContactFormData = z.infer<typeof contactSchema>;
type ContactField = keyof ContactFormData;

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const clearError = (key: ContactField) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validate = (): boolean => {
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const nextErrors: Partial<Record<ContactField, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as ContactField;
        if (field && !nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      }
      setErrors(nextErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    // Simulate lightweight API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      subject: "General Inquiry",
      message: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Topbar />
      <Header />

      <main className="flex-1 py-12 sm:py-16 bg-[#fafbfb]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Page Header ── */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
              We're Here to Help
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-lg mx-auto">
              Have questions regarding animal feed formulas, custom bulk orders, or your recent purchase? Send us a note and we'll reply promptly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* ── Left Column: Contact Information ── */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-xs">
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-5">
                  Contact Information
                </h2>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563a8] flex items-center justify-center shrink-0 border border-blue-100">
                      <HiOutlineEnvelope className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-medium">Email Us</div>
                      <div className="text-sm font-semibold text-gray-900">
                        petfeed@gmail.com
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563a8] flex items-center justify-center shrink-0 border border-blue-100">
                      <HiOutlinePhone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-medium">Call Us</div>
                      <div className="text-sm font-semibold text-gray-900">
                        +977 9876543210
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563a8] flex items-center justify-center shrink-0 border border-blue-100">
                      <HiOutlineMapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-medium">Warehouse & Office</div>
                      <div className="text-sm font-semibold text-gray-900">
                        Kathmandu Nepal
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563a8] flex items-center justify-center shrink-0 border border-blue-100">
                      <HiOutlineClock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 font-medium">Operating Hours</div>
                      <div className="text-sm font-semibold text-gray-900">
                        Monday – Friday: 7:00 AM – 4:00 PM
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="text-xs text-gray-500 leading-relaxed">
                    <span className="font-semibold text-gray-800">Veterinary Consultation:</span> For urgent livestock or pet dietary questions, please include your animal type and age in your message.
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right Column: Minimal Form with Zod Validation ── */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl p-6 sm:p-8 sm:p-10 border border-gray-200/80 shadow-xs">
                {isSubmitted ? (
                  <div className="py-10 text-center flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-blue-50 text-[#2563a8] border border-blue-200 flex items-center justify-center mb-4">
                      <HiCheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Message Received!</h3>
                    <p className="text-sm text-gray-500 mt-2 max-w-md">
                      Thank you, <span className="font-medium text-gray-800">{formData.fullName}</span>. Our nutritional team has received your message and will respond to <span className="font-medium text-gray-800">{formData.email}</span> within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="mt-6 px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-gray-900">
                        Send a Message
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        Fill in your details below and we'll be in touch.
                      </p>
                    </div>

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, fullName: e.target.value }));
                            clearError("fullName");
                          }}
                          placeholder="e.g. Nivesh Shrestha"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-colors ${errors.fullName
                            ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-200 focus:border-[#2563a8] focus:ring-1 focus:ring-[#2563a8]"
                            }`}
                        />
                        {errors.fullName && (
                          <p className="text-[11px] text-red-500 font-medium mt-1">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, email: e.target.value }));
                            clearError("email");
                          }}
                          placeholder="petfeed@gmail.com"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-colors ${errors.email
                            ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-200 focus:border-[#2563a8] focus:ring-1 focus:ring-[#2563a8]"
                            }`}
                        />
                        {errors.email && (
                          <p className="text-[11px] text-red-500 font-medium mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject / Inquiry Type */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, subject: e.target.value }));
                          clearError("subject");
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-gray-900 bg-white transition-colors cursor-pointer focus:outline-none ${errors.subject
                          ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                          : "border-gray-200 focus:border-[#2563a8] focus:ring-1 focus:ring-[#2563a8]"
                          }`}
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Nutritional Advice">Nutritional Advice / Formulation</option>
                        <option value="Order & Delivery Status">Order & Delivery Status</option>
                        <option value="Bulk Farm Supply">Bulk Farm & Commercial Supply</option>
                      </select>
                      {errors.subject && (
                        <p className="text-[11px] text-red-500 font-medium mt-1">
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={5}
                        value={formData.message}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, message: e.target.value }));
                          clearError("message");
                        }}
                        placeholder="Tell us what you need help with (at least 10 characters)..."
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none resize-none transition-colors ${errors.message
                          ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                          : "border-gray-200 focus:border-[#2563a8] focus:ring-1 focus:ring-[#2563a8]"
                          }`}
                      />
                      {errors.message && (
                        <p className="text-[11px] text-red-500 font-medium mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2563a8] hover:bg-[#1d4e8f] active:bg-[#173e73] text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all duration-150 cursor-pointer disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <span>Sending message...</span>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <HiPaperAirplane className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <Copyright />
    </div>
  );
};

export default Contact;
