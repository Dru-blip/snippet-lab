import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Snippet } from "../../types";

type SnippetResponse = {
  data: Snippet[];
  err?: { message: string };
};

async function fetchSnippets(folderId: string) {
  const response = await fetch(import.meta.env.VITE_API_URL + `/${folderId}/snippets`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  return (await response.json()) as SnippetResponse;
}

export const useSnippets = (folderId: string) =>
  useQuery({
    queryKey: ["Snippets", folderId],
    queryFn: () => fetchSnippets(folderId),
    enabled: true,
  });

async function createSnippet(folderId: string, snippet: Snippet) {
  const response = await fetch(import.meta.env.VITE_API_URL + `/${folderId}/snippets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(snippet),
  });
  return (await response.json()) as SnippetResponse;
}

export const useCreateSnippet = (folderId: string, onSuccess?: () => void) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (snippet: Snippet) => createSnippet(folderId, snippet),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["Snippets", folderId] });
      onSuccess?.();
    },
  });
};
