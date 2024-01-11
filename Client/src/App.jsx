import React from 'react'
import VideoUploadComponent from './Components/VideoUploadComponent'
import Videos from './Components/Videos'
import { Route, Routes } from 'react-router-dom'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<VideoUploadComponent />} />
        <Route path='/videos' element={<Videos />} />
      </Routes>


    </div>
  )
}

export default App
