import React from "react";
import { BsGithub, BsTwitter, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="">
      <div className="background text-center">
        <p>
          © 2022 ASCII Amrita Vishwa Vidyapeetham, Coimbatore. All Rights
          Reserved.
        </p>
        <br/>
        <p className="pb-10">
          Found a bug?🐞
          Feel free to open an issue or contribute <a style={{color: 'blue', textDecoration:'underline'}} href="https://github.com/MinatoNamikaze02/ASCII-web-newsletter/issues">here</a>
        </p>
      </div>
      {/* {      <span>
        <BsGithub className=""/>
        <BsTwitter className=""/>
        <BsInstagram className=""/>
      </span>} */}
    </div>
  );
};

export default Footer;
