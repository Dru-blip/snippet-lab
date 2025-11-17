import { Button, Flex, Stack, Modal, TextInput, ColorSwatch, CheckIcon } from "@mantine/core";
import { useCreateFolder, useFolders } from "../lib/queries/folder";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import type { Folder } from "../types";
import { Outlet, useNavigate } from "react-router";

const folderColors = ["#3B82F6", "#22C55E", "#FACC15", "#FB923C", "#EF4444", "#A855F7", "#9CA3AF"];

export default function Dashboard() {
  const { data, isPending, error } = useFolders();
  const [opened, { open, close }] = useDisclosure(false);
  const [picked, setPicked] = useState<string>(folderColors[0]);
  const { mutate, isPending: pending } = useCreateFolder(close);
  const navigate = useNavigate();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    alert(error.message);
    return;
  }

  function handleCreateFolder() {
    mutate({ name: "New Folder", color: picked } as Folder);
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        <aside>
          <Flex>
            <span>Folders</span>

            <Button variant="default" onClick={open}>
              +
            </Button>
          </Flex>
          <Flex direction={"column"} gap={4}>
            {data.data.map((folder) => (
              <Button
                key={folder.id}
                variant="light"
                color="gray"
                leftSection={
                  <div
                    style={{
                      borderRadius: "100%",
                      width: "10px",
                      height: "10px",
                      backgroundColor: folder.color,
                    }}
                  />
                }
                onClick={() => {
                  navigate(`/lab/${folder.id}`);
                }}
              >
                {folder.name}
              </Button>
            ))}
          </Flex>
        </aside>
        <div>
          <Outlet />
        </div>
      </div>
      <Modal opened={opened} onClose={close} title="Create New Folder" centered>
        <Stack>
          <TextInput label="Folder name" placeholder="eg. React,Jsx,Compilers" required />
          <div>
            <p>Folder Color</p>
            <Flex align={"center"} justify={"space-evenly"}>
              {folderColors.map((color) => (
                <ColorSwatch
                  component="button"
                  color={color}
                  onClick={() => setPicked(color)}
                  style={{ color: "#fff", cursor: "pointer" }}
                >
                  {picked === color && <CheckIcon size={12} />}
                </ColorSwatch>
              ))}
            </Flex>
          </div>
          <Button loading={pending} fullWidth onClick={handleCreateFolder}>
            Create Folder
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
