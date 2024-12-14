import React, { useState } from 'react';
import './ServicesPage.css';

const services = [
  {
    name: 'Screen Repair',
    description: 'Fix your cracked or damaged screen with high-quality replacement parts.',
    image: 'https://m.media-amazon.com/images/I/61aZmrGlg6L._AC_SL1000_.jpg',
  },
  {
    name: 'Software Update',
    description: 'Update your device with the latest software version and enhancements.',
    image: 'https://img.freepik.com/premium-vector/system-software-update-illustration_100456-2033.jpg',
  },
  {
    name: 'Battery Change',
    description: 'Replace your old battery with a new one for longer-lasting performance.',
    image: 'https://media.istockphoto.com/id/1370904031/photo/technician-change-and-insert-new-laptop-battery-computer-repair-service.jpg?s=612x612&w=0&k=20&c=qUdopnSdf7IEZntP8o2psamRkJLxJdaMpgaJN04KviU=',
  },
];

const ServicesPage = ({ handleReturnHome }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({ name: '', address: '' });

  const handleRequestRepair = (service) => {
    setSelectedService(service);
    setShowModal(true); // Show the modal when a service is selected
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Capture the date and time when the repair request is made
    const requestDate = new Date().toLocaleString();

    const requestData = {
      service: selectedService.name,
      name: formData.name,
      address: formData.address,
      requestDate,
    };

    // Send request data to the backend to be saved in the database
    fetch('http://localhost:3001/request-repair', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Repair request placed successfully') {
          alert('Your repair request has been submitted!');
          setShowModal(false); // Close the modal after submitting
        } else {
          alert('Error submitting the request. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error submitting repair request:', error);
        alert('Error submitting the request. Please try again.');
      });
  };

  return (
    <div className="services-container">
      <div className="return-home-container">
        <button className="return-home-btn" onClick={handleReturnHome}>Return to Home</button>
      </div>

      <h1 className="services-title">Our Services</h1>

      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <img src={service.image} alt={service.name} className="service-image" />
            <h3 className="service-name">{service.name}</h3>
            <p className="service-description">{service.description}</p>
            <button
              className="request-repair-btn"
              onClick={() => handleRequestRepair(service)}
            >
              Request Repair
            </button>
          </div>
        ))}
      </div>

      {/* Modal for confirming repair request */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Request Repair for {selectedService?.name}</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="submit-repair-btn">Submit Request</button>
              <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
