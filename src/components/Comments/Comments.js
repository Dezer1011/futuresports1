// Importing necessary hooks and context
import React, { useState, useContext } from 'react';
import { UserContext } from '../../App';  // Importing UserContext to access user-related data
import initialSampleComments from './sampleComments';  // Sample comments 
import './Comments.css';  

function Comments() {
    // State to hold comments
    const [comments, setComments] = useState(initialSampleComments);
    
    // State to manage the current comment being typed
    const [comment, setComment] = useState('');
    
    // Getting the current user from the UserContext
    const { currentUser } = useContext(UserContext);

    // Function to handle the change in comment textarea
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    }

    // Function to submit the comment
    const submitComment = () => {
        // Check if user is logged in
        if (currentUser && currentUser.isLoggedIn) {
            // Add new comment to the list of comments
            setComments(prevComments => [...prevComments, { username: currentUser.username, comment }]);
            setComment('');  // Clear the comment input field after submission
        } else {
            alert('Please log in to comment.');
        }
    }

    return (
        <section id="comments">
            <h2>Comments</h2>
            {/* Conditional rendering based on user's login status */}
            {currentUser && currentUser.isLoggedIn ? (
                <div className="comment-input">
                    {/* Textarea for typing comments */}
                    <textarea 
                        value={comment} 
                        onChange={handleCommentChange} 
                        placeholder="Add a comment...">
                    </textarea>
                    <button onClick={submitComment}>Post Comment</button>
                </div>
            ) : (
                <p>Please <a href="/login">log in</a> to leave a comment.</p>
            )}
            {/* List to display all the comments */}
            <ul className="comment-list">
                {comments.map((com, index) => (
                    <li key={index}>
                        <strong>{com.username}:</strong> {com.comment}
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Comments;
