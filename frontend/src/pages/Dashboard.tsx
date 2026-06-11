import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface KPI {
  total_target_cost: number;
  total_actual_cost: number;
  total_products: number;
}

const Dashboard: React.FC = () => {
  const [kpis, setKpis] = useState<KPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const kpisRes = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard/kpis`, { headers });
      setKpis(kpisRes.data.costAnalysis);
    } catch (err: any) {
      setError('Error al cargar datos del dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen"><div className="text-xl text-gray-600">Cargando...</div></div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Productos Totales</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{kpis?.total_products || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Costo Target</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">${kpis?.total_target_cost?.toFixed(2) || '0.00'}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Costo Real</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">${kpis?.total_actual_cost?.toFixed(2) || '0.00'}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Estado</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">Activo ✓</p>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">{error}</div>}
    </div>
  );
};

export default Dashboard;
