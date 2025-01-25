import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [newRating, setNewRating] = useState({ score: 0, comment: "" });
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchRatings = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/ratings/user/${id}`, {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
          },
        });
        const data = await response.json();
        setRatings(data);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    if (currentUser) {
      fetchUser();
      fetchRatings();
    }
  }, [id, currentUser]);

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    if (currentUser && user) {
      try {
        const response = await fetch("http://localhost:5000/api/ratings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
          body: JSON.stringify({
            ratedUserId: user._id,
            score: newRating.score,
            comment: newRating.comment,
          }),
        });
        const data = await response.json();
        setRatings([...ratings, data]);
        setNewRating({ score: 0, comment: "" });
      } catch (error) {
        console.error("Error submitting rating:", error);
      }
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
      <p className="mb-4">{user.email}</p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Skills:</h2>
        <ul className="list-disc list-inside">
          {user.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Interests:</h2>
        <ul className="list-disc list-inside">
          {user.interests.map((interest, index) => (
            <li key={index}>{interest}</li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Experience:</h2>
        <p>{user.experience}</p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Ratings</h2>
        {ratings.map((rating) => (
          <div key={rating._id} className="mb-4 p-4 bg-white shadow rounded">
            <p className="font-semibold">
              {rating.rater.name} - Project: {rating.project.name}
            </p>
            <p>Score: {rating.score}/5</p>
            <p>{rating.comment}</p>
          </div>
        ))}
      </div>
      {currentUser && currentUser._id !== user._id && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Leave a Rating</h2>
          <form onSubmit={handleRatingSubmit} className="space-y-4">
            <div>
              <label htmlFor="score" className="block mb-2">
                Score (1-5):
              </label>
              <input
                type="number"
                id="score"
                min="1"
                max="5"
                value={newRating.score}
                onChange={(e) => setNewRating({ ...newRating, score: Number(e.target.value) })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="comment" className="block mb-2">
                Comment:
              </label>
              <textarea
                id="comment"
                value={newRating.comment}
                onChange={(e) => setNewRating({ ...newRating, comment: e.target.value })}
                className="w-full p-2 border rounded"
                rows={4}
              ></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Submit Rating
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserProfile;