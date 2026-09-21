import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { z } from "zod";
import GoogleIcon from "../assets/Google.png";

const PHONE_REGEX = /^\d{10}$/;

const signupSchema = z
    .object({
        fullName: z
            .string()
            .trim()
            .min(1, "Full name is required.")
            .min(2, "Enter at least 2 characters."),
        email: z
            .string()
            .trim()
            .min(1, "Email is required.")
            .email("Enter a valid email address."),
        phone: z
            .string()
            .min(1, "Phone number is required.")
            .regex(PHONE_REGEX, "Please enter exactly 10 digits."),
        password: z
            .string()
            .min(1, "Password is required.")
            .min(8, "Password must be at least 8 characters."),
        confirmPassword: z
            .string()
            .min(1, "Confirm your password."),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

type SignupField = "fullName" | "email" | "phone" | "password" | "confirmPassword";

const Signupform = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<SignupField, string>>>({});

    const validate = () => {
        const result = signupSchema.safeParse({
            fullName,
            email,
            phone,
            password,
            confirmPassword,
        });

        if (!result.success) {
            const next: Partial<Record<SignupField, string>> = {};
            for (const issue of result.error.issues) {
                const field = issue.path[0] as SignupField;
                if (field && !next[field]) {
                    next[field] = issue.message;
                }
            }
            setErrors(next);
            return false;
        }

        setErrors({});
        return true;
    };

    const clearError = (key: SignupField) => {
        setErrors((prev) => {
            if (!prev[key]) return prev;
            const n = { ...prev };
            delete n[key];
            return n;
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (validate()) {
            navigate("/login");
        }
    };

    const inputBorder = (hasError: boolean) =>
        `w-full bg-transparent border-0 border-b px-0 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none transition-colors ${hasError ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-[#2563a8]"
        }`;

    return (
        <div className="py-12 sm:py-16 px-4 flex items-center justify-center bg-gray-50/70">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/70 border border-gray-100 p-8 sm:p-10">

                    {/* Header */}
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2 tracking-tight">
                        Create an Account
                    </h1>
                    <p className="text-sm text-gray-600 text-center mb-8">
                        Already have an account?{" "}
                        <Link to="/login" className="text-red-600 hover:underline font-semibold">
                            Login
                        </Link>
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        {/* Full Name */}
                        <div>
                            <input
                                type="text"
                                name="fullName"
                                autoComplete="name"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => {
                                    setFullName(e.target.value);
                                    clearError("fullName");
                                }}
                                className={inputBorder(Boolean(errors.fullName))}
                            />
                            {errors.fullName && (
                                <p className="mt-1 text-xs sm:text-sm text-red-600" role="alert">
                                    {errors.fullName}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                name="email"
                                autoComplete="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    clearError("email");
                                }}
                                className={inputBorder(Boolean(errors.email))}
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs sm:text-sm text-red-600" role="alert">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Phone Number */}
                        <div>
                            <input
                                type="tel"
                                name="phone"
                                autoComplete="tel"
                                inputMode="numeric"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                                    clearError("phone");
                                }}
                                className={inputBorder(Boolean(errors.phone))}
                            />
                            {errors.phone && (
                                <p className="mt-1 text-xs sm:text-sm text-red-600" role="alert">
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    autoComplete="new-password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => {
                                        const v = e.target.value;
                                        setPassword(v);
                                        clearError("password");
                                        if (v === confirmPassword) clearError("confirmPassword");
                                    }}
                                    className={`${inputBorder(Boolean(errors.password))} pr-9`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700 cursor-pointer transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <HiEyeSlash className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-xs sm:text-sm text-red-600" role="alert">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    autoComplete="new-password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        clearError("confirmPassword");
                                    }}
                                    className={`${inputBorder(Boolean(errors.confirmPassword))} pr-9`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700 cursor-pointer transition-colors"
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                >
                                    {showConfirmPassword ? <HiEyeSlash className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-xs sm:text-sm text-red-600" role="alert">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-[#2563a8] hover:bg-[#1d4e8f] text-white font-bold transition-all mt-2 cursor-pointer shadow-md shadow-blue-500/20 active:scale-[0.99] flex items-center justify-center gap-2"
                        >
                            Register
                        </button>
                    </form>

                    {/* OR Divider */}
                    <div className="flex items-center gap-4 my-8">
                        <span className="flex-1 h-px bg-gray-200" />
                        <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">OR</span>
                        <span className="flex-1 h-px bg-gray-200" />
                    </div>

                    {/* Google Sign-in Button */}
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors shadow-sm cursor-pointer"
                    >
                        <img src={GoogleIcon} alt="Google" className="w-5 h-5 object-contain" />
                        <span>Continue with Google</span>
                    </button>

                    {/* Footer Note */}
                    <p className="text-xs text-gray-500 mt-8 text-center leading-relaxed">
                        By joining, you agree to the{" "}
                        <span className="text-[#2563a8] hover:underline font-medium cursor-pointer">
                            Terms
                        </span>{" "}
                        and{" "}
                        <span className="text-[#2563a8] hover:underline font-medium cursor-pointer">
                            Privacy Policy.
                        </span>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Signupform;