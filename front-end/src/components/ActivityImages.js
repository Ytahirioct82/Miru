import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../helpers/api";
import ImageSlider from "./ImageSlider";

function ActivityImages({ activityId, newImages }) {
  const { id } = useParams();

  const [images, setImages] = useState([]);

  useEffect(() => {
    instance
      .get(`/activity/${activityId}/images`)
      .then((response) => {
        setImages([...response.data, ...newImages]);
      })
      .catch((error) => console.warn("catch".error));
  }, [id, activityId, newImages]);

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
