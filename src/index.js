import React from "react";
import ReactDOMClient from "react-dom/client";
import "./indexstyle.css"
import { useState } from "react";
// import logo from "./images/logo.png";

// class Other extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>Other</h1>
//         <p>
//           This is the other page.
//         </p>
//       </div>
//     );
//   }
// }
const Indexdemo = () => {   // 函数组件 
    const [count, setCount] = useState(0);
    return (
        <div className="indextest">
            <h1>index</h1>
            {/* <img src={logo}/> */}
            <p>
                This is the indexdemo page.
                test hotUpdate : {count}
            </p>
        </div>
    );}
    const root=ReactDOMClient.createRoot(document.getElementById("root"));
    root.render(<Indexdemo />);