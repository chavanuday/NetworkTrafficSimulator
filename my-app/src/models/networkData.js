// src/models/networkData.js
export const networkData = {
    nodes: [
      { id: "node1", name: "Node 1", traffic: 0, queueSize: 0 },
      { id: "node2", name: "Node 2", traffic: 0, queueSize: 0 },
      { id: "node3", name: "Node 3", traffic: 0, queueSize: 0 },
      { id: "node4", name: "Node 4", traffic: 0, queueSize: 0 },
    ],
    links: [
      { id: "link1", source: "node1", target: "node2", traffic: 0 },
      { id: "link2", source: "node3", target: "node4", traffic: 0 },
    ],
    simulationParameters: {
      packetGenerationRate: 5, // packt pr sec
      simulationDuration: 60, // second......
      totalPacketsProcessed: 0,
      isRunning: false,
    },
  };
  