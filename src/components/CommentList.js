import React, { useState, useEffect } from 'react';
import { getComments } from '../functions/api'
//import '../css/CommentList.css';

export default function CommentList(props) { 

  useEffect(() => {
    fetchComments(props.product_id);
  }, [props.product_id]);

  const [comments, setComments] = useState([]);

  const fetchComments = id => {
    getComments(id, (status, data) => {
      if (status === 200) {
        setComments(data);
      } else {
        console.log(data);
        alert(`ERROR ${status}: Check console`)
      }
    })
  }

  return (
    <div className="Comments">
      <h2>Kommentarer</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.ID}>
            <p>{comment.Name}</p>
            <p>{comment.Rating}</p>
            <p>{comment.Opinion}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}