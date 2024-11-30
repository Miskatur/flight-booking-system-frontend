import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/features/user-slice";
import { toast } from "sonner";

const RegisterForm = () => {
  const [registration, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const handleRegistration = async (event) => {
    event.preventDefault();
    const form = event.target;
    const payload = {
      name: `${form.first_name.value} ${form.last_name.value}`,
      phone: form.phone.value,
      email: form.email.value,
      password: form.password.value,
    };
    try {
      const res = await registration(payload);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        return navigate("/signin");
      } else {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="max-w-md space-y-6 rounded-lg border bg-white p-10 shadow-lg  ">
      <div className="flex flex-col space-y-1">
        <h3 className="text-3xl font-bold tracking-tight">Registration Form</h3>
        <p className="text-sm text-zinc-500 ">
          Please fill in the form to create an account.
        </p>
      </div>
      <div>
        <form className="space-y-6" onSubmit={handleRegistration}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 text-sm">
              <label
                className="text-sm font-medium leading-none text-zinc-700 "
                htmlFor="first_name"
              >
                First Name
              </label>
              <input
                className="flex h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none "
                id="first_name"
                placeholder="Enter first name"
                name="first_name"
                type="text"
                required
              />
            </div>
            <div className="space-y-2 text-sm">
              <label
                className="text-sm font-medium leading-none text-zinc-700 "
                htmlFor="last_name"
              >
                Last Name
              </label>
              <input
                className="flex h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none "
                id="last_name"
                placeholder="Enter last name"
                name="last_name"
                type="text"
                required
              />
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <label
              className="text-sm font-medium leading-none text-zinc-700 "
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              className="flex h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none "
              id="phone"
              placeholder="Enter your phone"
              name="phone"
              type="tel"
              required
            />
          </div>
          <div className="space-y-2 text-sm">
            <label
              className="text-sm font-medium leading-none text-zinc-700 "
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="flex h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none "
              id="email"
              placeholder="Enter your email"
              name="email"
              type="email"
              required
            />
          </div>
          <div className="space-y-2 text-sm">
            <label
              className="text-sm font-medium leading-none text-zinc-700 "
              htmlFor="password_"
            >
              Password
            </label>
            <input
              className="flex h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none "
              id="password_"
              placeholder="password"
              name="password"
              type="password"
              required
            />
          </div>

          <button
            className="rounded-md bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600 "
            type="submit"
          >
            Register Now
          </button>
        </form>
      </div>
      <p className="text-center text-sm text-zinc-700 mt-2">
        Already have an account?
        <Link to="/signin" className="font-semibold underline mx-2">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
