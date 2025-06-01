'use client'
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const ImageUploadButton = ({ onImageUpload }) => {
    const [previews, setPreviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const uploadImage = async (file) => {
        const fd = new FormData();
        fd.append('file', file);
        fd.append('upload_preset', 'e-commerce');
        fd.append('cloud_name', 'dcp3ua80u');

        try {
            setLoading(true);
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/dcp3ua80u/image/upload',
                fd
            );
            const imageUrl = response.data.url;
            setPreviews(prev => [...prev, imageUrl]);
            onImageUpload(imageUrl);
            toast.success('Image uploaded successfully');
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload image');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        for (const file of files) {
            if (!file.type.startsWith('image/')) {
                toast.error('Please upload only image files');
                continue;
            }
            await uploadImage(file);
        }
    };

    const removeImage = (index) => {
        setPreviews(prev => prev.filter((_, i) => i !== index));
        // Also notify parent component about removal if needed
    };

    return (
        <div className="sm:col-span-9">
            <div className="space-y-4">
                {/* Upload Button */}
                <div className="flex items-center gap-4">
                    <label className="relative cursor-pointer">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <div className="px-4 py-2 text-sm text-blue-600 border-2 border-blue-600 border-dashed rounded-lg hover:bg-blue-50 transition-colors">
                            {loading ? 'Uploading...' : 'Click to upload images'}
                        </div>
                    </label>
                    <span className="text-sm text-gray-500">
                        Supports: JPG, PNG, JPEG (max 5MB each)
                    </span>
                </div>

                {/* Image Previews */}
                {previews.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                        {previews.map((preview, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={preview}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                                />
                                <button
                                    onClick={() => removeImage(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUploadButton;