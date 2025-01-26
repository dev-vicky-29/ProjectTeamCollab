import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [availability, setAvailability] = useState("");
  const [experience, setExperience] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          skills: skills.split(",").map((skill) => skill.trim()),
          interests: interests.split(",").map((interest) => interest.trim()),
          availability: availability.split(",").map((day) => day.trim()),
          experience,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Registration successful");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Create your account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email-address" className="form-label">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="form-control"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="skills" className="form-label">Skills (comma-separated)</label>
              <input
                id="skills"
                name="skills"
                type="text"
                required
                className="form-control"
                placeholder="Skills (comma-separated)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="interests" className="form-label">Interests (comma-separated)</label>
              <input
                id="interests"
                name="interests"
                type="text"
                required
                className="form-control"
                placeholder="Interests (comma-separated)"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="availability" className="form-label">Availability (comma-separated days)</label>
              <input
                id="availability"
                name="availability"
                type="text"
                required
                className="form-control"
                placeholder="Availability (comma-separated days)"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="experience" className="form-label">Experience level</label>
              <input
                id="experience"
                name="experience"
                type="text"
                required
                className="form-control"
                placeholder="Experience level"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>

            <div className="d-grid gap-2">
              <button 
                type="submit" 
                className="btn btn-primary btn-lg"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;