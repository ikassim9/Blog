import { Editor, EditorContent, useCurrentEditor } from "@tiptap/react";
import { BoldIcon, Italic, List, ListOrdered, Strikethrough } from "lucide-react";

type Props = {
  editor: Editor | null;
};

export const MenuBar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-2 border p-2 border-gray-400 mb-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-gray-400" : ""}
      >
        <BoldIcon className="iconSize" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-gray-400" : ""}
      >
        <Italic className="iconSize" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "bg-gray-400" : ""}
      >
        <Strikethrough className="iconSize" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-gray-400" : ""}
      >
        <ListOrdered className="iconSize" />
      </button>
      <button type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "bg-gray-400" : ""}
      >
        <List className="iconSize" />
      </button>
    </div>
  );
};
