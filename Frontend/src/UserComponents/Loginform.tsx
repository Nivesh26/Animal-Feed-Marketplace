import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { z } from "zod";
import GoogleIcon from "../assets/Google.png";

const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email is required.")
        .email("Enter a valid email address."),
    password: z
        .string()
        .min(1, "Password is required.")
        .min(8, "Password must be at least 8 characters."),
});

const Loginform = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const validate = () => {
        const result = loginSchema.safeParse({ email, password });
        if (!result.success) {
            const next: { email?: string; password?: string } = {};
            for (const issue of result.error.issues) {
                const field = issue.path[0] as "email" | "password";
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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        validate();
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
                        Login
                    </h1>
                    <p className="text-sm text-gray-600 text-center mb-8">
                        Don&apos;t have an account?{" "}
                        <Link to="/signup" className="text-red-600 hover:underline font-semibold">
                            Signup
                        </Link>
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        {/* Email Field */}
                        <div>
                            <input
                                type="email"
                                name="email"
                                autoComplete="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errors.email) {
                                        setErrors((prev) => ({ ...prev, email: undefined }));
                                    }
                                }}
                                className={inputBorder(Boolean(errors.email))}
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs sm:text-sm text-red-600" role="alert">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (errors.password) {
                                            setErrors((prev) => ({ ...prev, password: undefined }));
                                        }
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
                            <div className="flex justify-end mt-2">
                                <div

                                    className="text-xs sm:text-sm text-[#2563a8] hover:underline cursor-pointer font-medium"
                                >
                                    Forget Password?
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-[#2563a8] hover:bg-[#1d4e8f] text-white font-bold transition-all mt-2 cursor-pointer shadow-md shadow-blue-500/20 active:scale-[0.99] flex items-center justify-center gap-2"
                        >
                            Login
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

export default Loginform;