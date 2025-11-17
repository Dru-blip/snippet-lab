export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  folders: Folder[];
  snippets: Snippet[];
}

export interface Folder {
  id: string;
  name: string;
  color: string;
  parentFolderId?: string | null;
  parent?: Folder | null;
  folders: Folder[];
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  snippets: Snippet[];
}

export interface Snippet {
  id: string;
  name: string;
  description?: string | null;
  userId: string;
  user: User;
  folderId?: string | null;
  folder?: Folder | null;
  createdAt: Date;
  updatedAt: Date;
}
