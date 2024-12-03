'use client'

import Image from "next/image";
import { useState } from "react";

export default function FeaturedImageGallery({ images }) {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div className="max-w-5xl mx-auto p-4">
            {/* Featured Image */}
            <div className="aspect-w-16 aspect-h-9 mb-4">
                <Image
                    src={selectedImage}
                    alt="Featured"
                    width={1000}
                    height={700}
                    className="w-[1000px] h-[700px] object-cover rounded-lg shadow-lg"
                    unoptimized
                />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={`shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 ${
                            selectedImage === image
                                ? "border-blue-500"
                                : "border-gray-300"
                        }`}
                    >
                        <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
