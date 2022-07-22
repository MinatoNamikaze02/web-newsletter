import React from "react";
import { BsGithub, BsTwitter, BsInstagram } from "react-icons/bs";

export const Footer = () => {
  return (
    <div className="">
      <div className="background flex align-center justify-center pb-5">
        <p>
          © 2022 ASCII Amrita Vishwa Vidyapeetham, Coimbatore. All Rights
          Reserved.
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
