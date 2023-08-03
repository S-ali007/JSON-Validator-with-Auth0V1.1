import React, { useEffect, useState } from "react";
import Button from "./Button";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { abcdef } from "@uiw/codemirror-theme-abcdef";


function MainContent({ heading, extraclasses }) {
  const [inputText, setInputText] = useState("");
  const [isValidJSON, setIsValidJSON] = useState(false);

  const isJSON = (value) => {
    if (typeof value !== "string") {
      return false;
    }
    try {
      JSON.parse(value);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleOnChange = (value) => {
    if (isValidJSON) {
      setInputText(value);
      console.log(value);
    } else {
      setInputText(value);
    }
  };

  const clearText = () => {
    setInputText("");
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    setInputText("love");
    setIsValidJSON(false);
    const file = event.dataTransfer.files[0];
    if (file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        setInputText(fileContent);
        setIsValidJSON(true);
      };
      reader.readAsText(file);
    } else {
      setInputText("");
      setIsValidJSON(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file.type.includes("json")) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      setInputText(fileContent);
      setIsValidJSON(isJSON(fileContent));
    };

    reader.readAsText(file);
  };

  const uploadFile = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";
    fileInput.addEventListener("change", handleFileUpload);
    fileInput.click();
  };

  return (
    <>
      <div
        className="Container mt-[35px] flex justify-center w-full max-w-[1440px]"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleFileDrop}
      >
        <div className="relative mb-3 w-full ">   
          <CodeMirror
            padding="4px"
            border="1px"
            height="500px"
            extensions={[langs.json()]}
            onChange={handleOnChange}
            placeholder='{"Format json ":"like this"}'
            value={inputText}
            theme={abcdef}
            options={{
              keyMap: "sublime",
              readOnly: true,
            }}
          />

          <div className="mt-[2px] flex justify-between">
            <Button extraclasses='w-[160px]' text="Clear" handleclick={clearText} />
            <Button
              text="Submit"
              extraclasses='w-[160px]'
              handleclick={() => setIsValidJSON(isJSON(inputText))}
            />
          </div>
        </div>

        <div className="max-w-[50%] w-full">
          <h1 className="text-[24px] font-Anton flex justify-center font-bold">
            Validation Message
          </h1>
          {isValidJSON  ? (
            <p className="text-green-500 flex items-center justify-center">
              Valid JSON
            </p>
          )  : (
            <p className="text-red-500 flex items-center justify-center">
              Not a valid JSON
            </p>
          )}
          <div className="flex items-end justify-center py-5">
            <Button
              extraclasses='w-[170px] '
              text="Upload JSON File "
              className={extraclasses + "bg-red-500"}
              handleclick={uploadFile}
            />
          </div>
          <div className="justify-center flex font-bold items-center gap-3">
            <h1>DRAG AND DROP</h1>
            <br />
            <i className="fa fa-arrows-alt  text-[36px]"></i>
          </div>
           
        </div>
      </div>
    </>
  );
}

export default MainContent;

// import React, { useState } from "react";
// import Button from "./Button";
// import CodeMirror from "@uiw/react-codemirror";
// import { langs } from "@uiw/codemirror-extensions-langs";
// import { abcdef } from "@uiw/codemirror-theme-abcdef";

// function MainContent({ heading, extraclasses }) {
//   const [inputText, setInputText] = useState("");
//   const [isValidJSON, setIsValidJSON] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);

//   const isJSON = (value) => {
//     if (typeof value !== "string") {
//       return false;
//     }
//     try {
//       JSON.parse(value);
//       return true;
//     } catch (error) {
//       return false;
//     }
//   };

//   const handleOnChange = (value) => {
//     if (isValidJSON) {
//       setInputText(value);
//       console.log(value);
//     }else{
//       setInputText("Invalid File Format")
//     }
//   };

//   const clearText = () => {
//     setInputText("");
//   };

//   const handleValidFileDrop = (fileContent) => {
//     setInputText(fileContent);
//     setIsValidJSON(true);
//   };

//   const handleInvalidFileDrop = () => {
//     console.log("Invalid file type. Only JSON files are allowed.");
//     setInputText("");
//     setIsValidJSON(false);
//   };

//   const handleFileDrop = (event) => {
//     event.preventDefault();
//     const file = event.dataTransfer.files[0];
//     if (file.type === "application/json") {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const fileContent = e.target.result;
//         handleValidFileDrop(fileContent);
//       };
//       reader.readAsText(file);
//     } else {
//       handleInvalidFileDrop();
//     }
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file.type.includes("json")) {
//       return;
//     }
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const fileContent = e.target.result;
//       handleValidFileDrop(fileContent);
//     };

//     reader.readAsText(file);
//   };

//   const uploadFile = () => {
//     const fileInput = document.createElement("input");
//     fileInput.type = "file";
//     fileInput.accept = ".json";
//     fileInput.addEventListener("change", handleFileUpload);
//     fileInput.click();
//   };

//   return (
//     <>
//       <div
//         className={`Container mt-[35px] flex justify-center ${
//           isDragging ? "drag-over" : ""
//         } ${isValidJSON ? "" : "invalid-file"}`}
//         onDrop={handleFileDrop}
//         onDragOver={(event) => {
//           event.preventDefault();
//           setIsDragging(true);
//         }}
//         onDragLeave={() => setIsDragging(false)}
//       >
//         <div className="relative mb-3 w-1/2">
//           <CodeMirror
//             padding="4px"
//             border="1px"
//             width="100%"
//             height="500px"
//             extensions={[langs.json()]}
//             onChange={handleOnChange}
//             placeholder='{"Format json ":"like this"}'
//             value={inputText}
//             theme={abcdef}
//             options={{
//               keyMap: "sublime",
//               readOnly: true,
//             }}
//           />

//           <div className="mt-[2px] flex justify-between">
//             <Button text="Clear" handleclick={clearText} />
//             <Button
//               text="Submit"
//               handleclick={() => setIsValidJSON(isJSON(inputText))}
//             />
//           </div>
//         </div>

//         <div className="max-w-[50%] w-full">
//           <h1 className="text-[24px] font-Anton flex justify-center font-bold">
//             Validation Message
//           </h1>
//           <h1>My state {inputText}</h1>
//           {isValidJSON ? (
//             <p className="text-green-500 flex items-center justify-center">
//               Valid JSON
//             </p>
//           ) : (
//             <p className="text-red-500 flex items-center justify-center">
//               Not a valid JSON
//             </p>
//           )}
//           <div className="flex items-end justify-center">
//             <Button
//               text="Upload JSON File "
//               className={extraclasses + "bg-red-500"}
//               handleclick={uploadFile}
//             />
//           </div>
//           <div className="justify-center flex font-bold items-center gap-3">
//             <h1>DRAG AND DROP</h1>
//             <br />
//             <i className="fa fa-arrows-alt  text-[36px]"></i>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default MainContent;

// import React, { useState } from "react";
// import Button from "./Button";
// import CodeMirror from "@uiw/react-codemirror";
// import { langs } from "@uiw/codemirror-extensions-langs";
// import { abcdef } from "@uiw/codemirror-theme-abcdef";

// function MainContent({ heading, extraclasses }) {
//   const [inputText, setInputText] = useState("");
//   const [isValidJSON, setIsValidJSON] = useState(false);

//   const isJSON = (value) => {
//     if (typeof value !== "string") {
//       return false;
//     }
//     try {
//       JSON.parse(value);
//       return true;
//     } catch (error) {
//       return false;
//     }
//   };

//   const handleOnChange = (value) => {
//         if (isValidJSON) {
//           setInputText(value);
//           console.log(value);
//         }
//         else{
//           setInputText("invalid")
//         }
//       };

//   const clearText = () => {
//     setInputText("");
//   };

//   const handleFileDrop = (event) => {
//     event.preventDefault();
//     setInputText("love")
//     setIsValidJSON(false)
//     const file = event.dataTransfer.files[0];
//     if (file.type === "application/json") {
//       console.log("hey im li")
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const fileContent = e.target.result;
//         setInputText(fileContent);
//         setIsValidJSON(true);
//       };
//       reader.readAsText(file);
//     }
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file.type.includes("json")) {
//       return;
//     }
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const fileContent = e.target.result;
//       setInputText(fileContent);
//       setIsValidJSON(isJSON(fileContent));
//     };

//     reader.readAsText(file);
//   };

//   const uploadFile = () => {
//     const fileInput = document.createElement("input");
//     fileInput.type = "file";
//     fileInput.accept = ".json";
//     fileInput.addEventListener("change", handleFileUpload);
//     fileInput.click();
//   };

//   return (
//     <>
//       <div
//         className="Container mt-[35px] flex justify-center"
//         onDrop={handleFileDrop}
//         onDragOver={(event) => {
//           event.preventDefault();
//         }}
//       >
//         <div className="relative mb-3 w-1/2">
//           <CodeMirror
//             padding="4px"
//             border="1px"
//             width="100%"
//             height="500px"
//             extensions={[langs.json()]}
//             onChange={handleOnChange}
//             placeholder='{"Format json ":"like this"}'
//             value={inputText}
//             theme={abcdef}
//             options={{
//               keyMap: "sublime",
//               readOnly: true,
//             }}
//           />

//           <div className="mt-[2px] flex justify-between">
//             <Button text="Clear" handleclick={clearText} />
//             <Button
//               text="Submit"
//               handleclick={() => setIsValidJSON(isJSON(inputText))}
//             />
//           </div>
//         </div>

//         <div className="max-w-[50%] w-full">
//           <h1 className="text-[24px] font-Anton flex justify-center font-bold">
//             Validation Message
//           </h1>
//           <h1 >My state {inputText}</h1>
//           {isValidJSON ? (
//             <p className="text-green-500 flex items-center justify-center">
//               Valid JSON
//             </p>
//           ) : (
//             <p className="text-red-500 flex items-center justify-center">
//               Not a valid JSON
//             </p>
//           )}
//           <div className="flex items-end justify-center">
//             <Button
//               text="Upload JSON File "
//               className={extraclasses + "bg-red-500"}
//               handleclick={uploadFile}
//             />
//           </div>
//           <div className="justify-center flex font-bold items-center gap-3">
//             <h1>DRAG AND DROP</h1>
//             <br />
//             <i className="fa fa-arrows-alt  text-[36px]"></i>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default MainContent;
