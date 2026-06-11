import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus } from 'react-icons/fi';

interface Delivery {
  id: string;
  status: string;
  quantity: number;
}

const Deliveries: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/deliveries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeliveries(response.data);
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Entregas</h1>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <FiPlus /> Nueva Entrega
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
              <th className="px-6 py-3 text-right text-sm font-semibold">Cantidad</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.length > 0 ? deliveries.map((delivery) => (
              <tr key={delivery.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 text-sm font-mono">{delivery.id.substring(0, 8)}...</td>
                <td className="px-6 py-3 text-sm text-right">{delivery.quantity}</td>
                <td className="px-6 py-3 text-sm"><span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100">{delivery.status}</span></td>
              </tr>
            )) : (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">No hay entregas</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Deliveries;
