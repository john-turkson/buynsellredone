"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { editListingSchema } from "@/utils/yup-schemas";
import { useSession } from "next-auth/react";
import axios from "axios";
import FormField from "@/components/application/FormField";
import TextArea from "@/components/application/TextArea";
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import { extractListingPath, checkArrayType, isValidUrl, deleteImageFromCloudinary } from "@/utils/helper-functions";

export default function EditListingForm({ id, listing }) {

    const { addToast } = useToast();
    const { data: session } = useSession()
    const router = useRouter();

    const [files, setFiles] = useState([]);
    const [removedFiles, setRemovedFiles] = useState([]);

    useEffect(() => {
        if (listing?.images?.length) {
            setFiles(listing.images.map(url => ({ url, isPreloaded: true })));
            formik.setFieldValue("images", listing.images);
        }
    }, [listing?.images]);


    // Upload Images to Cloudinary
    const uploadImages = async (files) => {
        // Convert FileList to Array
        const fileArray = Array.isArray(files) ? files : Array.from(files);

        // Upload images to Cloudinary and get secure URLs
        const uploadPromises = fileArray.map(async (image) => {
            const imageFormData = new FormData();
            imageFormData.append("file", image);
            imageFormData.append("upload_preset", process.env.NEXT_PUBLIC_LISTING_UPLOAD_PRESET); // replace with your Cloudinary unsigned preset
            imageFormData.append("folder", `Users/${session.user.userId}`); // replace with the desired Cloudinary directory
            imageFormData.append("public_id", `listing_${image.name}`); // use custom name or default to image name

            // Upload the image to Cloudinary and get the secure URL
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL_ENDPOINT, {
                    method: "POST",
                    body: imageFormData,
                });
                const data = await response.json();
                return data.secure_url;
            } catch (error) {
                console.error("Upload failed:", error);
                return null;
            }
        });

        // Return an array of secure URLs or null for failed uploads
        const urls = await Promise.all(uploadPromises);
        console.log(urls);

        // Filter out null values (failed uploads) and return an array of secure URLs
        return urls.filter((url) => url !== null); // filter out failed uploads
    };


    const onSubmit = async (values) => {
        console.log("Form Submitted", values);
        let newFiles = [];
        let newImageUrls = [];
        let listingData;

        if (removedFiles.length > 0) {
            console.log('Files to be removed:', removedFiles);

            // Delete images from Cloudinary
            await Promise.all(
                removedFiles.map(async (imageUrl) => {
                    console.log(imageUrl);
                    const publicId = extractListingPath(imageUrl);
                    console.log(publicId);

                    try {
                        await deleteImageFromCloudinary(publicId);
                    } catch (error) {
                        console.error("Failed to delete image from Cloudinary:", error);
                    }
                })
            );

        }

        // Upload new images to Cloudinary
        // Get all images from values.images that are not URLs
        if (checkArrayType(values.images) === 'Array of objects') {
            const nonUrlImages = values.images.filter(img => !isValidUrl(img.url));

            console.log("Non-URL images:", nonUrlImages);

            // add new images
            newFiles = nonUrlImages;

            console.log("Images to upload:", newFiles);
        }

        // Upload new files
        if (newFiles.length > 0) {
            newImageUrls = await uploadImages(newFiles);
        }

        console.log('New Images:', newImageUrls);


        // Combine existing and new image URLs
        const existingImages = values.images
            .filter(img => isValidUrl(img.url))
            .map(img => img.url);

        console.log('Existing Images:', existingImages);

        const finalImages = [...existingImages, ...newImageUrls];

        console.log('Final Images: ', finalImages);


        if (checkArrayType(values.images) === 'Array of strings') {
            listingData = {
                name: values.name,
                price: values.price,
                description: values.description,
                listingId: listing._id,
                images: values.images,
            };
        } else if (checkArrayType(values.images) === 'Array of objects') {
            listingData = {
                name: values.name,
                price: values.price,
                description: values.description,
                listingId: listing._id,
                images: finalImages,
            };
        }

        console.log('Data => MongoDB', listingData);
        // console.log(removedFiles);


        // Send the listing data to the server
        try {
            const listingUpdate = await axios.post("/api/edit-listing", listingData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (listingUpdate.status === 200) {
                addToast('Listing updated successfully!', 'info');
                closeModal();
                router.refresh();
            } else {
                addToast('Failed to update listing. Please try again later.', 'error');
            }
        } catch (error) {
            console.error('Listing update error:', error);
            addToast('Failed to update listing. Please try again later.', 'error');
        }
    };

    const formik = useFormik({
        initialValues: {
            name: listing.name,
            price: listing.price,
            description: listing.description,
            images: listing.images, // The images field will hold an array of selected files
        },
        validationSchema: editListingSchema, // Add validation schema if necessary
        onSubmit: onSubmit,
    });

    // Handle file change logic when user selects images
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        setFiles((prevFiles) => {
            const updatedFiles = [...prevFiles, ...selectedFiles];
            formik.setFieldValue("images", updatedFiles);
            return updatedFiles;
        });
    };

    // Handle deletion of image
    const handleDelete = async (index) => {
        const fileToDelete = files[index];
        console.log(fileToDelete.url);

        setFiles((prevFiles) => {
            const updatedFiles = prevFiles.filter((_, i) => i !== index);
            formik.setFieldValue("images", updatedFiles);
            return updatedFiles;
        });

        setRemovedFiles((prevItems) => {
            if (prevItems.length === 0) {
                // If array is empty, add the value
                return [fileToDelete.url];
            } else {
                // Otherwise, append the value
                return [...prevItems, fileToDelete.url];
            }
        });

    };





    // Reset the local state when closing the modal
    const closeModal = () => {
        const modal = document.querySelector('[data-hs-overlay="#hs-vertically-centered-modal"]');
        if (modal) {
            modal.click();
        }
    };

    const handleClose = () => {
        // Reset files back to original listing.images
        const resetFiles = listing?.images
            ? listing.images.map(url => ({ url, isPreloaded: true }))
            : [];

        setFiles(resetFiles);
        setRemovedFiles([]);
        formik.setFieldValue("images", resetFiles); // Clear Formik's state and revert to initial images
    };


    return (
        <>
            <div id={id} className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none" role="dialog" tabIndex="-1" aria-labelledby="hs-vertically-centered-modal-label">
                <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
                    <div className="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                        {/* Header */}
                        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                            <h3 id={id} className="font-medium text-gray-800 dark:text-gray-200">
                                Edit Listing
                            </h3>
                            <button type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay={`#${id}`} onClick={handleClose}>
                                <span className="sr-only">Close</span>
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18"></path>
                                    <path d="m6 6 12 12"></path>
                                </svg>
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="p-4 overflow-y-auto max-h-[calc(100vh-7rem)]">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="flex flex-col items-center justify-center gap-y-4">
                                    {/* Name Field */}
                                    <div className="w-full">
                                        <FormField placeholder={"Listing Name"} name={"name"} id={"name"} type="text" touched={formik.touched.name || false} errors={formik.errors.name || ""} value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} validationMessage={formik.errors.name} />
                                    </div>

                                    {/* Price Field */}
                                    <div className="w-full">
                                        <FormField placeholder={"Price"} name={"price"} id={"price"} type="number" touched={formik.touched.price || false} errors={formik.errors.price || ""} value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur} validationMessage={formik.errors.price} />
                                    </div>

                                    {/* Description Field */}
                                    <div className="w-full">
                                        <TextArea placeholder={"Description"} name={"description"} id={"description"} type="text" touched={formik.touched.description || false} errors={formik.errors.description || ""} value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} validationMessage={formik.errors.description} />
                                    </div>

                                    {/* Image Upload Field */}
                                    <div className="w-full">
                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-neutral-600">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (Images only!)</p>
                                                </div>
                                                <input id="dropzone-file" type="file" className="hidden" multiple accept="image/*" onChange={handleFileChange} />
                                            </label>
                                        </div>

                                        {/* Preview Section */}
                                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
                                            {files.map((fileObj, index) => (
                                                <div key={index} className="relative p-2 bg-gray-100 rounded-lg dark:bg-slate-600">
                                                    <img src={fileObj.isPreloaded ? fileObj.url : URL.createObjectURL(fileObj)} alt={fileObj.name} className="w-full h-32 object-cover rounded-lg mb-2" />
                                                    <div className="flex items-center justify-between text-sm mb-1">
                                                        <span className="text-gray-600 dark:text-gray-300 overflow-hidden text-ellipsis whitespace-nowrap">{fileObj.name}</span>
                                                        <button type="button" onClick={() => handleDelete(index)} className="text-red-500 hover:text-red-700">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="mt-4 w-full">
                                        <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:bg-purple-700 disabled:opacity-50 disabled:pointer-events-none">
                                            Edit Listing
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
