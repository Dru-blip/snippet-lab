import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import { useCreateFolder, useFolders } from "../lib/queries/folder";
import type { Folder } from "../types";

const folderColors = ["#3B82F6", "#22C55E", "#FACC15", "#FB923C", "#EF4444", "#A855F7", "#9CA3AF"];

export default function Dashboard() {
  const { data, isPending, error } = useFolders();
  const [opened, setOpened] = useState(false);
  const [picked, setPicked] = useState<string>(folderColors[0]);
  const { folderId: activeFolderId } = useParams();
  const [folderName, setFolderName] = useState<string>("");
  const { mutate, isPending: pending } = useCreateFolder(() => {
    setOpened(false);
    setFolderName("");
  });
  const navigate = useNavigate();

  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (opened) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [opened]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    alert(error.message);
    return;
  }

  function handleCreateFolder() {
    mutate({ name: folderName, color: picked } as Folder);
  }

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col  bg-base-100">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden mb-4 self-start"
        >
          Open Folders
        </label>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <aside className="menu p-4 w-64 min-h-full bg-base-200 text-base-content flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-semibold">Folders</span>
            <button className="btn btn-sm btn-circle btn-primary" onClick={() => setOpened(true)}>
              +
            </button>
          </div>
          <ul className="flex flex-col gap-2">
            {data.data.map((folder) => (
              <li key={folder.id}>
                <button
                  className={`btn btn-ghost justify-start w-full ${activeFolderId === folder.id ? "btn-active bg-base-300" : ""}`}
                  onClick={() => {
                    navigate(`/lab/${folder.id}`);
                    if (window.innerWidth < 1024) {
                      const drawerToggle = document.getElementById(
                        "my-drawer-2",
                      ) as HTMLInputElement;
                      if (drawerToggle) drawerToggle.checked = false;
                    }
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full shrink-0"
                    style={{ backgroundColor: folder.color }}
                  />
                  <span className="grow text-left">{folder.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <dialog ref={modalRef} className="modal" onCancel={() => setOpened(false)}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create New Folder</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateFolder();
            }}
            className="py-4 flex flex-col gap-4"
          >
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Folder name</span>
              </div>
              <input
                type="text"
                placeholder="eg. React, Jsx, Compilers"
                className="input input-bordered w-full"
                value={folderName}
                onChange={(e) => {
                  setFolderName(e.target.value);
                }}
                required
              />
            </label>
            <div>
              <p className="mb-2">Folder Color</p>
              <div className="flex items-center justify-evenly">
                {folderColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="w-8 h-8 rounded-full border-2 border-transparent flex items-center justify-center transition-all duration-200"
                    style={{
                      backgroundColor: color,
                      borderColor: picked === color ? "white" : "transparent",
                    }}
                    onClick={() => setPicked(color)}
                  >
                    {picked === color && <span className="text-white text-lg">✓</span>}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={pending}>
              {pending ? "Creating..." : "Create Folder"}
            </button>
          </form>
          <div className="modal-action">
            <button className="btn" onClick={() => setOpened(false)}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
