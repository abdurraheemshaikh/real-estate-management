
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Building, UserCheck, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const AdminDashboard = () => {
  const [stats] = useState({
    totalUsers: 1247,
    pendingBuilders: 8,
    pendingAgents: 12,
    flaggedReports: 3,
    monthlyRevenue: '$125,000',
    platformGrowth: '+15%'
  });

  const [recentActivities] = useState([
    {
      id: '1',
      type: 'user_registration',
      message: 'New customer registered: John Smith',
      timestamp: '2024-01-15T10:30:00',
      status: 'info'
    },
    {
      id: '2',
      type: 'builder_verification',
      message: 'Builder verification pending: Michael Chen',
      timestamp: '2024-01-15T09:15:00',
      status: 'warning'
    },
    {
      id: '3',
      type: 'report',
      message: 'Property listing flagged for review',
      timestamp: '2024-01-15T08:45:00',
      status: 'error'
    }
  ]);

  const [pendingVerifications] = useState([
    {
      id: '1',
      name: 'Sarah Wilson',
      type: 'Builder',
      email: 'sarah@wilsonbuilds.com',
      submittedDate: '2024-01-12',
      documents: 3
    },
    {
      id: '2',
      name: 'Robert Johnson',
      type: 'Agent',
      email: 'robert@realestate.com',
      submittedDate: '2024-01-14',
      documents: 2
    }
  ]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registration': return <Users className="w-4 h-4" />;
      case 'builder_verification': return <Building className="w-4 h-4" />;
      case 'report': return <AlertTriangle className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Platform overview and management tools</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Builders</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.pendingBuilders}</p>
                </div>
                <Building className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Agents</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.pendingAgents}</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Flagged Reports</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.flaggedReports}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.monthlyRevenue}</p>
                </div>
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Platform Growth</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.platformGrowth}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Activities</CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Verifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Pending Verifications</CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingVerifications.map((verification) => (
                  <div key={verification.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{verification.name}</h3>
                        <p className="text-sm text-gray-600">{verification.email}</p>
                      </div>
                      <Badge variant="outline">{verification.type}</Badge>
                    </div>
                    <div className="text-sm text-gray-500 mb-3">
                      <p>Submitted: {new Date(verification.submittedDate).toLocaleDateString()}</p>
                      <p>Documents: {verification.documents} files</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm">Review</Button>
                      <Button variant="outline" size="sm">Approve</Button>
                      <Button variant="outline" size="sm">Reject</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
