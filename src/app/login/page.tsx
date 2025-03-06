import { Button } from "@/components/ui/button";
import RSInput from "@/components/ui/core/coustomUI/RSInput";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center border justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-lg overflow-hidden shadow-lg bg-white">
        {/* Left side - Signup section */}
        <div className="relative w-full md:w-3/5 bg-white p-8 flex flex-col justify-center items-center">
          {/* <div className="absolute top-0 right-0 w-32 h-32 bg-red-400 rounded-bl-[100px]"></div> */}
          <div className="max-w-md w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-500 mb-6 text-center">
              Login Account
            </h2>
            <div className="space-y-4">
              {/* Email Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6H20V18H4V6Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M4 6L12 12L20 6"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <RSInput
                  type="email"
                  placeholder="Email"
                  className="pl-10 rounded-md border-gray-300"
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="5"
                      y="8"
                      width="14"
                      height="12"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle
                      cx="12"
                      cy="14"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path d="M12 16V18" stroke="currentColor" strokeWidth="2" />
                    <path
                      d="M10 8V6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6V8"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <RSInput
                  type="password"
                  placeholder="Password"
                  className="pl-10 rounded-md border-gray-300"
                />
              </div>

              <div className="flex justify-center mt-6">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8">
                  LOGIN
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Left side - Login section */}
        <div className="relative w-full md:w-2/5 bg-emerald-500 text-white p-8 flex flex-col justify-center items-center">
          <h3 className="text-sm font-medium">Re-Store</h3>
          <h1 className="text-3xl md:text-4xl font-bold mt-4">Welcome Back!</h1>
          <p className="text-sm mt-2 text-center">{`DON'T HAVE AN ACCOUNT ?`}</p>
          <Link href="/register">
            <button className="mt-4 w-32 rounded-full px-4 py-2 text-white border-2 border-white hover:bg-white hover:text-emerald-500 transition duration-300 ease-in-out">
              REGISTER
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
