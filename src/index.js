import React from "react";
import ReactDOM from "react-dom";
import "./indexstyle.css"
import { useState } from "react";

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
            <p>
                This is the indexdemo page.
                test hotUpdate : {count}
            </p>
        </div>
    );}
ReactDOM.render(<Indexdemo />, document.getElementById("root1"));