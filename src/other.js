import React from "react";
import "./otherstyle.css";
import ReactDOMClient from "react-dom/client";
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
          
          {/* <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1> */}

            <h1>Other</h1>
            <p>
                This is the other page.
            </p>
        </div>
    );}
    const root=ReactDOMClient.createRoot(document.getElementById("root1"));
root.render(<Other />);