import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

import React, { memo, useRef } from "react";
import "jodit/build/jodit.min.css";

export interface IEditorProps {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const Editor = ({ description, setDescription }: IEditorProps) => {
  const editor = useRef(null);
  const config = {
    enableDragAndDropFileToEditor: true,
    uploader: {
      insertImageAsBase64URI: true,
    },
    link: {
      openInNewTabCheckbox: true,
    },
    language: "en",
    placeholder: "Write your article here...",
    readonly: false,
  };

  return (
    <div className="App">
      <h1 className="text-center text-xl mb-20">
        Write To Us about anything and everything! 👽
      </h1>
      <JoditEditor
        config={config}
        value={description}
        onBlur={(newContent) => setDescription(newContent)}
        onChange={(newContent) => {}}
      />
      <h1 className="text-center mt-20">
        Worthy Articles will be published! 🙋
      </h1>
    </div>
  );
};

export default memo(Editor);
