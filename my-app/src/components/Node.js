import React from 'react';

const Node = ({ name, traffic, queueSize }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-blue-500 text-white p-4 rounded-full">{name}</div>
      <div className="mt-2 text-gray-700">Traffic: {traffic} p/s</div>
      <div className="mt-1 text-gray-500">Queue: {queueSize} packets</div>
    </div>
  );
};

export default Node;
