import React, { useState } from "react";
import Input from "../../customComponents/input";
import LoadingButton from "../../customComponents/button-components/loadingButton";

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:w-1/2 relative bg-zinc-950 text-white p-10 flex-col">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1713755001325-0d19ad4d271d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Authentication background"
            className="h-full w-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          Admin Layout
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This platform has completely transformed how our team
              works. The authentication is seamless and the interface is
              intuitive.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-[350px] mx-auto">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-gray-500">
                Enter your credentials to access your account
              </p>
            </div>

            <div className="w-full">
              <div className="flex w-full bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab("signin")}
                  className={`w-1/2 py-2 text-center font-medium text-sm rounded-lg transition-all duration-300 ${
                    activeTab === "signin"
                      ? "bg-white shadow text-black"
                      : "text-gray-500"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setActiveTab("signup")}
                  className={`w-1/2 py-2 text-center font-medium text-sm rounded-lg transition-all duration-300 ${
                    activeTab === "signup"
                      ? "bg-white shadow text-black"
                      : "text-gray-500"
                  }`}
                >
                  Sign Up
                </button>
              </div>
              {activeTab === "signin" && (
                <div className="mt-6 grid gap-6">
                  <form onSubmit={onSubmit}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        {/* <input
                          id="email"
                          placeholder="name@example.com"
                          type="email"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          disabled={isLoading}
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#333335] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                        /> */}
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          autoComplete="email"
                          disabled={isLoading}
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Password
                          </label>
                          <a
                            // href="/forgot-password"
                            className="text-sm text-blue-600 hover:text-blue-500 hover:underline"
                          >
                            Forgot password?
                          </a>
                        </div>
                        <Input
                          id="password"
                          type="password"
                          autoComplete="current-password"
                          disabled={isLoading}
                        />
                      </div>
                      <LoadingButton
                        type="submit"
                        size="medium"
                        className="bg-[#111010] hover:bg-[#333335] text-white text-sm h-10"
                        isLoading={isLoading}
                      >
                        {isLoading ? "Signing In..." : "Sign In"}
                      </LoadingButton>
                      {/* <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex h-10 items-center justify-center rounded-md bg-[#111010] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#333335] focus:outline-none focus:ring-2 focus:ring-[#333335] focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="mr-2 h-4 w-4 animate-spin"
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
                            Signing In...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </button> */}
                    </div>
                  </form>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      disabled={isLoading}
                      className="inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#333335] focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                          fill="#EA4335"
                        />
                        <path
                          d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                          fill="#4285F4"
                        />
                        <path
                          d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                          fill="#34A853"
                        />
                      </svg>
                      Google
                    </button>
                    <button
                      type="button"
                      disabled={isLoading}
                      className="inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#333335] focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          d="M16.7 7.16c-1.73 0-2.47.82-3.68.82-1.24 0-2.18-.82-3.68-.82-1.47 0-3.03.85-4.01 2.32-1.39 2.07-1.15 5.97 1.1 9.28.8 1.2 1.87 2.54 3.28 2.55 1.25.01 1.6-.79 3.3-.79 1.7 0 2.02.79 3.28.79 1.4-.01 2.53-1.46 3.33-2.67.57-.86.78-1.29 1.22-2.26-3.21-1.22-3.74-5.8-.14-7.22Z"
                          fill="currentColor"
                        />
                        <path
                          d="M12.98 5.11c.67-.83 1.17-1.97 1.04-3.11-1.14.07-2.47.77-3.25 1.71-.7.82-1.27 1.96-1.11 3.09 1.24.05 2.54-.67 3.32-1.69Z"
                          fill="currentColor"
                        />
                      </svg>
                      Apple
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "signup" && (
                <div className="mt-6 grid gap-6">
                  <form onSubmit={onSubmit}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Full Name
                        </label>
                        <Input
                          id="name"
                          placeholder="Jennifer"
                          disabled={isLoading}
                        />
                        {/* <input
                          id="name"
                          placeholder="Jennifer"
                          type="text"
                          autoCapitalize="none"
                          autoCorrect="off"
                          disabled={isLoading}
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#333335] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                        /> */}
                      </div>
                      <div className="grid gap-2">
                        <label
                          htmlFor="email-signup"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          autoComplete="email"
                          disabled={isLoading}
                        />
                      </div>
                      <div className="grid gap-2">
                        <label
                          htmlFor="password-signup"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                        <Input
                          id="password-signup"
                          type="password"
                          autoComplete="new-password"
                          disabled={isLoading}
                        />
                        {/* <input
                            id="password-signup"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="new-password"
                            disabled={isLoading}
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#333335] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                          /> */}
                      </div>
                      <LoadingButton
                        size="medium"
                        onClick={() => setShowFullScreenModal(true)}
                        className="bg-[#111010] hover:bg-[#333335] text-white text-sm h-10"
                        isLoading={isLoading}
                      >
                        {isLoading ? "Creating Account..." : "Create Account"}
                      </LoadingButton>
                      {/* <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex h-10 items-center justify-center rounded-md bg-[#111010] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#333335] focus:outline-none focus:ring-2 focus:ring-[#333335] focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                      >
                        {isLoading ? (
                          <>
                            <svg
                              className="mr-2 h-4 w-4 animate-spin"
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
                            Creating Account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </button> */}
                    </div>
                  </form>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      disabled={isLoading}
                      className="inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:[#333335] focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                          fill="#EA4335"
                        />
                        <path
                          d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                          fill="#4285F4"
                        />
                        <path
                          d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                          fill="#34A853"
                        />
                      </svg>
                      Google
                    </button>
                    <button
                      type="button"
                      disabled={isLoading}
                      className="inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:[#333335] focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          d="M16.7 7.16c-1.73 0-2.47.82-3.68.82-1.24 0-2.18-.82-3.68-.82-1.47 0-3.03.85-4.01 2.32-1.39 2.07-1.15 5.97 1.1 9.28.8 1.2 1.87 2.54 3.28 2.55 1.25.01 1.6-.79 3.3-.79 1.7 0 2.02.79 3.28.79 1.4-.01 2.53-1.46 3.33-2.67.57-.86.78-1.29 1.22-2.26-3.21-1.22-3.74-5.8-.14-7.22Z"
                          fill="currentColor"
                        />
                        <path
                          d="M12.98 5.11c.67-.83 1.17-1.97 1.04-3.11-1.14.07-2.47.77-3.25 1.71-.7.82-1.27 1.96-1.11 3.09 1.24.05 2.54-.67 3.32-1.69Z"
                          fill="currentColor"
                        />
                      </svg>
                      Apple
                    </button>
                  </div>
                </div>
              )}
            </div>

            <p className="text-center text-sm text-gray-500">
              By clicking continue, you agree to our{" "}
              <a
                href="/terms"
                className="text-blue-600 hover:text-blue-500 hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="text-blue-600 hover:text-blue-500 hover:underline"
              >
                Privacy Policy
              </a>
              .
            </p>

            <p className="text-center text-sm text-gray-500">
              {activeTab === "signin" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setActiveTab("signup")}
                    className="text-blue-600 hover:text-blue-500 hover:underline"
                  >
                    Create an account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setActiveTab("signin")}
                    className="text-blue-600 hover:text-blue-500 hover:underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
