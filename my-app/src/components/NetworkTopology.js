import React, { useState, useEffect } from 'react';
import { networkData } from '../models/networkData';
import Node from './Node';
import Link from './Link';

const NetworkTopology = () => {
  const [nodeStats, setNodeStats] = useState({
    node1: { traffic: 0, queueSize: 0 },
    node2: { traffic: 0, queueSize: 0 },
    node3: { traffic: 0, queueSize: 0 },
    node4: { traffic: 0, queueSize: 0 },
  });

  const [linkStats, setLinkStats] = useState({
    link1: { traffic: 0 },  // Link between Node 1 and Node 2
    link2: { traffic: 0 },  // Link between Node 3 and Node 4
  });

  // Function to simulate random traffic load per node
  const generateRandomTraffic = () => Math.floor(Math.random() * 100);

  // Function to simulate packet arrival (increase in queue size)
  const generateRandomPackets = () => Math.floor(Math.random() * 5); // 1 to 5 packets arrive per second

  // Function to simulate packet processing (decrease in queue size)
  const processPackets = () => Math.floor(Math.random() * 3); // 0 to 3 packets processed per second

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate traffic generation and packet arrival for each node
      const node1Traffic = generateRandomTraffic();
      const node2Traffic = generateRandomTraffic();
      const node3Traffic = generateRandomTraffic();
      const node4Traffic = generateRandomTraffic();

      const node1Queue = Math.max(0, nodeStats.node1.queueSize + generateRandomPackets() - processPackets());
      const node2Queue = Math.max(0, nodeStats.node2.queueSize + generateRandomPackets() - processPackets());
      const node3Queue = Math.max(0, nodeStats.node3.queueSize + generateRandomPackets() - processPackets());
      const node4Queue = Math.max(0, nodeStats.node4.queueSize + generateRandomPackets() - processPackets());

      setNodeStats({
        node1: { traffic: node1Traffic, queueSize: node1Queue },
        node2: { traffic: node2Traffic, queueSize: node2Queue },
        node3: { traffic: node3Traffic, queueSize: node3Queue },
        node4: { traffic: node4Traffic, queueSize: node4Queue },
      });

      // Calculate traffic on the lin
      // Link 1: Average traffic between Node 1 and Node 2
      const link1Traffic = Math.floor((node1Traffic + node2Traffic) / 2);

      const link2Traffic = Math.floor((node3Traffic + node4Traffic) / 2);

      setLinkStats({
        link1: { traffic: link1Traffic },
        link2: { traffic: link2Traffic },
      });
    }, 1000); // Update every sec

    return () => clearInterval(interval); 
  }, [nodeStats]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex justify-between items-center w-2/3 h-96 border border-gray-300 rounded-lg">
        {/* Nodes */}
        <div className="absolute top-0 left-0">
          <Node name="Node 1" traffic={nodeStats.node1.traffic} queueSize={nodeStats.node1.queueSize} />
        </div>
        <div className="absolute top-0 right-0">
          <Node name="Node 2" traffic={nodeStats.node2.traffic} queueSize={nodeStats.node2.queueSize} />
        </div>
        <div className="absolute bottom-0 left-0">
          <Node name="Node 3" traffic={nodeStats.node3.traffic} queueSize={nodeStats.node3.queueSize} />
        </div>
        <div className="absolute bottom-0 right-0">
          <Node name="Node 4" traffic={nodeStats.node4.traffic} queueSize={nodeStats.node4.queueSize} />
        </div>

        {/* Links */}
        {/* Link 1 (between Node 1 and Node 2) */}
        <div className="absolute top-20 left-12">
          <Link traffic={linkStats.link1.traffic} orientation="horizontal" />
        </div>
        {/* Link 2 (between Node 3 and Node 4) */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
          <Link traffic={linkStats.link2.traffic} orientation="vertical" />
        </div>
      </div>
    </div>
  );
};

export default NetworkTopology;
