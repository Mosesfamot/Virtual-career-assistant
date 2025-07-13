// pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import './dashboard.css';
import axios from 'axios';

export default function Dashboard() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResponses() {
      try {
        const res = await axios.get('http://localhost:5000/api/my-responses');
        setResponses(res.data);
      } catch (err) {
        console.error('Error fetching responses:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchResponses();
  }, []);

  return (
    <div className="dashboard-container p-6">
      <h2 className="text-2xl font-bold mb-4">My Career Test Responses</h2>
      {loading ? (
        <p>Loading...</p>
      ) : responses.length === 0 ? (
        <p>No responses found.</p>
      ) : (
        <div className="space-y-4">
          {responses.map((item, idx) => (
            <div key={item._id} className="response-card p-4 border rounded bg-white">
              <p className="text-gray-700 text-sm mb-2">Submitted on: {new Date(item.createdAt).toLocaleString()}</p>
              <h4 className="font-semibold">Response #{idx + 1}</h4>
              <p className="whitespace-pre-wrap mt-2">{item.response}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
