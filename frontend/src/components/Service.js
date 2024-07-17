import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Service.css';

const Service = () => {
    const [services, setServices] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [role, setRole] = useState('');
    const [editingService, setEditingService] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        const response = await axios.get('/services');
        setServices(response.data);
    };

    const addService = async (e) => {
        e.preventDefault();
        const newService = { name, description, role };
        const response = await axios.post('/services', newService);
        setServices([...services, response.data]);
        clearForm();
    };

    const updateService = async (e) => {
        e.preventDefault();
        const updatedService = { name, description, role };
        await axios.patch(`/services/${editingService._id}`, updatedService);
        fetchServices();
        clearForm();
        setEditingService(null);
    };

    const deleteService = async (id) => {
        await axios.delete(`/services/${id}`);
        fetchServices();
    };

    const clearForm = () => {
        setName('');
        setDescription('');
        setRole('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingService) {
            updateService(e);
        } else {
            addService(e);
        }
    };

    const handleEdit = (service) => {
        setName(service.name);
        setDescription(service.description);
        setRole(service.role);
        setEditingService(service);
    };

    return (
        <div className="container">
            <h1>Service CRUD Operations</h1>
            <form onSubmit={handleSubmit} className="service-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                />
                <button type="submit">{editingService ? 'Update Service' : 'Add Service'}</button>
            </form>
            <ul className="service-list">
                {services.map((service) => (
                    <li key={service._id} className="service-item">
                        <div className="service-details">
                            <span className="service-name">{service.name}</span>
                            <span className="service-description">{service.description}</span>
                            <span className="service-role">{service.role}</span>
                        </div>
                        <div className="service-actions">
                            <button onClick={() => handleEdit(service)}>Edit</button>
                            <button onClick={() => deleteService(service._id)} className="delete">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Service;
