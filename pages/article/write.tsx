import React, { useState } from "react";
import { Header, SVG, SvgFooter, Footer, Editable } from "../../components";

//const Editable = dynamic(() => import("../../components/editable"))

const Article = () => {
  const [value, setValue] = useState<String>("");
  const getValue = (value: String) => {
    setValue(value);
  };
  return (
    <main className="">
      <Header />
      <SVG />
      <article className="max-w-3xl mx-auto p-5 text-black">
        <Editable />{" "}
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
