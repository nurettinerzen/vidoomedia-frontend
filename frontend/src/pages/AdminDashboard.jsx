import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LogOut, Users, Briefcase, Download } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function AdminDashboard() {
  const [driverApps, setDriverApps] = useState([]);
  const [advertiserSubs, setAdvertiserSubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin-ridemedia-8432');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [driversRes, advertisersRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/drivers/applications`),
        axios.get(`${BACKEND_URL}/api/advertisers/submissions`)
      ]);
      
      setDriverApps(driversRes.data);
      setAdvertiserSubs(advertisersRes.data);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    toast.success('Logged out successfully');
    navigate('/admin-ridemedia-8432');
  };

  const updateDriverStatus = async (id, status) => {
    try {
      await axios.put(`${BACKEND_URL}/api/admin/drivers/${id}/status`, { status });
      toast.success('Status updated');
      fetchData();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const updateAdvertiserStatus = async (id, status) => {
    try {
      await axios.put(`${BACKEND_URL}/api/admin/advertisers/${id}/status`, { status });
      toast.success('Status updated');
      fetchData();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const exportToCSV = (data, filename) => {
    if (data.length === 0) {
      toast.error('No data to export');
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => {
        const value = row[header] || '';
        return `"${String(value).replace(/"/g, '""')}"`;
      }).join(','))
    ].join('\\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('CSV exported successfully');
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      contacted: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return <Badge className={colors[status] || 'bg-gray-100 text-gray-800'}>{status}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">RM</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">RideMedia Admin</h1>
                <p className="text-sm text-gray-600">Dashboard</p>
              </div>
            </div>
            <Button 
              onClick={handleLogout} 
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50"
              data-testid="logout-button"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Driver Applications</p>
                  <p className="text-3xl font-bold text-gray-900">{driverApps.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="text-blue-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Advertiser Inquiries</p>
                  <p className="text-3xl font-bold text-gray-900">{advertiserSubs.length}</p>
                </div>
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="text-cyan-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending Drivers</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {driverApps.filter(app => app.status === 'pending').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Users className="text-yellow-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending Advertisers</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {advertiserSubs.filter(sub => sub.status === 'pending').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="text-green-600" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="drivers" className="space-y-6">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="drivers" data-testid="drivers-tab">
              Driver Applications
            </TabsTrigger>
            <TabsTrigger value="advertisers" data-testid="advertisers-tab">
              Advertiser Inquiries
            </TabsTrigger>
          </TabsList>

          {/* Driver Applications Tab */}
          <TabsContent value="drivers">
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Driver Applications</CardTitle>
                <Button 
                  onClick={() => exportToCSV(driverApps, 'driver_applications')}
                  variant="outline"
                  size="sm"
                  data-testid="export-drivers-button"
                >
                  <Download size={16} className="mr-2" />
                  Export CSV
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full" data-testid="drivers-table">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">City</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Platform</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Vehicle</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {driverApps.map((app) => (
                        <tr key={app.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{app.name}</td>
                          <td className="py-3 px-4">{app.email}</td>
                          <td className="py-3 px-4">{app.city}</td>
                          <td className="py-3 px-4">{app.platform}</td>
                          <td className="py-3 px-4 text-sm">
                            {app.vehicle_year} {app.vehicle_make} {app.vehicle_model}
                          </td>
                          <td className="py-3 px-4">{getStatusBadge(app.status)}</td>
                          <td className="py-3 px-4">
                            <Select 
                              value={app.status}
                              onValueChange={(value) => updateDriverStatus(app.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {driverApps.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      No driver applications yet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advertiser Inquiries Tab */}
          <TabsContent value="advertisers">
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Advertiser Inquiries</CardTitle>
                <Button 
                  onClick={() => exportToCSV(advertiserSubs, 'advertiser_submissions')}
                  variant="outline"
                  size="sm"
                  data-testid="export-advertisers-button"
                >
                  <Download size={16} className="mr-2" />
                  Export CSV
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full" data-testid="advertisers-table">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Company</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Contact</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Budget</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Cities</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {advertiserSubs.map((sub) => (
                        <tr key={sub.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{sub.company_name}</td>
                          <td className="py-3 px-4">{sub.contact_name}</td>
                          <td className="py-3 px-4">{sub.email}</td>
                          <td className="py-3 px-4 text-sm">{sub.budget_range}</td>
                          <td className="py-3 px-4 text-sm">{sub.cities}</td>
                          <td className="py-3 px-4">{getStatusBadge(sub.status)}</td>
                          <td className="py-3 px-4">
                            <Select 
                              value={sub.status}
                              onValueChange={(value) => updateAdvertiserStatus(sub.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {advertiserSubs.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      No advertiser inquiries yet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
