import React, { useEffect, useState } from 'react';
import './admin.css';
import axios from 'axios';

export default function AdminView() {
  const [allResponses, setAllResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  async function fetchAll() {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/all-responses', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAllResponses(res.data);
    } catch (err) {
      setError('Unauthorized or failed to fetch data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  fetchAll();
}, []);

  return (
    <div className="admin-container p-6">
      <h2 className="text-2xl font-bold mb-4">All Career Assistant Responses</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : allResponses.length === 0 ? (
        <p>No responses found.</p>
      ) : (
        <div className="space-y-4">
          {allResponses.map((item, idx) => (
            <div key={item._id} className="admin-response p-4 border rounded bg-white">
              <p className="text-gray-500 text-sm mb-1">
                Submitted: {new Date(item.createdAt).toLocaleString()}
              </p>
              <p className="userid text-sm text-gray-600 mb-2">
                <strong>User ID:</strong> {item.userId}
              </p>
              <h4 className="font-semibold">Response #{idx + 1}</h4>
              <p className="whitespace-pre-wrap mt-2">{item.response}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
