import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { useAuth } from "../../context/AuthContext"; // Import useAuth custom hook to get access to the authentication context
import './file.scss'; // Import the styling for this component

// The FileUploadDownload function component handles the file upload and download process
function FileUploadDownload() {
    const [key, setKey] = useState(0);
    const [error, setError] = useState(false);
    // useState hook to manage the state of the file to be uploaded
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState(null);
    // useState hook to manage and display the upload progress percentage
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const [fileUploaded, setFileUploaded] = useState(false);  // State to track if the file has been uploaded
    // Extract the login function from the auth context
    const { logout } = useAuth();

    // handleFileChange updates the file state when a user selects a file
    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Set the selected file to state
        setFileUploaded(false);  // Reset upload status on file change
    };

    // uploadFile is an asynchronous function that handles the file upload
    const uploadFile = async () => {
        if (!file) {
            setError(true);
            setTimeout(()=>setError(false),5000)
            return;
        }
        const formData = new FormData(); // Create a new FormData object to hold the file data
        formData.append('image', file); // Append the file under the key 'image' to the FormData object

        try {
            // Make an HTTP POST request to upload the file
            const response = await axios({
                method: 'post',
                url: '/api/file/upload', // API endpoint for file upload
                data: formData, // Data payload is the FormData with the file
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    // Calculate and update the upload progress
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadPercentage(percentCompleted); // Update the upload progress state
                },
                responseType: 'blob', // Set the expected response type as a blob for file download
            });
            setFileUploaded(true);
            setResponse(response.data);
        } catch (error) {
            console.error('Error uploading file:', error); // Log any errors
        }
    };

    const downloadFile = () => {
        // Save the received file using file-saver
        const randomNumber = (Math.random() + 1).toString(36).substring(7); // Generate a random number for file naming
        saveAs(new Blob([response], { type: 'application/pdf' }), `${randomNumber}-downloaded.pdf`);
        // Increment the key state to force re-render the file input
        setKey(prevKey => prevKey + 1);

    }

    const handleRefreshClick = () => {
        setFile(null);
        setUploadPercentage(0);
        setFileUploaded(false);
        // Increment the key state to force re-render the file input
        setKey(prevKey => prevKey + 1);

    };

    // Render the file upload and download UI
    return (
        <div className="file-upload-body file-upload-download">
            <div>
                <nav>
                    {/* Other navigation items here */}
                    <button className="logout-button" onClick={() => logout()}>
                        <svg className="logout-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Logout
                    </button>
                </nav>
            </div>
            <main>
                <div className="hero">
                    <h1>Secure Cloud Storage & Communication</h1>
                    <p>Grab Premium Account today! Check out our awesome deal!</p>
                    <div className="upload-area">
                        <div className="refresh-file-icon" title='refresh'>
                            <svg onClick={handleRefreshClick} fill="#000000" height="20" width="20" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 383.748 383.748">
                                <g>
                                    <path d="M62.772,95.042C90.904,54.899,137.496,30,187.343,30c83.743,0,151.874,68.13,151.874,151.874h30
		C369.217,81.588,287.629,0,187.343,0c-35.038,0-69.061,9.989-98.391,28.888C70.368,40.862,54.245,56.032,41.221,73.593
		L2.081,34.641v113.365h113.91L62.772,95.042z"/>
                                    <path d="M381.667,235.742h-113.91l53.219,52.965c-28.132,40.142-74.724,65.042-124.571,65.042
		c-83.744,0-151.874-68.13-151.874-151.874h-30c0,100.286,81.588,181.874,181.874,181.874c35.038,0,69.062-9.989,98.391-28.888
		c18.584-11.975,34.707-27.145,47.731-44.706l39.139,38.952V235.742z"/>
                                </g>
                            </svg>
                        </div>
                        <div className="file-icon">
                            {/* SVG icon for visual indication of file upload */}
                            <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M19.35 10.04c-0.68-2.69-3.16-4.64-6.04-4.64-3.31 0-6.04 2.73-6.04 6.04 0 .24 0 .5.04.7-2.84.46-5.04 2.87-5.04 5.86 0 3.31 2.69 6 6 6h13c3.31 0 6-2.69 6-6 0-2.96-2.19-5.43-5.04-5.91.04-.22.04-.46.04-.65 0-.05 0-.08-.04-.12z" />
                            </svg>
                        </div>
                        <p>Drag & Drop files here to upload</p>
                        <div className='display-grid'>
                            <input type="file" key={key} onChange={handleFileChange} accept=".jpg,.jpeg,.png" />
                            <button onClick={fileUploaded ? downloadFile : uploadFile}>{fileUploaded ? 'Download PDF' : 'Upload File'}</button>
                            {uploadPercentage > 0 && <div className="progress-bar" style={{ width: `${uploadPercentage}%` }}>{uploadPercentage}%</div>}
                        </div>
                        {(!file && error) && (
                            <div className='mt-4'>
                                <div class="alert alert-danger" role="alert">
                                    Please select file!
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </main>
        </div>
    );
}

export default FileUploadDownload;
