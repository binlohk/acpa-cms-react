import React from 'react'

const Video = ({ videoUrl, width, height })=>{
    return (
        <iframe src={videoUrl} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen {... width ? {width} : {}} {... height ? {height} : {}}></iframe>
    )
}

export default Video