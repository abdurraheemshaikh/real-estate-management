
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, MessageSquare, TrendingUp, DollarSign, Plus, Eye } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const AgentDashboard = () => {
  const [stats] = useState({
    activeListings: 12,
    pendingInquiries: 6,
    monthlyRevenue: '$45,000',
    propertiesSold: 3
  });

  const [recentInquiries] = useState([
    {
      id: '1',
      customerName: 'Alice Johnson',
      propertyTitle: 'Modern Downtown Apartment',
      inquiryType: 'Viewing Request',
      date: '2024-01-15',
      status: 'new'
    },
    {
      id: '2',
      customerName: 'Robert Chen',
      propertyTitle: 'Luxury Waterfront Condo',
      inquiryType: 'Price Negotiation',
      date: '2024-01-14',
      status: 'responded'
    }
  ]);

  const [recentListings] = useState([
    {
      id: '1',
      title: 'Modern Downtown Apartment',
      price: '$450,000',
      status: 'active',
      views: 124,
      inquiries: 8,
      daysOnMarket: 12
    },
    {
      id: '2',
      title: 'Luxury Waterfront Condo',
      price: '$850,000',
      status: 'pending',
      views: 89,
      inquiries: 5,
      daysOnMarket: 7
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Agent Dashboard</h1>
          <p className="text-gray-600">Manage your listings and client relationships</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Listings</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.activeListings}</p>
                </div>
                <Building className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Inquiries</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.pendingInquiries}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-green-600" />
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
                <DollarSign className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Properties Sold</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.propertiesSold}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Inquiries */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Inquiries</CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{inquiry.customerName}</h3>
                        <p className="text-sm text-gray-600">{inquiry.propertyTitle}</p>
                        <p className="text-sm text-gray-500">{inquiry.inquiryType}</p>
                      </div>
                      <Badge variant={inquiry.status === 'new' ? 'default' : 'secondary'}>
                        {inquiry.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {new Date(inquiry.date).toLocaleDateString()}
                      </span>
                      <div className="flex space-x-2">
                        <Button size="sm">Respond</Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Listings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>My Listings</CardTitle>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Listing
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentListings.map((listing) => (
                  <div key={listing.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{listing.title}</h3>
                        <p className="text-lg font-semibold text-blue-600">{listing.price}</p>
                      </div>
                      <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                        {listing.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                      <div>Views: {listing.views}</div>
                      <div>Inquiries: {listing.inquiries}</div>
                      <div>Days: {listing.daysOnMarket}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
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

export default AgentDashboard;
