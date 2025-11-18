import { Outlet, useParams } from "react-router";
import { useFolder } from "../lib/queries/folder";
import { useCreateSnippet, useSnippets } from "../lib/queries/snippets";
import { useState, useRef, useEffect } from "react";
import type { Snippet } from "../types";

export default function FolderPage() {
  const { folderId } = useParams();
  const { data: folder, isLoading, error } = useFolder(folderId as string);
  const { data: snippets } = useSnippets(folderId as string);
  const [opened, setOpened] = useState(false);
  const [snippetName, setSnippetName] = useState("");
  const [snippetDescription, setSnippetDescription] = useState("");
  const {
    mutate,
    isError,
    isPending: pending,
  } = useCreateSnippet(folder?.data?.id as string, () => {
    setOpened(false);
  });

  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (opened) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [opened]);

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
      <div className="grid grid-cols-2">
        <div className="w-1/3">
          <div className="flex items-center border">
            <p>{folder?.data.name}</p>
            <button
              className="btn btn-circle btn-ghost flex items-center justify-center"
              onClick={() => setOpened(true)}
            >
              +
            </button>
            <button className="btn btn-circle btn-ghost flex items-center justify-center">
              del
            </button>
          </div>
          <div className="grid gap-4 grid-cols-1">
            {snippets?.data.map((snippet) => (
              <div key={snippet.id} className="bg-base-100 w-full shadow-md p-2">
                <h2 className="card-title">{snippet.name}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
      <dialog ref={modalRef} className="modal" onCancel={() => setOpened(false)}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create new Snippet</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateSnippet();
            }}
            className="py-4 flex flex-col gap-4"
          >
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input
                type="text"
                placeholder="enter name"
                className="input input-bordered w-full"
                value={snippetName}
                onChange={(e) => {
                  setSnippetName(e.target.value);
                }}
                required
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <input
                type="text"
                placeholder="enter description"
                className="input input-bordered w-full"
                value={snippetDescription}
                onChange={(e) => {
                  setSnippetDescription(e.target.value);
                }}
              />
            </label>
            <button type="submit" className="btn btn-primary w-full" disabled={pending}>
              {pending ? "Creating..." : "Create Snippet"}
            </button>
          </form>
          <div className="modal-action">
            <button className="btn" onClick={() => setOpened(false)}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
