import React, { useState, useEffect } from 'react';
//import '../css/CommentList.css';
import { getComments as getComments } from '../functions/api'

export default function CommentList(props) {
  useEffect(() => {
    fetchComments();
  }, []);

  const [comments, setComments] = useState([]);

  const fetchComments = () => {
      console.log(props)
    getComments(props.productId, (status, data) => {
      if (status === 200) {
        setComments(data);
      } else {
        console.log(data);
      }
    })
  }

  return (
    <div className="Comments">
      <h2>Kommentarer</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment.ID}>
            <p>{comment.Opinion}</p>
        </li>
        ))}
      </ul>
    </div>
  )
}