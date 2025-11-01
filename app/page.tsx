'use client';

import { useState } from 'react';
import { Train, Clock, MapPin, Users, Calendar, Plus, Search, Edit, Trash2, TrendingUp } from 'lucide-react';

interface TrainData {
  id: string;
  number: string;
  name: string;
  route: string;
  departure: string;
  arrival: string;
  status: 'On Time' | 'Delayed' | 'Cancelled';
  capacity: number;
  occupied: number;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'trains' | 'schedule' | 'add'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [trains, setTrains] = useState<TrainData[]>([
    {
      id: '1',
      number: 'TR001',
      name: 'Express Bullet',
      route: 'New York - Boston',
      departure: '08:00 AM',
      arrival: '12:30 PM',
      status: 'On Time',
      capacity: 500,
      occupied: 423,
    },
    {
      id: '2',
      number: 'TR002',
      name: 'Coastal Runner',
      route: 'Los Angeles - San Francisco',
      departure: '09:15 AM',
      arrival: '05:45 PM',
      status: 'Delayed',
      capacity: 450,
      occupied: 387,
    },
    {
      id: '3',
      number: 'TR003',
      name: 'Mountain Express',
      route: 'Denver - Seattle',
      departure: '06:30 AM',
      arrival: '08:00 PM',
      status: 'On Time',
      capacity: 600,
      occupied: 521,
    },
    {
      id: '4',
      number: 'TR004',
      name: 'Southern Star',
      route: 'Miami - Atlanta',
      departure: '11:00 AM',
      arrival: '06:30 PM',
      status: 'On Time',
      capacity: 400,
      occupied: 312,
    },
  ]);

  const [formData, setFormData] = useState({
    number: '',
    name: '',
    route: '',
    departure: '',
    arrival: '',
    capacity: '',
    occupied: '',
  });

  const filteredTrains = trains.filter(
    (train) =>
      train.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      train.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      train.route.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTrain = () => {
    if (formData.number && formData.name && formData.route) {
      const newTrain: TrainData = {
        id: Date.now().toString(),
        number: formData.number,
        name: formData.name,
        route: formData.route,
        departure: formData.departure,
        arrival: formData.arrival,
        status: 'On Time',
        capacity: parseInt(formData.capacity) || 0,
        occupied: parseInt(formData.occupied) || 0,
      };
      setTrains([...trains, newTrain]);
      setFormData({
        number: '',
        name: '',
        route: '',
        departure: '',
        arrival: '',
        capacity: '',
        occupied: '',
      });
      setActiveTab('trains');
    }
  };

  const handleDeleteTrain = (id: string) => {
    setTrains(trains.filter((train) => train.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Time':
        return 'text-green-600 bg-green-100';
      case 'Delayed':
        return 'text-yellow-600 bg-yellow-100';
      case 'Cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const totalCapacity = trains.reduce((sum, train) => sum + train.capacity, 0);
  const totalOccupied = trains.reduce((sum, train) => sum + train.occupied, 0);
  const avgOccupancy = totalCapacity > 0 ? ((totalOccupied / totalCapacity) * 100).toFixed(1) : 0;
  const onTimeTrains = trains.filter((t) => t.status === 'On Time').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Train className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Train Manager</h1>
            </div>
            <div className="hidden sm:flex space-x-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('trains')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'trains'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Trains
              </button>
              <button
                onClick={() => setActiveTab('schedule')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'schedule'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Schedule
              </button>
              <button
                onClick={() => setActiveTab('add')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  activeTab === 'add'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Add Train</span>
              </button>
            </div>
          </div>
          {/* Mobile Navigation */}
          <div className="flex sm:hidden mt-4 space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('trains')}
              className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                activeTab === 'trains'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Trains
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                activeTab === 'schedule'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Schedule
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                activeTab === 'add'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Add Train
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Trains</p>
                    <p className="text-3xl font-bold text-gray-900">{trains.length}</p>
                  </div>
                  <Train className="w-12 h-12 text-blue-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">On Time</p>
                    <p className="text-3xl font-bold text-green-600">{onTimeTrains}</p>
                  </div>
                  <Clock className="w-12 h-12 text-green-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Occupancy</p>
                    <p className="text-3xl font-bold text-purple-600">{avgOccupancy}%</p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-purple-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Passengers</p>
                    <p className="text-3xl font-bold text-orange-600">{totalOccupied}</p>
                  </div>
                  <Users className="w-12 h-12 text-orange-600" />
                </div>
              </div>
            </div>

            {/* Recent Trains */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Active Trains</h3>
              <div className="space-y-3">
                {trains.slice(0, 3).map((train) => (
                  <div
                    key={train.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Train className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{train.name}</p>
                        <p className="text-sm text-gray-600">{train.route}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm">
                        <p className="text-gray-600">Departure: {train.departure}</p>
                        <p className="text-gray-600">Arrival: {train.arrival}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          train.status
                        )}`}
                      >
                        {train.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Trains Tab */}
        {activeTab === 'trains' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-3xl font-bold text-gray-900">Train Fleet</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search trains..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTrains.map((train) => (
                <div
                  key={train.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{train.name}</h3>
                      <p className="text-sm text-gray-600">{train.number}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteTrain(train.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span>{train.route}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-700">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span>
                        {train.departure} - {train.arrival}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-700">
                      <Users className="w-5 h-5 text-gray-400" />
                      <span>
                        {train.occupied} / {train.capacity} passengers
                      </span>
                    </div>

                    <div className="pt-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Occupancy</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {((train.occupied / train.capacity) * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{
                            width: `${(train.occupied / train.capacity) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          train.status
                        )}`}
                      >
                        {train.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Train Schedule</h2>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Train
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Route
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Departure
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Arrival
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {trains
                      .sort((a, b) => a.departure.localeCompare(b.departure))
                      .map((train) => (
                        <tr key={train.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Train className="w-5 h-5 text-blue-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {train.name}
                                </div>
                                <div className="text-sm text-gray-500">{train.number}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{train.route}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{train.departure}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{train.arrival}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                train.status
                              )}`}
                            >
                              {train.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Add Train Tab */}
        {activeTab === 'add' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Add New Train</h2>

            <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Train Number
                  </label>
                  <input
                    type="text"
                    value={formData.number}
                    onChange={(e) =>
                      setFormData({ ...formData, number: e.target.value })
                    }
                    placeholder="TR005"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Train Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Pacific Express"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Route
                  </label>
                  <input
                    type="text"
                    value={formData.route}
                    onChange={(e) =>
                      setFormData({ ...formData, route: e.target.value })
                    }
                    placeholder="Chicago - Detroit"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Departure Time
                    </label>
                    <input
                      type="text"
                      value={formData.departure}
                      onChange={(e) =>
                        setFormData({ ...formData, departure: e.target.value })
                      }
                      placeholder="10:00 AM"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Arrival Time
                    </label>
                    <input
                      type="text"
                      value={formData.arrival}
                      onChange={(e) =>
                        setFormData({ ...formData, arrival: e.target.value })
                      }
                      placeholder="04:00 PM"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Capacity
                    </label>
                    <input
                      type="number"
                      value={formData.capacity}
                      onChange={(e) =>
                        setFormData({ ...formData, capacity: e.target.value })
                      }
                      placeholder="500"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Occupancy
                    </label>
                    <input
                      type="number"
                      value={formData.occupied}
                      onChange={(e) =>
                        setFormData({ ...formData, occupied: e.target.value })
                      }
                      placeholder="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddTrain}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Train</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
