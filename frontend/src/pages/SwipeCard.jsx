import React from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { FiX, FiCheck } from 'react-icons/fi';
import '../styles/swipeCard.css';

const SwipeCard = ({ project, onSwipe }) => {
  const controls = useAnimation();
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  
  // Transform values for card rotation and background colors
  const rotate = useTransform(dragX, [-200, 200], [-25, 25]);
  const opacity = useTransform(dragX, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  
  // Background colors for accept/reject indicators
  const acceptScale = useTransform(dragX, [0, 100], [1.1, 1.5]);
  const rejectScale = useTransform(dragX, [-100, 0], [1.5, 1.1]);

  const handleDragEnd = async (_, info) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      await controls.start({ x: 500, opacity: 0 });
      onSwipe('right');
    } else if (info.offset.x < -threshold) {
      await controls.start({ x: -500, opacity: 0 });
      onSwipe('left');
    }
  };

  return (
    <div className="swipe-card-container">
      <motion.div
        className="swipe-card"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x: dragX, rotate, opacity }}
        onDragEnd={handleDragEnd}
        animate={controls}
        whileTap={{ scale: 1.05 }}
      >
        <div className="card-content">
          <h2>{project.title || 'Project Title'}</h2>
          <div className="project-type-badge">{project.projectType || 'Type'}</div>
          <p className="location">{project.location || 'Location'}</p>
          <p className="description">{project.description || 'Description'}</p>
          <div className="skills-list">
            {project.skillsRequired?.map((skill, index) => (
              <span key={index} className="skill-badge">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Swipe indicators */}
      <motion.div 
        className="swipe-indicator reject"
        style={{ scale: rejectScale, opacity: dragX < 0 ? 1 : 0 }}
      >
        <FiX />
      </motion.div>
      <motion.div 
        className="swipe-indicator accept"
        style={{ scale: acceptScale, opacity: dragX > 0 ? 1 : 0 }}
      >
        <FiCheck />
      </motion.div>
    </div>
  );
};

export default SwipeCard; 