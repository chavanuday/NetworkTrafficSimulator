import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const NetworkDashboard = () => {
    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        // Fetch node data from the 
        const fetchNodes = async () => {
            const response = await fetch('http://localhost:5000/api/nodes'); // Ensure this URL points to your backend
            const data = await response.json();
            setNodes(data);
        };

        fetchNodes();
    }, []);

    const data = {
        labels: nodes.map(node => node.name),
        datasets: [
            {
                label: 'Traffic Load (packets/sec)',
                data: nodes.map(node => node.trafficLoad),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Network Topology Dashboard</h2>
            <Bar data={data} />
        </div>
    );
};

export default NetworkDashboard;
