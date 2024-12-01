import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/user-slice";
import { toast } from "sonner";

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLoginForm = async (event) => {
    event.preventDefault();
    const form = event.target;
    const payload = {
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const res = await login(payload);
      if (res?.data?.success && res?.data?.data?.accessToken) {
        localStorage.setItem("accessToken", res?.data?.data?.accessToken);
        toast.success(res?.data?.message);
        window.dispatchEvent(new Event("storage"));
        const from = location.state?.from || "/";
        return navigate(from, { replace: true });
      } else {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-4 rounded-lg border bg-white p-7 shadow-lg sm:p-10 ">
      <h1 className="text-3xl font-semibold tracking-tight">Sign In</h1>

      <form onSubmit={handleLoginForm} className="space-y-6">
        <div className="space-y-2 text-sm">
          <label htmlFor="email" className="block text-zinc-700 font-medium">
            Email
          </label>
          <input
            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none "
            id="email"
            placeholder="Enter email"
            name="email"
            type="email"
            required
          />
        </div>
        <div className="space-y-2 text-sm">
          <label
            htmlFor="password"
            className="block text-zinc-700  font-medium"
          >
            Password
          </label>
          <input
            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-1 focus-visible:outline-none "
            id="password"
            placeholder="Enter password"
            name="password"
            type="password"
            required
          />
        </div>
        <button
          disabled={isLoading}
          className="rounded-md bg-sky-500 px-6 py-2 text-white transition-colors hover:bg-sky-600 "
          type="submit"
        >
          {isLoading ? "Logging in ..." : "Login"}
        </button>
      </form>
      <p className="text-center text-sm text-zinc-700 mt-2">
        Don&apos;t have an account?
        <Link to="/register" className="font-semibold underline mx-2">
          Register Now
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
