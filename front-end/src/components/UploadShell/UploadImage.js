import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";

const API = process.env.REACT_APP_API_URL;
function UploadShell() {
  const [images, setImages] = useState([]);

  const getBase64Update = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_) => resolve(reader.result);
      reader.onerror = (e) => reject(e);
    });
  };

  const onchange = (event) => {
    let files = Array.from(event.target.files);
    files = files.map(async (file) => ({
      content: await getBase64Update(file),
      fileName: file.name,
      contentType: file.type,
      length: file.size,
    }));
    Promise.all(files).then((result) => setImages(result));
  };

  const allImages = images.map((eachImage) => {
    return (
      <div key={eachImage.fileName}>
        <img src={eachImage.content} />
      </div>
    );
  });

  const storingImages = async () => {
    const promises = [];
    images.forEach((eachImage) => {
      const request = axios.post(`${API}/images`, eachImage).then(
        (response) => {
          if (response.status === 500) {
            console.log("no email found");
          } else {
            console.log(response.data);
          }
        },
        (error) => {
          console.log("no email found ", eachImage);
        }
      );
      console.log(request);
      console.log("axios request done");
      promises.push(request);
    });
    await Promise.all(promises);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    storingImages();
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="form-outline">
        <label className="form-label" htmlFor="image">
          {" "}
          Image :{" "}
        </label>
        <input
          multiple
          className="form-control form-control-sm"
          type="file"
          id="image"
          onChange={onchange}
          required
        />
      </div>
      <button type="submit">Submit</button>
      {allImages}
    </form>
  );
}

export default UploadShell;
