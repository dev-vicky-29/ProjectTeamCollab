import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const { user } = useContext(AuthContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() && user) {
      try {
        const response = await fetch(`http://localhost:5000/api/search?query=${query}&type=all`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error performing search:", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="display-4 mb-4">Search</h1>
      <form onSubmit={handleSearch}>
        <div className="input-group mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-control"
            placeholder="Search for users or projects..."
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>
      <div>
        {results.map((result) => (
          <div key={result._id} className="card mb-3">
            <div className="card-body">
              <h2 className="card-title mb-3">
                <Link to={result.type === "user" ? `/users/${result._id}` : `/projects/${result._id}`}>
                  {result.name}
                </Link>
              </h2>
              <p className="card-text text-muted">{result.type === "user" ? "User" : "Project"}</p>
              {result.type === "project" && result.description && (
                <p className="card-text">{result.description}</p>
              )}
              {result.type === "user" && result.skills && (
                <div>
                  <h5 className="card-subtitle mb-2 text-muted">Skills:</h5>
                  <ul className="list-group list-group-flush">
                    {result.skills.map((skill, index) => (
                      <li key={index} className="list-group-item">{skill}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;