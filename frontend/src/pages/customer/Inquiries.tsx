
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, User, Calendar, MessageSquare, Phone } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const CustomerInquiries = () => {
  const [inquiries] = useState([
    {
      id: '1',
      type: 'property',
      subject: 'Modern Downtown Apartment',
      recipient: 'John Smith (Agent)',
      status: 'pending',
      date: '2024-01-15',
      message: 'I am interested in viewing this property. When would be a good time?',
      response: null
    },
    {
      id: '2',
      type: 'builder',
      subject: 'Custom Home Build',
      recipient: 'Michael Chen (Builder)',
      status: 'responded',
      date: '2024-01-12',
      message: 'I would like to discuss building a custom home. What is your availability?',
      response: 'Thank you for your interest! I would be happy to discuss your project. I have availability this week for a consultation.'
    },
    {
      id: '3',
      type: 'property',
      subject: 'Suburban Family Home',
      recipient: 'Sarah Johnson (Agent)',
      status: 'completed',
      date: '2024-01-10',
      message: 'Can you provide more details about the neighborhood and schools?',
      response: 'This is a great family neighborhood with excellent schools nearby. The elementary school is rated 9/10.'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'responded': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'builder' ? <Building className="w-5 h-5" /> : <User className="w-5 h-5" />;
  };

  const filterInquiries = (status?: string) => {
    if (!status) return inquiries;
    return inquiries.filter(inquiry => inquiry.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Inquiries</h1>
          <p className="text-gray-600">Track your property and builder inquiries</p>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="responded">Responded</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {inquiries.map((inquiry) => (
              <Card key={inquiry.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {getTypeIcon(inquiry.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{inquiry.subject}</CardTitle>
                        <p className="text-gray-600 mt-1">To: {inquiry.recipient}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(inquiry.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(inquiry.status)}>
                      {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Your Message:</h4>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{inquiry.message}</p>
                    </div>
                    
                    {inquiry.response && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Response:</h4>
                        <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">{inquiry.response}</p>
                      </div>
                    )}
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Send Follow-up
                      </Button>
                      {inquiry.status === 'responded' && (
                        <Button size="sm">
                          <Phone className="w-4 h-4 mr-2" />
                          Schedule Call
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {filterInquiries('pending').map((inquiry) => (
              <Card key={inquiry.id} className="hover:shadow-md transition-shadow">
                {/* Same card structure as above */}
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {getTypeIcon(inquiry.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{inquiry.subject}</CardTitle>
                        <p className="text-gray-600 mt-1">To: {inquiry.recipient}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(inquiry.status)}>
                      {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="responded" className="space-y-4">
            {filterInquiries('responded').map((inquiry) => (
              <Card key={inquiry.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {getTypeIcon(inquiry.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{inquiry.subject}</CardTitle>
                        <p className="text-gray-600 mt-1">To: {inquiry.recipient}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(inquiry.status)}>
                      {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {filterInquiries('completed').map((inquiry) => (
              <Card key={inquiry.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {getTypeIcon(inquiry.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{inquiry.subject}</CardTitle>
                        <p className="text-gray-600 mt-1">To: {inquiry.recipient}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(inquiry.status)}>
                      {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default CustomerInquiries;
