import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";


const uploadImage = async (imageFile) => {
    const formData = new FormData();
    // Append the image file to the form data
    formData.append("image", imageFile);

    try {
        // Make a POST request to the image upload endpoint
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        // Return the image URL from the response
        console.log("Image uploaded successfully:", response.data);
        // Assuming the response contains the image URL in a field named 'imageurl'
        return response.data;
    }
    catch (error) {
        console.error("Error uploading image:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}

export default uploadImage