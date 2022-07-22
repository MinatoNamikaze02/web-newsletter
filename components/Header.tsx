import Link from "next/link";
import React, { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";

function Header() {
  const [light, setLight] = useState(true);
  return (
    <nav className="pt-3 pl-3 pr-3 background">
      <div className="mt-10 container flex flex-wrap justify-between items-center mx-auto">
        <Link href={"/"}>ASCII Web</Link>
        <button>
          <BsPencilSquare className="text-xl" />
        </button>
      </div>
    </nav>
  );
}

export default Header;
