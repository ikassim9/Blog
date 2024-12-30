// src/Tiptap.tsx
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./MenuBar";
import { forwardRef, useImperativeHandle } from "react";
 

// define your extension array
const extensions = [StarterKit];
 
type TextEditorRef = {
  getHTML: () => string; // Exposes a method to get plain text
  setHTML: (content : string) => void;
}

 type TextEditorProps= {
 content: string 
 editable: boolean,
 mode?: string,

 };


const TextEditor = forwardRef<TextEditorRef, TextEditorProps>(({content, editable ,mode =""}, ref) => {
   const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editable,
    editorProps: {
      attributes: {
        class: editable ? "border border-gray-400 p-4 min-h-[12rem] outline-none; list-disc;" : 
        mode === 'brief' ? "line-clamp-2 text-clip" : "",
      },
    },
  });

  // done to expose this method to parent component, without it cant use getHtml to access editor text
   useImperativeHandle(ref, () => ({
    getHTML: () => editor?.getHTML() || "", // Safely get plain text content
    setHTML: (content: string) => editor?.commands.setContent(content)
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
