import dynamic from "next/dynamic";
import axios from "axios";
const JoditReact = dynamic(() => import("jodit-react"), { ssr: false });

//import JoditEditor from "jodit-react";

import React, { memo, useRef } from "react";
import "jodit/build/jodit.min.css";

export interface IEditorProps {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const Editor = ({ description, setDescription }: IEditorProps) => {
  const [name, setName] = React.useState("");
  const [roll, setRoll] = React.useState("");
  const [content, setContent] = React.useState("");
  const ref = useRef(null);
  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const finalName = name
    const finalRoll = roll
    const finalContent = content.replace(/(<([^>]+)>)/ig,"")
    if(finalName.length == 0){
      alert("Name is not valid")
      window.location.reload()
      return
    }
    if(finalRoll.length != 16){
      alert("Roll number is not valid")
      window.location.reload()
      return
    }
    if(finalContent.length == 0){
      alert("Content is not valid")
      window.location.reload()
      return
    }
    axios.post('http://localhost:3001/api/article', {
      name: finalName,
      rollno: finalRoll,
      article: finalContent
    })
    .then(res => {
      console.log(res)
      alert('Article Added')
      window.location.reload()
    }).catch(err => {
      console.log(err)
      alert('Error')
    })
  };

  return (
    <div className="App">
      <h1 className="text-center text-xl mb-20">
        Write To Us about anything and everything! 👽
      </h1>
      <div className="pt-2 pb-2">
        <label className="font-xl">Name (as in Teams): </label>
        <input
          onChange={(e) => setName(e.target.value)}
          minLength={1}
          maxLength={64}
          required
          className="mt-1 mb-1 p-0.5 w-full border-solid border-2 border-black rounded-lg"
          type="text"
          id="fname"
          name="fname"
        />
   
      </div>
      <div className="pt-2 pb-2 mb-5">
        <label>Roll Number: </label>
        <input
          onChange={(e) => {setRoll(e.target.value)}}
          maxLength={16}
          minLength={16}
          required
          className="mt-1 mb-1 p-0.5 w-full border-solid border-2 border-black rounded-lg"
          type="text"
          id="lname"
          name="lname"
        />
      </div>
      <JoditReact
        value={content}
        onChange={(current) => {
          setContent(current);
        }}
      />
      <div className="text-center">
        <button onClick={handleSubmit} className="button-submit mt-10">
          Submit
        </button>
      </div>
      <h1 className="text-center mt-10">
        Worthy Articles will be published! 🙋
      </h1>
    </div>
  );
};

export default memo(Editor);
