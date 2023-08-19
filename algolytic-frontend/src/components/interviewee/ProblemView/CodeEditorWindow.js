import React, { useState,useEffect } from "react";

import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  useEffect(()=>{


setValue(code)
  },[code])

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl" style={{marginTop:"10px"}}>
      <Editor
        height="calc(50vh - 80px)"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={theme}
        
        defaultValue={value}
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;