import React from 'react';

const AgentInPointTable = ({ backendData }) => {
  if (!backendData || backendData.length === 0) {
    return <p>No data found from the backend.</p>;
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-gray-300 text-left">S.No</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Date</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Receiver</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Old Points</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">In</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">New Points</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Sender</th>
            <th className="px-4 py-2 border-b border-gray-300 text-left">Transaction Type</th>
          </tr>
        </thead>
        <tbody>
          {backendData
            .filter(entry => entry.trnxAmount > 0) // Only include rows where "In" has a value
            .map((entry, index) => {
              const dateOnly = entry.createdAt.split('T')[0]; // Extract date
              const isPositive = entry.trnxAmount > 0;
              const inAmount = isPositive ? `₹${entry.trnxAmount}` : ''; // Show in "In" if positive
              // Determine sender and receiver based on trnxTypeTxt
            let sender = '';
            let receiver = '';

            switch (entry.trnxTypeTxt) {
              case 'Sub Agent Deduct Chips Added':
                receiver = entry.name || 'N/A'; // Subagent is receiver
                sender = entry.shopname || 'N/A'; // Agent is sender
                break;
              case 'Add Chips to Sub Agent':
                receiver = entry.shopname || 'N/A'; // Subagent is receiver
                sender = entry.name || 'N/A'; // Agent is sender
                break;
              case 'Deduct amount Addeed Chips to agent':
                receiver = entry.name || 'N/A'; // Agent is receiver
                sender = entry.shopid || 'N/A'; // User is sender
                break;
              case 'Add Chips to User':
                receiver = entry.shopname || 'N/A'; // User is receiver
                sender = entry.name || 'N/A'; // Agent is sender
                break;
              case 'Admin Addeed Chips':
                receiver = entry.name || 'N/A'; // Admin is receiver
                sender = entry.adminname || 'N/A'; // Super Admin is sender
                break;
              case 'Admin duduct Chips':
                receiver = entry.adminname || 'N/A'; // Super Admin is receiver
                sender = entry.name || 'N/A'; // Admin is sender
                break;
              default:
                receiver = 'N/A';
                sender = 'N/A';
            }

              return (
                <tr key={entry._id}>
                  <td className="px-4 py-2 border-b border-gray-300">{index + 1}</td>
                  <td className="px-4 py-2 border-b border-gray-300">{dateOnly}</td>
                  <td className="px-4 py-2 border-b border-gray-300">{receiver}</td>
                  <td className="px-4 py-2 border-b border-gray-300">₹{entry.oppChips || '0'}</td>
                  <td className="px-4 py-2 border-b border-gray-300">{inAmount}</td>
                  <td className="px-4 py-2 border-b border-gray-300">₹{entry.chips || '0'}</td>
                  <td className="px-4 py-2 border-b border-gray-300">{sender}</td>
                  <td className="px-4 py-2 border-b border-gray-300">{entry.trnxTypeTxt || 'N/A'}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AgentInPointTable;
