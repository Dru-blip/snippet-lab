import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Folder } from "../../types";

type FolderResponse = {
  data: Folder[];
  err?: { message: string };
};

type GetFolderResponse = {
  data: Folder;
  err?: { message: string };
};

async function fetchFolders() {
  const response = await fetch(import.meta.env.VITE_API_URL + "/folders", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  return (await response.json()) as FolderResponse;
}

export const useFolders = () =>
  useQuery({
    queryKey: ["Folders"],
    queryFn: fetchFolders,
    enabled: true,
  });

async function fetchFolder(id: string) {
  const response = await fetch(import.meta.env.VITE_API_URL + `/folders/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  return (await response.json()) as GetFolderResponse;
}

export const useFolder = (id: string) =>
  useQuery({
    queryKey: ["Folder", id],
    queryFn: () => fetchFolder(id),
    enabled: true,
  });

async function createFolder(folder: Folder) {
  const response = await fetch(import.meta.env.VITE_API_URL + "/folders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(folder),
  });
  return (await response.json()) as FolderResponse;
}

export const useCreateFolder = (onSuccess?: () => void) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["Folders"] });
      onSuccess?.();
    },
  });
};
