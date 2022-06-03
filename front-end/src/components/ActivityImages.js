import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ActivityImages({ activityId }) {
  const { id } = useParams();
  const API = process.env.REACT_APP_API_URL;
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/activity/${activityId}/images`)
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => console.warn("catch".error));
  }, [id, API, activityId]);

  const allImages = images.map((eachImage) => {
    return (
      <div key={eachImage.id}>
        <img
          src={eachImage.content}
          alt={eachImage.filename}
          width="300"
          height="300"
        />
      </div>
    );
  });

  return <div>{allImages}</div>;
}

export default ActivityImages;
