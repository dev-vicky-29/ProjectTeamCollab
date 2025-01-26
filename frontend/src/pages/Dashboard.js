import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/projects", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    if (user) {
      fetchProjects();
    }
  }, [user]);

  return (
    <div className="container-fluid min-vh-100 bg-light">
      <div className="row justify-content-center align-items-center py-5">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <h1 className="card-title text-center mb-4">Dashboard</h1>
              <h2 className="h3 mb-4">Your Projects</h2>
              {projects.length > 0 ? (
                <ul className="list-group mb-4">
                  {projects.map((project) => (
                    <li key={project._id} className="list-group-item">
                      <Link to={`/projects/${project._id}`} className="text-decoration-none text-primary">
                        {project.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center">No projects yet.</p>
              )}
              <div className="d-grid gap-2">
                <Link to="/projects/new" className="btn btn-primary btn-lg">
                  Create New Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;