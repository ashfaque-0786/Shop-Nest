"use client";
import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';

const uploadFile = () => {
 
 const handleFileUpload = (e) =>{
    const file = e.target.files[0];
    if(!file) toast.error("no file selected");
    const formData = new FormData();
    formData.append("file",file);
    formData.append("upload_preset","e-commerce");
    formData.append("cloud_name","dcp3ua80u");

    axios.post("https://api.cloudinary.com/v1_1/dcp3ua80u/image/upload",formData)
    .then((result) => {
        toast.success("File Upload Successfully")
    }).catch((err) => {
        toast.error("File Upload Failed ")
    });
 }
    
    return (
   <input type="file" onChange={handleFileUpload}/>
  )
}

export default uploadFile;