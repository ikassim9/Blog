// src/Tiptap.tsx
import { useEditor, EditorContent, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./MenuBar";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import { forwardRef, Ref, useImperativeHandle, useRef } from "react";
 

// define your extension array
const extensions = [StarterKit];

type TextEditorRef = {
  getHTML: () => string; // Exposes a method to get plain text
 };

 type TextEditorProps= {
 content: string,
 editable: boolean

 };


const TextEditor = forwardRef<TextEditorRef, TextEditorProps>(({content, editable}, ref) => {

  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable,
    editorProps: {
      attributes: {
        class:
          "border border-gray-400 p-4 min-h-[12rem] max-h-[12rem] overflow-auto outline-none; list-disc;",
      },
    },
  });

  // done to expose this method to parent component, without it cant use getHtml to access editor text
   useImperativeHandle(ref, () => ({
    getHTML: () => editor?.getHTML() || "" // Safely get plain text content
   }));

  return (
    <>
      <div className="container mx-auto max-w-4x1 my-8 outline-none">
        {editable && <MenuBar editor={editor}/>}
        <EditorContent editor={editor} />
      </div>
    </>
  );
});

export default TextEditor;
