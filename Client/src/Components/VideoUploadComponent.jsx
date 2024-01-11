import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const VideoUploadComponent = () => {
  
  const [file, setFile] = useState({
    video: "",
    subtitle: ""
  });

  const [title, setTitle] = useState("")
  const [load, setLoad] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e, fileType) => {
    setFile({
      ...file,
      [fileType]: e.target.files[0]
    });
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('video', file.video);
    formData.append('subtitle', file.subtitle);
    formData.append('Title', title);

    try {
      setLoad(!load)
      const res = await axios.post("http://localhost:3000/api/v1/video", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      const data = res.data
      alert('Success')

      if (res.status === 201) {
        navigate("/videos")
      }
      console.log(data);
      setLoad(false)

    } catch (error) {
      console.log('Unable to Upload Video', error);
      alert('Unable to Upload Video')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" id='title' name="Title" value={title} onChange={handleTitleChange} placeholder='Add Title' />

        <label htmlFor="video">Video File:</label>
        <input type="file" id='video' onChange={(e) => handleFileChange(e, 'video')} placeholder='Add Video File' />

        <label htmlFor="subtitle">Subtitle File:</label>
        <input type="file" id='subtitle' onChange={(e) => handleFileChange(e, 'subtitle')} placeholder='Add Subtitle File' />

        <button type="submit">{load ? "Uploading..." : "Upload"}</button>
      </form>
    </>
  )
}

export default VideoUploadComponent
