"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [fileName, setFileName] = useState("");
  const [theme, setTheme] = useState("theme-light");

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark ? "theme-dark" : "theme-light");
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setStatus("Uploading...");
      const response = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setStatus("File uploaded successfully!");
        setFileName(result.fileName);
      } else {
        setStatus(`Error: ${result.error}`);
      }
    } catch (error) {
      setStatus("Error uploading the file.");
    }
  };

  return (
    <div className={styles[theme]}>
      <div className={styles.container}>
        <h2>Upload an Image to S3</h2>

        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} accept="image/*" />
          <button type="submit">Upload</button>
        </form>
        {status && <p>{status}</p>}
        {fileName && (
          <div>
            <p>Uploaded File: {fileName}</p>
          </div>
        )}
      </div>
    </div>
  );
}
