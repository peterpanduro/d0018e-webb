import React, { useState, useEffect } from 'react';
import { getComments } from '../functions/api'
import '../css/CommentList.css';
import BeautyStars from 'beauty-stars';

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
      
      <ul>
        {comments.map(comment => (
          <li key={comment.ID}>
            <p>Betyg: <BeautyStars value = {comment.Rating} activeColor= "yellow" size = "30px"/></p>
            <h2>Kommentarer</h2>  
            <p>{comment.Name}</p>
            <p>{comment.Opinion}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}