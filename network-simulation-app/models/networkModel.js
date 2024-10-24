// models/networkModel.js
class Node {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.queue = []; // Queue for packets
    }

    receivePacket(packet) {
        this.queue.push(packet);
    }

    sendPacket(targetNode) {
        if (this.queue.length > 0) {
            const packet = this.queue.shift();
            targetNode.receivePacket(packet);
            console.log(`Packet sent from ${this.name} to ${targetNode.name}`);
        } else {
            console.log(`No packets to send from ${this.name}`);
        }
    }
}

// Simulate network nodes
const nodes = [
    new Node('node1', 'Router 1'),
    new Node('node2', 'Router 2'),
    new Node('node3', 'Router 3'),
];

module.exports = { nodes }; // Ensure you're exporting nodes correctly
