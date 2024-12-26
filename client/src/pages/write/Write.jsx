import { useState, useRef } from "react";
import "./write.css";

export default function Write() {

    const textareaRef = useRef(null);
    const [content, setContent] = useState("");
  
    const handleInput = (e) => {
      setContent(e.target.value);
  
      const textarea = textareaRef.current;
      textarea.style.height = "auto"; 
      textarea.style.height = textarea.scrollHeight + "px"; 
    };

    
  return (
    <div className="write">
      <img
        className="writeImg"
        src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      <form className="writeForm">
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            ref={textareaRef}
            value={content}
            onInput={handleInput}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}