import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const NewProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxTeamSize, setMaxTeamSize] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name,
          description,
          requiredSkills: requiredSkills.split(",").map((skill) => skill.trim()),
          startDate,
          endDate,
          maxTeamSize: Number.parseInt(maxTeamSize),
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Project created successfully");
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error creating project:", error);
      alert("An error occurred while creating the project");
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-light">
      <div className="row justify-content-center align-items-center py-5">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Create New Project</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Project Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea 
                className="form-control" 
                id="description" 
                rows="3" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required 
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="requiredSkills" className="form-label">Required Skills (comma-separated)</label>
              <input 
                type="text" 
                className="form-control" 
                id="requiredSkills" 
                value={requiredSkills} 
                onChange={(e) => setRequiredSkills(e.target.value)} 
                required 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="startDate" className="form-label">Start Date</label>
              <input 
                type="date" 
                className="form-control" 
                id="startDate" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
                required 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endDate" className="form-label">End Date</label>
              <input 
                type="date" 
                className="form-control" 
                id="endDate" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                required 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="maxTeamSize" className="form-label">Max Team Size</label>
              <input 
                type="number" 
                className="form-control" 
                id="maxTeamSize" 
                value={maxTeamSize} 
                onChange={(e) => setMaxTeamSize(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Create Project</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProject;