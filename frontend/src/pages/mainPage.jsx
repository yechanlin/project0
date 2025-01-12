import React, { useState, useEffect } from 'react';
import '../styles/mainPage.css';

const MainPage = () => {
  const [currentProject, setCurrentProject] = useState(null); // Store the current project
  const [loading, setLoading] = useState(true); // For loading state

  // Fetch the next project from the API
  const fetchNextProject = async () => {
    setLoading(true);
    try {
      const lastProjectId = currentProject ? currentProject._id : null;
      const response = await fetch(
        `http://localhost:5001/api/projects/next${lastProjectId ? `?lastProjectId=${lastProjectId}` : ''}`,
      );
      const data = await response.json();
      setCurrentProject(data.project);
    } catch (error) {
      console.error('Error fetching project:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNextProject(); // Fetch the first project when the page loads
  }, []);

  // Save the project
  const handleSave = async () => {
    try {
      await fetch(
        `http://localhost:5001/api/projects/${currentProject._id}/save`,
        {
          method: 'POST',
        },
      );
      alert('Project saved!');
      fetchNextProject(); // Fetch the next project
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  // Apply for the project
  const handleApply = async () => {
    try {
      await fetch(
        `http://localhost:5001/api/projects/${currentProject._id}/apply`,
        {
          method: 'POST',
        },
      );
      alert('Applied successfully!');
      fetchNextProject(); // Fetch the next project
    } catch (error) {
      console.error('Error applying for project:', error);
    }
  };

  // Skip the project
  const handleSkip = async () => {
    try {
      await fetch(
        `http://localhost:5001/api/projects/${currentProject._id}/skip`,
        {
          method: 'POST',
        },
      );
      fetchNextProject(); // Fetch the next project
    } catch (error) {
      console.error('Error skipping project:', error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="main-page">
        {loading ? (
          <div>Loading...</div>
        ) : currentProject ? (
          <ProjectCard
            project={currentProject}
            onSave={handleSave}
            onApply={handleApply}
            onSkip={handleSkip}
          />
        ) : (
          <div>No more projects available!</div>
        )}
      </div>
    </>
  );
  return (
    <>
      <NavBar />
      <div className="main-page">
        {loading ? (
          <div>Loading...</div>
        ) : currentProject ? (
          <ProjectCard
            project={currentProject}
            onSave={handleSave}
            onApply={handleApply}
            onSkip={handleSkip}
          />
        ) : (
          <div>No more projects available!</div>
        )}
      </div>
    </>
  );
};

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <button className="logo-button">NEXUS</button>
      <ul className="nav-links">
        <li>Projects</li>
        <li>Members</li>
        <li>Save</li>
      </ul>
      <div className="profile">
        <span className="profile-icon">⚪</span>
      </div>
    </nav>
  );
};

const ProjectCard = ({ project, onSave, onApply, onSkip }) => (
  <div className="project-card">
    <h2>{project.title}</h2>
    <h3>{project.location}</h3>
    <p className="details">{project.description}</p>
    <h4>Responsibilities</h4>
    <ul className="responsibilities">
      {project.responsibilities.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
    <h4>Skills</h4>
    <div className="skills">
      {project.skills.map((skill, index) => (
        <span className="skill" key={index}>
          {skill}
        </span>
      ))}
    </div>
    <h4>Team Members ({project.teamMembers.length})</h4>
    <div className="team-members">
      {project.teamMembers.map((member, index) => (
        <div className="member-icon" key={index}>
          ⚪
        </div>
      ))}
    </div>
    <div className="action-buttons">
      <button className="action-button skip" onClick={onSkip}>
        Skip
      </button>
      <button className="action-button save" onClick={onSave}>
        Save
      </button>
      <button className="action-button apply" onClick={onApply}>
        Apply
      </button>
    </div>
  </div>
);

export default MainPage;
