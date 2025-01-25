import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <h1 className="display-4 mb-4">Welcome to ProjectTeamCollab</h1>
      <p className="lead mb-4">Find your perfect team for hackathons and projects!</p>
      <div className="btn-group" role="group">
        <Link to="/login" className="btn btn-primary btn-lg mx-2">
          Log In
        </Link>
        <Link to="/register" className="btn btn-success btn-lg mx-2">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;