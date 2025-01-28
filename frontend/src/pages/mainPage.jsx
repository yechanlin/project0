import React, { useState, useEffect } from 'react';
import '../styles/mainPage.css';
import SwipeCard from './SwipeCard';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiBookmark, FiGrid } from 'react-icons/fi';

const MainPage = () => {
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    projectType: '',
    skills: [],
    maxDistance: 50
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        window.location.href = '/login';
        return;
      }

      const response = await fetch('http://localhost:5001/api/projects/fetch', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Response status:', response.status);
      
      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
      }

      const data = await response.json();
      console.log('Projects data:', data);

      if (data.status === "success" && Array.isArray(data.data?.projects)) {
        setProjects(data.data.projects);
        setCurrentIndex(0);
      } else {
        console.error('Invalid project data format:', data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = async (direction) => {
    const currentProject = projects[currentIndex];
    
    try {
      const token = localStorage.getItem('token');
      if (direction === 'right') {
        // Apply to project
        await fetch(`http://localhost:5001/api/projects/${currentProject._id}/apply`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
      
      // Move to next project
      if (currentIndex < projects.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // Fetch more projects when we run out
        fetchProjects();
      }
    } catch (error) {
      console.error('Error handling swipe:', error);
    }
  };

  return (
    <div className="main-page">
      <nav className="navbar">
        <div className="nav-brand">NEXUS</div>
        <div className="nav-links">
          <button className="nav-link active">
            <FiGrid /> Projects
          </button>
          <button className="nav-link">
            <FiUser /> Members
          </button>
          <button className="nav-link">
            <FiBookmark /> Saved
          </button>
        </div>
        <div className="profile-section">
          <button className="profile-button">
            <FiUser />
          </button>
        </div>
      </nav>

      <main className="main-content">
        {loading ? (
          <div className="loading-spinner">Loading projects...</div>
        ) : projects.length > 0 ? (
          <div className="card-stack">
            {console.log('Current index:', currentIndex)}
            {console.log('Current project:', projects[currentIndex])}
            {currentIndex < projects.length && (
              <SwipeCard
                key={projects[currentIndex]._id}
                project={projects[currentIndex]}
                onSwipe={handleSwipe}
              />
            )}
          </div>
        ) : (
          <div className="no-projects">
            <h3>No projects available</h3>
            <p>Current projects array length: {projects.length}</p>
            <button className="refresh-button" onClick={fetchProjects}>
              Refresh
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default MainPage;
