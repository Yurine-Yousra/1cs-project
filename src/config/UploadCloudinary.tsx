const uploadFileToCloudinary = async (file: string | Blob, resourceType = "auto") => {
    const cloudName = "do9hwrjqh"; // Your Cloudinary Cloud Name
    const uploadPreset = "CCNAAPP"; // Your upload preset
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
  
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      const data = await response.json();
      return data.secure_url; // Returns uploaded file URL
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };
  
  export default uploadFileToCloudinary;
  