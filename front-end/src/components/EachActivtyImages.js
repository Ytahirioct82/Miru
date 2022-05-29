import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EachActivityImage({ activityId }) {
  const { id } = useParams();
  const API = process.env.REACT_APP_API_URL;
  const [image, setImage] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/activity/${activityId}/images/1`)
      .then((response) => {
        // setImages(response.data);
        setImage(response.data);
      })
      .catch((error) => console.warn("catch".error));
  }, [id, API, activityId]);

  return (
    <div>
      Images
      <div>
        <img src={image} alt={image.filename} />
      </div>
    </div>
  );
}

export default EachActivityImage;
