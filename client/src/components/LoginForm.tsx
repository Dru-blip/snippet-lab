import { useForm } from "@mantine/form";
import { authClient } from "../lib/auth-client";

export default function LoginForm() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length < 8 ? "Password should have at least 8 characters" : null),
    },
  });

  async function login({ email, password }: { email: string; password: string }) {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/lab",
    });
    //TODO:report error
    if (error) {
      // message = error.message!;\n
    }
    console.log(data);
  }

  return (
    <div className="card shadow-xl bg-base-100 border m-auto w-96 p-8">
      <h2 className="card-title text-center mb-4">Login</h2>

      <form onSubmit={form.onSubmit(async (values) => await login(values))}>
        <div className="flex flex-col gap-4">
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
            Log In
          </button>

          <a className="link link-hover text-sm text-center" href="#">
            Forgot password?
          </a>
        </div>
      </form>
    </div>
  );
}
