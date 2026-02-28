"use client";
import { useState } from "react";
import { useAuthActions, useAuthRedirect } from "@/hooks/useAuthGuard";
import { authService, type RegisterPayload } from "@/services/auth.service";
import Link from "next/link";

const AlertBox = ({ type, message }: { type: "error" | "success"; message: string }) => {
  const bgColor = type === "error" ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200";
  const textColor = type === "error" ? "text-red-700" : "text-green-700";

  return (
    <div className={`p-4 border rounded-lg ${bgColor} ${textColor} text-sm`}>
      {message}
    </div>
  );
};

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  disabled,
  placeholder,
}: {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  placeholder: string;
}) => (
  <div className="space-y-2">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required
      disabled={disabled}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
    />
  </div>
);

export default function RegisterPage() {
  const { login, goToDashboard } = useAuthActions();
  const isInitializing = useAuthRedirect();

  const [formData, setFormData] = useState<RegisterPayload>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await authService.register(formData);
      login(response.user, response.token);
      goToDashboard();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (isInitializing) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 text-center">Sign Up</h1>
            <p className="text-gray-600 text-center mt-2">Create your Rival Blog account</p>
          </div>

          {error && <AlertBox type="error" message={error} />}

          <form onSubmit={handleSubmit} className="space-y-5 mt-6">
            <InputField
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="John Doe"
            />

            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="you@example.com"
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="••••••••"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Creating account...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
