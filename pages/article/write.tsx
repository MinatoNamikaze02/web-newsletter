import React, { useState } from "react";
import { Header, SVG, SvgFooter, Footer } from "../../components";

const Article = () => {
  const [image, setImage] = useState<String[]>([]);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const files = Array.from(e.target.files);
        files.forEach((file) => {
            const img = URL.createObjectURL(file);
            setImage([...image, img]);
        })
    }
  };
  return (
    <main className="">
      <Header />
      <SVG />
      <article className="max-w-3xl mx-auto p-5 text-black">
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
