const express = require('express');
const cors = require('cors'); // Move this import to the top
const { nodes } = require('./models/networkModel'); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors()); // Enable CORS

// Endpoint to send packets
app.post('/api/send', (req, res) => {
    try {
        const { fromNodeId, toNodeId, packet } = req.body;

        console.log('Received request:', { fromNodeId, toNodeId, packet }); // Log incoming data

        // Check if nodes exist
        const fromNode = nodes.find(node => node.id === fromNodeId);
        const toNode = nodes.find(node => node.id === toNodeId);

        if (!fromNode || !toNode) {
            return res.status(400).json({ error: 'Invalid node ID' });
        }

        // Send the packet from one node to another
        fromNode.sendPacket(toNode);

        // Respond with a success message
        res.json({ message: `Packet sent from ${fromNode.name} to ${toNode.name}` });
    } catch (error) {
        console.error('Error occurred:', error); // Log the error
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
