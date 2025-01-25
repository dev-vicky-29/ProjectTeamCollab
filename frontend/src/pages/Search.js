import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Search</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow mr-2 p-2 border rounded"
            placeholder="Search for users or projects..."
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Search
          </button>
        </div>
      </form>
      <div>
        {results.map((result) => (
          <div key={result._id} className="mb-4 p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold mb-2">
              <Link to={result.type === "user" ? `/users/${result._id}` : `/projects/${result._id}`}>
                {result.name}
              </Link>
            </h2>
            <p className="text-gray-600 mb-2">{result.type === "user" ? "User" : "Project"}</p>
            {result.type === "project" && result.description && <p className="mb-2">{result.description}</p>}
            {result.type === "user" && result.skills && (
              <div>
                <p className="font-semibold">Skills:</p>
                <ul className="list-disc list-inside">
                  {result.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;