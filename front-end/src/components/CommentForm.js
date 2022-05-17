import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function CommentForm() {
  return (
    <div className="CommentForm">
      <form>
        <label htmlFor="UserName"> Name:</label>
        <input id="name" type="text" placeholder="User Name" required />

        <label htmlFor="Comment">Comment:</label>
        <input id="comment" type="textarea" placeholder="User Name" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CommentForm;
