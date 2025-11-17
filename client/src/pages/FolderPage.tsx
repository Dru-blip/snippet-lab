import { useParams } from "react-router";
import { useFolder } from "../lib/queries/folder";
import { Button, Card, Modal, Stack, TextInput } from "@mantine/core";
import { useCreateSnippet, useSnippets } from "../lib/queries/snippets";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import type { Snippet } from "../types";

export default function FolderPage() {
  const { folderId } = useParams();
  const { data: folder, isLoading, error } = useFolder(folderId as string);
  const { data: snippets } = useSnippets(folderId as string);
  const [opened, { open, close }] = useDisclosure(false);
  const [snippetName, setSnippetName] = useState("");
  const [snippetDescription, setSnippetDescription] = useState("");
  const {
    mutate,
    isError,
    isPending: pending,
  } = useCreateSnippet(folder?.data?.id as string, close);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  function handleCreateSnippet() {
    mutate({
      folderId: folder?.data?.id as string,
      name: snippetName,
      description: snippetDescription,
    } as Snippet);
  }

  return (
    <>
      <div>
        <Button onClick={open} leftSection={"+"}>
          New snippet
        </Button>
        {snippets?.data.map((snippet) => (
          <Card key={snippet.id}>
            <Card.Section>{snippet.name}</Card.Section>
          </Card>
        ))}
      </div>
      <Modal opened={opened} onClose={close} centered title="Create new Snippet">
        <Stack>
          <TextInput
            label="Name"
            placeholder="enter name"
            required
            onChange={(e) => {
              setSnippetName(e.target.value);
            }}
          />
          <TextInput
            label="Description"
            placeholder="enter description"
            onChange={(e) => {
              setSnippetDescription(e.target.value);
            }}
          />
          <Button loading={pending} fullWidth onClick={handleCreateSnippet}>
            Create Snippet
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
