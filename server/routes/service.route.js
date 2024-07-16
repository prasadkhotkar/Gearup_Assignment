const express = require('express');
const router = express.Router();
const Service = require('../models/service.model.js');

// Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new service
router.post('/', async (req, res) => {
    const service = new Service({
        name: req.body.name,
        description: req.body.description,
        role: req.body.role,
    });

    try {
        const newService = await service.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a service
router.patch('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        if (req.body.name != null) {
            service.name = req.body.name;
        }
        if (req.body.description != null) {
            service.description = req.body.description;
        }
        if (req.body.role != null) {
            service.role = req.body.role;
        }

        const updatedService = await service.save();
        res.json(updatedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a service
router.delete('/:id', async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).send('Service not found');
        }
        res.status(200).send(service);
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).send(error);
    }
});

module.exports = router;
