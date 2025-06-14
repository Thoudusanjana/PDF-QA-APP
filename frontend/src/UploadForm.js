import React, { useState } from 'react';
import axios from 'axios';

// UploadForm receives setDocId function from parent to store the uploaded doc ID
function UploadForm({ setDocId }) {
  const [file, setFile] = useState(null);  // Local state to store selected file

  // Handles uploading the file to the backend
  const handleUpload = async () => {
    if (!file) return alert("Please choose a PDF file!");

    const formData = new FormData();  // Use FormData for file uploads
    formData.append('file', file);    // Append the file to the form data

    try {
      const res = await axios.post('http://localhost:8000/upload', formData);  // Send to FastAPI
      alert("Upload successful!");

      // Store the document ID returned from backend in parent component
      setDocId(res.data.document_id);  // NOTE: Make sure your backend returns `document_id`
    } catch (err) {
      alert("Upload failed.");
      console.error(err);
    }
  };

  return (
    <div>
      {/* File selection input */}
      <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} />

      {/* Button to trigger upload */}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadForm;
