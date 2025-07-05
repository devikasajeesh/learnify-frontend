"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    password: "",
    gpa: "",
    branch: "",
    sem: "",
    subin: "",
    subnin: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.password.trim()) newErrors.password = "Password is required";
    if (!form.gpa.trim()) newErrors.gpa = "GPA is required";

    if (!form.branch.trim()) newErrors.branch = "Branch is required";
    if (!form.sem.trim()) newErrors.sem = "Semester is required";
    if (!form.subin.trim()) newErrors.subin = "This field is required";
    if (!form.subnin.trim()) newErrors.subnin = "This field is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    const payload = {
      username: form.username.trim(),
      password: form.password.trim(),
      gpa: parseFloat(form.gpa),
      branch: form.branch.trim(),
      sem: form.sem.trim(),
      subin: form.subin.trim(),
      subnin: form.subnin.trim(),
    };

    try {
      await axios.post("http://localhost:8000/auth/register", payload);
      setIsLoading(false);
      router.push("/login");
    } catch (error: any) {
      setIsLoading(false);
      alert(
        error.response?.data?.detail || "Registration failed. Please try again."
      );
    }
  };

  const fieldConfig = [
    { name: "username", label: "Username", type: "text" },
    { name: "password", label: "Password", type: "password" },
    {
      name: "gpa",
      label: "GPA",
      type: "number",
      step: "0.01",
      min: "0",
      max: "4",
    },
    { name: "branch", label: "Branch", type: "text" },
    { name: "sem", label: "Semester", type: "text" },
    { name: "subin", label: "Subjects Interested", type: "text" },
    { name: "subnin", label: "Subjects Not Interested", type: "text" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Create Your Account</h1>
          <p className="text-blue-100 mt-1">Join our community of learners</p>
        </div>

        <div className="p-6 space-y-4">
          {fieldConfig.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                type={field.type}
                name={field.name}
                value={(form as any)[field.name]}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                step={field.step}
                min={field.min}
                max={field.max}
              />
              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-600">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}

          <button
            onClick={handleSignup}
            disabled={isLoading}
            className={`w-full mt-6 py-3 px-4 rounded-lg font-medium text-white transition ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating account...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>

          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
            >
              Log in
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
