import { useState } from 'react';
import '../styles/profilesetup.css';

const ProfileSetup = () => {
  const [formData, setFormData] = useState({
    profileImage: '',
    userName: '',
    dateOfBirth: '',
    school: '',
    fieldOfStudy: '',
    bio: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="profile-setup">
      <h1>Create Profile</h1>
      <div className="profile-picture">
        <div className="circle">
          <img
            className="profile-image"
            src={formData.profileImage || 'https://via.placeholder.com/120'}
            alt="Profile"
          />
        </div>
        <label htmlFor="profile-upload" className="edit-icon">
          <i className="fas fa-pencil-alt"></i>
        </label>
        <input
          type="file"
          id="profile-upload"
          className="file-input"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="userName"
          placeholder="Enter your username"
          value={formData.userName}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dateOfBirth"
          placeholder="Date of Birth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
        <input
          type="text"
          name="fieldOfStudy"
          placeholder="Enter your field of study"
          value={formData.fieldOfStudy}
          onChange={handleChange}
        />
        <input
          type="text"
          name="school"
          placeholder="Enter your school"
          value={formData.school}
          onChange={handleChange}
        />
        <textarea
          name="bio"
          placeholder="Tell us about yourself"
          value={formData.bio}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default ProfileSetup;
