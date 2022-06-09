import React from "react";
import "./otherstyle.css";
import ReactDOM from "react-dom";

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
            <h1>Other</h1>
            <p>
                This is the other page.
            </p>
        </div>
    );}
ReactDOM.render(<Other />, document.getElementById("root"));