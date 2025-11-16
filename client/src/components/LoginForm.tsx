import { Card, TextInput, PasswordInput, Button, Title, Stack, Anchor } from "@mantine/core";
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
      callbackURL: "/dashboard",
    });
    //TODO:report error
    if (error) {
      // message = error.message!;
    }
    console.log(data);
  }

  return (
    <Card w={360} shadow="xl" radius="md" p="xl" withBorder style={{ margin: "auto" }}>
      <Title order={3} ta="center" mb="md">
        Login
      </Title>

      <form onSubmit={form.onSubmit(async (values) => await login(values))}>
        <Stack gap="md">
          <TextInput
            label="Email"
            placeholder="you@example.com"
            {...form.getInputProps("email")}
            required
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            {...form.getInputProps("password")}
            required
          />

          <Button type="submit" fullWidth>
            Log In
          </Button>

          <Anchor size="sm" ta="center" href="#" underline="always">
            Forgot password?
          </Anchor>
        </Stack>
      </form>
    </Card>
  );
}
