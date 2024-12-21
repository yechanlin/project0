import { useState } from 'react';
import '../styles/profilesetup.css';

const ProfileSetup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    school: '',
    fieldOfStudy: '',
    bio: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add API call to save profile data here
  };

  return (
    <div className="profile-setup">
      <h1>Set Up Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="school"
          placeholder="School"
          value={formData.school}
          onChange={handleChange}
        />
        <input
          type="text"
          name="fieldOfStudy"
          placeholder="Field of Study"
          value={formData.fieldOfStudy}
          onChange={handleChange}
        />
        <textarea
          name="bio"
          placeholder="Short Bio"
          value={formData.bio}
          onChange={handleChange}
        />
        <button type="submit">Complete Profile</button>
      </form>
    </div>
  );
};

export default ProfileSetup;
