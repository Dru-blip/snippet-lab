import { useForm } from "@mantine/form";
import { authClient } from "../lib/auth-client";

export default function RegisterForm() {
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate: {
      username: (value) => (value.length < 3 ? "Username should have at least 3 characters" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length < 8 ? "Password should have at least 8 characters" : null),
    },
  });

  async function register({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) {
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name: username,
      callbackURL: "/lab",
    });

    //TODO:report error
    if (error) {
      console.log("Error:", error.message);
      return;
    }

    console.log("Registration successful:", data);
  }

  return (
    <div className="card shadow-xl bg-base-100 border m-auto w-96 p-8">
      <h2 className="card-title text-center mb-4">Register</h2>

      <form onSubmit={form.onSubmit(async (values) => await register(values))}>
        <div className="flex flex-col gap-4">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input
              type="text"
              placeholder="Your username"
              className="input input-bordered w-full"
              {...form.getInputProps("username")}
              required
            />
            {form.errors.username && <div className="label text-error">{form.errors.username}</div>}
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
              {...form.getInputProps("email")}
              required
            />
            {form.errors.email && <div className="label text-error">{form.errors.email}</div>}
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder="Your password"
              className="input input-bordered w-full"
              {...form.getInputProps("password")}
              required
            />
            {form.errors.password && <div className="label text-error">{form.errors.password}</div>}
          </label>

          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>

          <a className="link link-hover text-sm text-center" href="/login">
            Already have an account? Login
          </a>
        </div>
      </form>
    </div>
  );
}
