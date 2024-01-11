import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Videos = () => {
    const [video, setVideo] = useState([]);
    const navigate = useNavigate();

    const showVideos = async () => {
        try {
            const res = await axios.get("https://video-upload-pvz4.onrender.com/api/v1");
            const data = res.data;
            //   setVideo(data);


            // if (data.data && Array.isArray(data.data)) {
            setVideo(data.data);
            // } else {
            //     console.error('Invalid data structure:', data);
            // }


            console.log('Data received:', video);

        } catch (error) {
            console.log("Unable to Fetch Data", error);
        }
    };

    const handleDeleteVideo = async (id) => {
        const res = await axios.delete(`https://video-upload-pvz4.onrender.com/api/v1/video/${id}`);

        if (res.status === 200) {
            alert("Deleted Successfully")
            setVideo(prevVideo => prevVideo.filter(video => video.id !== id))
        } else {
            alert("Can Not Delete ")
        }
    }

    const handleNavigation = () => {
        navigate("/")
    }

    useEffect(() => {
        showVideos();
    }, []);

    return (
        <div className="table">
            <h1>Videos Data</h1>
            <h1 onClick={handleNavigation}>🏠 🔙 </h1>
            <table>
                <thead>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Video Links</th>
                    <th>Subtitle File</th>
                    <th>Controls</th>
                </thead>
                {
                    video.map((currElem, index) => {
                        const { Title, video, subtitle, _id } = currElem;
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{Title}</td>
                                <td><a href={video}>{video}</a></td>
                                <td><a href={subtitle}>📁</a></td>
                                <td onClick={() => handleDeleteVideo(_id)}>Delete</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    );
};

export default Videos;
