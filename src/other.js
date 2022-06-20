import React from "react";
import "./otherstyle.css";
import "tailwindcss/tailwind.css"
import ReactDOMClient from "react-dom/client";
import xi from "./下载.jpeg";
// import "../dist/output.css"

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
const Other = () => {    
    return (
        <div className="test">
          <img src={xi} />
          <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
 
            <h1>Other</h1>
            <p>
                This is the other page. 文件监听已启动1ß，热更新
            </p>
        </div>
    );}
    const root=ReactDOMClient.createRoot(document.getElementById("root1"));
root.render(<Other />);