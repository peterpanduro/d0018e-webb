import React, { useState, useEffect } from 'react';
import { getComments, deleteComment, postComment } from '../functions/api'
import '../css/CommentList.css';
import BeautyStars from 'beauty-stars';
import Cookies from 'js-cookie';


export default function CommentList(props) { 

  useEffect(() => {
    fetchComments(props.product_id);
  }, [props.product_id]);

  const [comments, setComments] = useState([]);
  const [comment, removeComment] = useState([]);
  const [opinion, setOpinion] = useState('');
  const [rating, setRating] = useState('');

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
        fetchComments(props.product_id)
      } else {
        console.log(data);
      }
    })
  }

  const addComments = (e, id) => {
    e.preventDefault();
    postComment(Cookies.get("jwt"), props.product_id, opinion, parseInt(rating), (status, data) =>{
      if(status == 200) {
        setOpinion('');
        setRating('');
        window.location.assign(`/products/${props.product_id}`);
      } else {
        alert('retard');
        console.log(data);
      }
    })
  }

  const updateOpinion = e => {
    setOpinion(e.target.value)
  }

  const updateRating = e => {
    setRating(e.target.value)
  }

  const date = __date => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const locale = 'sv-SE';
    const unformattedDate = new Date(__date);
    const formattedDate = unformattedDate.toLocaleDateString(locale, options);
    return formattedDate;
  }

  const showDeleteCommentButton = (id) => {
    if (props.isAdmin) {
      return (
        <button type = "button" onClick = {e=>eraseComment(e, id)}>
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
            <p>{showDeleteCommentButton(comment.ID)}</p>
          </li>
        ))} 
      </ul>
      <h2>Skriv recension</h2>
      <div className="newComment">
        <form onSubmit = {addComments}>
          <h3>Recension:</h3>
          <textarea name="Text1" value={opinion} onChange={updateOpinion} cols="40" rows="8"></textarea>
          <h3>Betyg, 1-5:</h3>
          <input type="text" name="rating" value={rating} onChange={updateRating}></input>
          <button>Spara recension</button>
        </form>
      </div>
    </div>
  )
}