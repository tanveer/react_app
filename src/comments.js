import React, { useState, useEffect } from 'react';


const Comments = ({id}) => {
    const comments_Url = `https://jsonplaceholder.typicode.com/posts/${id}/comments`

    const [comments, setComments] = useState([])
  
    useEffect(() => {
      getCommments()
    })
  
    const getCommments = () => {
      fetch(comments_Url)
      .then(res => res.json())
      .then(setComments)
    }
  
    return (
      <div>
        <h5>Comments</h5>
        {
          comments.map( c => 
            <div key={c.id}>
                <hr></hr> <p>{c.body}</p>
            </div>  
          )
        }
      </div>
    )
    
}

export default Comments;