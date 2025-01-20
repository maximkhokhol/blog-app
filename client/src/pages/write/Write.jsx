import { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { Context } from '../../context/Context';
import './write.css';

export default function Write() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const textareaRef = useRef(null);
  const [content, setContent] = useState('');

  const handleInput = (e) => {
    setContent(e.target.value);

    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      newPost.photo = filename;
      try {
        await axios.post('/api/upload', data);
      } catch (err) {
        console.error(err);
      }
    }
    try {
      const res = await axios.post('/api/posts', newPost);
      window.location.replace('/post/' + res.data._id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="write">
      {file && (
        <img
          width={'100%'}
          height={'250'}
          className="writeImg"
          src={URL.createObjectURL(file)}
          alt="Preview"
        />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            autoFocus={true}
            ref={textareaRef}
            value={content}
            onInput={handleInput}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
