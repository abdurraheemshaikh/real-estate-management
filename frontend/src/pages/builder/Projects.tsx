
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Calendar, MapPin } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const BuilderProjects = () => {
  const [projects] = useState([
    {
      id: '1',
      name: 'Modern Family Residence',
      client: 'The Johnson Family',
      type: 'Custom Home',
      status: 'in-progress',
      budget: '$650,000',
      startDate: '2023-08-15',
      expectedCompletion: '2024-03-15',
      completion: 75,
      location: 'Bellevue, WA',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop'
    },
    {
      id: '2',
      name: 'Luxury Townhouse',
      client: 'Miller Family',
      type: 'Townhouse',
      status: 'completed',
      budget: '$480,000',
      startDate: '2023-03-01',
      expectedCompletion: '2023-12-01',
      completion: 100,
      location: 'Seattle, WA',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop'
    },
    {
      id: '3',
      name: 'Eco-Friendly Duplex',
      client: 'Green Living LLC',
      type: 'Multi-family',
      status: 'planning',
      budget: '$720,000',
      startDate: '2024-02-01',
      expectedCompletion: '2024-10-01',
      completion: 5,
      location: 'Kirkland, WA',
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'on-hold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (completion: number) => {
    if (completion >= 80) return 'bg-green-600';
    if (completion >= 50) return 'bg-blue-600';
    if (completion >= 25) return 'bg-yellow-600';
    return 'bg-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Projects</h1>
            <p className="text-gray-600">Manage and track your construction projects</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className={`absolute top-3 left-3 ${getStatusColor(project.status)}`}>
                  {project.status.replace('-', ' ')}
                </Badge>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Client: {project.client}</p>
                  <p>Type: {project.type}</p>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {project.location}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Budget</p>
                    <p className="font-semibold">{project.budget}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Progress</p>
                    <p className="font-semibold">{project.completion}%</p>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Completion</span>
                    <span>{project.completion}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${getProgressColor(project.completion)}`}
                      style={{ width: `${project.completion}%` }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    Started: {new Date(project.startDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    Due: {new Date(project.expectedCompletion).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BuilderProjects;
