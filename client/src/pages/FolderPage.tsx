import { useParams } from "react-router";
import { useFolder } from "../lib/queries/folder";

export default function FolderPage() {
  const { folderId } = useParams();
  const { data, isLoading, error } = useFolder(folderId as string);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }
  return (
    <div>
      <h1>Folder {folderId}</h1>
      <h1>{data?.data.name}</h1>
    </div>
  );
}
