import React, { useState } from "react";
import { Header, SVG, SvgFooter, Footer /*Editable*/ } from "../../components";
import Editor from "../../components/editor";

//const Editable = dynamic(() => import("../../components/editable"))

const Article = () => {
  const [value, setValue] = useState<String>("");
  const [dummy, setDummy] = useState<
    React.Dispatch<React.SetStateAction<string>>
  >(() => {});
  const getValue = (value: String) => {
    setValue(value);
  };
  return (
    <main className="">
      <Header check="Y" />
      <SVG />
      <article className="max-w-3xl mx-auto p-5 text-black">
        <Editor
          description="The night is dark and full of terrors. The winds of Winter. What is dead may never die. And now his watch is ended. The battle of the redgrass field. Unbowed, Unbent, Unbroken. All men must die."
          setDescription={dummy}
        />
        {/*<Editable />" "*/}
        {/*<div>
          <input multiple type="file"  onChange={onImageChange} />
          {image ?
          (
            image.map((img, index) => {
                return (
                    <img key={index} src={String(img)} alt="img" />
                )
            })
          ):
          null
          }
        </div>*/}
      </article>
      <SvgFooter />
      <Footer />
    </main>
  );
};

export default Article;
