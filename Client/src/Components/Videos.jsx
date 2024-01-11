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
            setVideo(prevVideo => prevVideo.filter(video => video.id !== id))
            alert("Deleted Successfully")
        } else {
            alert("Can Not Delete ")
        }

        showVideos();
    }

    const handleNavigation = () => {
        navigate("/")
    }

    const handleRandomChar = (length) => {
        let link = ""
        let str = "ABCDEFHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for(let i=0; i<length; i++) {
            let char = Math.floor(Math.random() * str.length + 1);
            link += str.charAt(char)
        }

        return link
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
                        const randomLink = handleRandomChar(5);
                        const links = `https://${randomLink}.com`
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{Title}</td>
                                <td><a href={video}>{links}</a></td>
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
