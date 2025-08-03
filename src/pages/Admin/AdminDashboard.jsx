import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [codAvailable, setCodAvailable] = useState(false);

  useEffect(() => {
    fetchCODStatus();
  }, []);

  const fetchCODStatus = async () => {
    try {
      const res = await axios.get('/api/admin/cod-status');
      setCodAvailable(res.data.codAvailable);
    } catch (err) {
      console.error('Error fetching COD status', err);
    }
  };

  const toggleCOD = async (newStatus) => {
    try {
      await axios.post('/api/admin/update-cod', { codAvailable: newStatus });
      setCodAvailable(newStatus);
    } catch (err) {
      console.error('Error updating COD status', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Panel</h2>
      <label>
        <input
          type="checkbox"
          checked={codAvailable}
          onChange={(e) => toggleCOD(e.target.checked)}
        />
        Enable Cash On Delivery
      </label>
    </div>
  );
};

export default AdminPanel;
