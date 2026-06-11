import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiPlus } from 'react-icons/fi';

interface PurchaseOrder {
  id: string;
  supplier_id: string;
  status: string;
}

const PurchaseOrders: React.FC = () => {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/purchase-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Órdenes de Compra</h1>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <FiPlus /> Nueva Orden
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">ID Orden</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Proveedor</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 text-sm font-mono">{order.id.substring(0, 8)}...</td>
                <td className="px-6 py-3 text-sm">{order.supplier_id || 'N/A'}</td>
                <td className="px-6 py-3 text-sm"><span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100">{order.status}</span></td>
              </tr>
            )) : (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">No hay órdenes de compra</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseOrders;
