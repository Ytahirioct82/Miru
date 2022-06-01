import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "./ImageSlider";

function ActivityImages({ activityId, newImages }) {
  const { id } = useParams();
  const API = process.env.REACT_APP_API_URL;
  const [images, setImages] = useState([]);

  useEffect(() => {
    console.log(newImages);
    handleLoad();
    // axios
    //   .get(`${API}/activity/${activityId}/images`)
    //   .then((response) => {
    //     setImages(response.data);
    //   })
    //   .catch((error) => console.warn("catch".error));
  }, [id, API, activityId, newImages]);

  const handleLoad = () => {
    axios
      .get(`${API}/activity/${activityId}/images`)
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => console.warn("catch".error));
  };

  const allImages = images.map((eachImage) => {
    return {
      content: `${eachImage.content}`,
      // <div key={eachImage.id} className="mySlides fade" >
      //   <img
      //     src={eachImage.content}
      //     alt={eachImage.filename}
      //     width="800"
      //     height="600"
      //   />
      // </div>
    };
  });

  return (
    <div className="slideshow-container">
      <ImageSlider slides={allImages} />
    </div>
  );
}

export default ActivityImages;
