import { Card, TextInput, PasswordInput, Button, Title, Stack, Anchor } from "@mantine/core";
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
    <Card w={360} shadow="xl" radius="md" p="xl" withBorder style={{ margin: "auto" }}>
      <Title order={3} ta="center" mb="md">
        Register
      </Title>

      <form onSubmit={form.onSubmit(async (values) => await register(values))}>
        <Stack gap="md">
          <TextInput
            label="Username"
            placeholder="Your username"
            {...form.getInputProps("username")}
            required
          />

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
            Register
          </Button>

          <Anchor size="sm" ta="center" href="/login" underline="always">
            Already have an account? Login
          </Anchor>
        </Stack>
      </form>
    </Card>
  );
}
