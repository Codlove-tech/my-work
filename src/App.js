import React, { useState } from 'react';
import './App.css';
import backgroundImage from './assets/images/background.jpg';

function App() {
  const [userDetails, setUserDetails] = useState({
    name: '', role: '', email: '', gender: '', birthday: '', joiningDate: '', contactnumber: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPolicies, setShowPolicies] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showNewJoinerForms, setShowNewJoinerForms] = useState(false);

  // Hardcoded list of policies with paths relative to the public directory
  const policies = [
    {
      name: 'AN355 Inncom Programming Tools Reference Guide.pdf',
      path: '/pdfs/AN355 Inncom Programming Tools Reference Guide.pdf'
    },
    {
      name: 'Inncom Watchdog User Guide.pdf',
      path: '/pdfs/Inncom Watchdog User Guide.pdf'
    },
    {
      name: 'policies.pdf',
      path: '/pdfs/policies.pdf'
    },
    {
      name: 'USB Sneezer 5_16_8 Release Notes.pdf',
      path: '/pdfs/USB Sneezer 5_16_8 Release Notes.pdf'
    },
    {
      name: 'WatchDog Manual.pdf',
      path: '/pdfs/WatchDog Manual.pdf'
    }
  ];

  // Hardcoded list of new joiner forms with paths relative to the public directory
  const newJoinerForms = [
    {
      name: 'New Joiner Form 1',
      path: 'https://form.jotform.com/243133706088052'  // Updated to JotForm URL
    },
    {
      name: 'New Joiner Form 2.pdf',
      path: '/newjoiners/New Joiner Form 2.pdf'
    },
    {
      name: 'New Joiner Form 3.pdf',
      path: '/newjoiners/New Joiner Form 3.pdf'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handlePoliciesClick = () => {
    // Close other sections before opening Policies
    setShowPolicies(!showPolicies);
    setShowAbout(false);
    setShowNewJoinerForms(false);
  };

  const handleNewJoinerClick = () => {
    // Close other sections before opening New Joiner Forms
    setShowNewJoinerForms(!showNewJoinerForms);
    setShowPolicies(false);
    setShowAbout(false);
  };

  const handleAboutClick = () => {
    // Close other sections before opening About
    setShowAbout(!showAbout);
    setShowPolicies(false);
    setShowNewJoinerForms(false);
  };

  const handleHomeClick = () => {
    setIsSubmitted(false);
    setShowPolicies(false);
    setShowAbout(false);
    setShowNewJoinerForms(false); // Close all sections when returning home
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <div className="main-container">
        {isSubmitted && (
          <button onClick={handleHomeClick} className="home-button">
            <i className="fas fa-home"></i> Home
          </button>
        )}
        <h1>Welcome to the Hilton Bahrain</h1>
        <p>"Together We Grow, Together We Succeed"! Welcome to the Team.</p>

        {!isSubmitted ? (
          <div className="form-container">
            <h2>Enter Your Details</h2>
            <form onSubmit={handleFormSubmit}>
              <input type="text" name="name" placeholder="Full Name" value={userDetails.name} onChange={handleInputChange} required />
              <input type="text" name="role" placeholder="Role" value={userDetails.role} onChange={handleInputChange} required />
              <input type="email" name="email" placeholder="Email" value={userDetails.email} onChange={handleInputChange} required />
              <input type="text" name="gender" placeholder="Gender" value={userDetails.gender} onChange={handleInputChange} required />

              <div className="date-group">
                <div className="date-field">
                  <label htmlFor="birthday">Birthday</label>
                  <input type="date" name="birthday" value={userDetails.birthday} onChange={handleInputChange} required />
                </div>
                <div className="date-field">
                  <label htmlFor="joiningDate">Joining Date</label>
                  <input type="date" name="joiningDate" value={userDetails.joiningDate} onChange={handleInputChange} required />
                </div>
              </div>

              <input type="tel" name="contactnumber" placeholder="Contact Number" value={userDetails.contactnumber} onChange={handleInputChange} required />
              <button type="submit">Submit</button>
            </form>
          </div>
        ) : (
          <div className="options-container">
            <h2>Welcome, {userDetails.name}!</h2>
            <div className="options">
              <div className="option-box">
                <h3>Policies & Procedures</h3>
                <button onClick={handlePoliciesClick}>View Policies</button>
              </div>
              <div className="option-box">
                <h3>New Joiner Forms</h3>
                <button onClick={handleNewJoinerClick}>View New Joiner Forms</button>
              </div>
              <div className="option-box">
                <h3>About</h3>
                <button onClick={handleAboutClick}>Learn More</button>
              </div>
            </div>
          </div>
        )}

        {showPolicies && (
          <div className="policies-list">
            <h3>Policies & Procedures</h3>
            <ul>
              {policies.map((policy, index) => (
                <li key={index}>
                  <a href={policy.path} target="_blank" rel="noopener noreferrer">
                    {policy.name}
                  </a>
                </li>
              ))}
            </ul>
            <button onClick={handlePoliciesClick}>Close</button>
          </div>
        )}

        {showNewJoinerForms && (
          <div className="new-joiner-forms">
            <h3>New Joiner Forms</h3>
            <ul>
              {newJoinerForms.map((form, index) => (
                <li key={index}>
                  <a href={form.path} target="_blank" rel="noopener noreferrer">
                    {form.name}
                  </a>
                </li>
              ))}
            </ul>
            <button onClick={handleNewJoinerClick}>Close</button>
          </div>
        )}

        {showAbout && (
          <div className="about-section">
            <h3>About Hilton Bahrain</h3>
            <p>Welcome to Hilton Bahrain. Located in Manama...</p>
            <button onClick={handleAboutClick}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

