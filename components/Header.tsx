import Link from "next/link";
import React, { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import {useRouter} from "next/router";

interface Props {
  check: String
}

function Header(props: Props) {

  const [light, setLight] = useState(true);
  const router = useRouter();
  return (
    <nav className= { props.check === "Y" ? "pt-3 pl-3 pr-3 background" : "pt-3 pl-3 pr-3 background pb-13"}>
      <div className="mt-10 container flex flex-wrap justify-between items-center mx-auto">
        <Link href={"/"}>ASCII Web</Link>
        <button>
          <BsPencilSquare onClick={() => {
            router.push('/article/write')
          }} className="text-xl" />
        </button>
      </div>
    </nav>
  );
}

export default Header;
