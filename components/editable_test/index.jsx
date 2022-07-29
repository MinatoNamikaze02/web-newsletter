import Something from "./SlateEditor/Editor";
import { useState } from "react";
import {BsFillCaretDownFill} from 'react-icons/bs'
function Editable() {
  const [clicked, setClicked] = useState(false)
  const handleClick = (event) => {
    event.preventDefault()
    setClicked(!clicked)
  } 
  return (
    <div className="App">
      <h1 className="text-center text-xl">
        Write To Us about anything and everything! 👽
      </h1>
      {/* <ul onClick={handleClick} className="relative flex align-center justify-center">
        <li style={{color: 'blue', cursor: 'pointer'}}>Instructions</li> <BsFillCaretDownFill className="mt-1"/>
      </ul>
      {
        clicked && (
          <div className="flex justify-center align-center">
            <ul style = {{textDecoration: ''}}>
              <li>
                Add a Title and Subtitle/Description
              </li>
              <li>
                Include your Name and Roll Number.
              </li>
              <li>
                Use Decent Language. Profanity is strictly prohibited.
              </li>
              <li>
                Well structured articles have a higher chance of getting featured!
              </li>
            </ul>
          </div>
        )
      } */}
      <Something />
      {/* <InlineMath math="\int_0^\infty x^2 dx"/> */}
      {/* <BlockMath math="\int_0^\infty x^2 dx"/> */}
      <h1 className="text-center mt-3">
        Worthy Articles will be published! 🙋
      </h1>
    </div>
  );
}

export default Editable;
