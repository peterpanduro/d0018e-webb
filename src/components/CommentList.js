import React, { useState, useEffect } from 'react';
import { getComments, deleteComment } from '../functions/api'
import '../css/CommentList.css';
import BeautyStars from 'beauty-stars';
import Cookies from 'js-cookie';

export default function CommentList(props) { 

  useEffect(() => {
    fetchComments(props.product_id);
  }, [props.product_id]);

  const [comments, setComments] = useState([]);
  const [comment, removeComment] = useState([]);

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

  const eraseComment = (e, id) => {
    e.preventDefault();
    deleteComment(Cookies.get("jwt"), id, (status, data) => {
      if (status == 200) {
        removeComment(data);
      } else {
        console.log(data);
      }
    })
  }

  const date = __date => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const locale = 'sv-SE';
    const unformattedDate = new Date(__date);
    const formattedDate = unformattedDate.toLocaleDateString(locale, options);
    return formattedDate;
  }

  const showDeleteCommentButton = () => {
    if (props.isAdmin) {
      return (
        <button type = "button" onClick = {e=>eraseComment(e, props.product_id)}>
          Delete comment
        </button>
      )
    }
  }

  return (
    <div className="CommentsContainer">
      <h2>Recensioner</h2>
      <ul className="Comments">
        {comments.map(comment => (
          <li key={comment.ID} className="Comment">
            <p>Betyg: </p><BeautyStars value = {comment.Rating} activeColor= "yellow" size = "30px"/>
            <p>{comment.Name}</p>
            <p>{comment.Opinion}</p>
            <p>{date(comment.date)}</p>
            <p>{showDeleteCommentButton()}</p>
          </li>
        ))} 
      </ul>
      <h2>Skriv recension</h2>
      <div className="newComment">
        <textarea name="Text1" cols="40" rows="8"></textarea>
        <button>Spara recension</button>
      </div>
    </div>
  )
}