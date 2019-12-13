import React from 'react';
//import '../css/CommentList.css';

export default function CommentList(props) { 

  return (
    <div className="Comments">
      <h2>Kommentarer</h2>
      <ul>
        {props.comments.map(comment => (
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