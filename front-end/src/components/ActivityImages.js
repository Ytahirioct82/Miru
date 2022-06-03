import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "./ImageSlider";

function ActivityImages({ activityId, newImages }) {
  const { id } = useParams();
  const API = process.env.REACT_APP_API_URL;
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/activity/${activityId}/images`)
      .then((response) => {
        setImages([...response.data, ...newImages]);
      })
      .catch((error) => console.warn("catch".error));
  }, [id, API, activityId, newImages]);

  const allImages = images.map((eachImage) => {
    return {
      content: `${eachImage.content}`,
    };
  });

  return (
    <div className="slideshow-container">
      <ImageSlider slides={allImages} />
    </div>
  );
}

export default ActivityImages;
