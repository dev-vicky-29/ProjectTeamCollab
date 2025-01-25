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
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
            <h2 className="text-xl mb-4">Your Projects</h2>
            {projects.length > 0 ? (
              <ul className="space-y-2">
                {projects.map((project) => (
                  <li key={project._id} className="bg-gray-100 p-2 rounded">
                    <Link to={`/projects/${project._id}`} className="text-blue-600 hover:text-blue-800">
                      {project.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No projects yet.</p>
            )}
            <div className="mt-6">
              <Link to="/projects/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Create New Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;