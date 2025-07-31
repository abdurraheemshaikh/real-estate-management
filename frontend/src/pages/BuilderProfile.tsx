
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, Award, Calendar, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const BuilderProfile = () => {
  const { id } = useParams();
  
  const [builder] = useState({
    id: '1',
    name: 'Michael Chen',
    title: 'Custom Home Builder & Contractor',
    location: 'Seattle, WA',
    rating: 4.9,
    reviewCount: 47,
    specialties: ['Custom Homes', 'Green Building', 'Modern Design', 'Renovations'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    experience: 12,
    phone: '(555) 123-4567',
    email: 'michael@chenbuilds.com',
    website: 'www.chenbuilds.com',
    description: 'With over 12 years of experience in custom home building, I specialize in creating unique, sustainable homes that reflect my clients\' vision and lifestyle. My team and I are committed to quality craftsmanship and exceptional customer service.',
    certifications: ['LEED Certified', 'NAHB Member', 'Licensed Contractor'],
    projects: [
      {
        id: '1',
        name: 'Modern Family Residence',
        image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop',
        type: 'Custom Home',
        size: '3,200 sq ft',
        year: 2023,
        location: 'Bellevue, WA'
      },
      {
        id: '2',
        name: 'Eco-Friendly Townhouse',
        image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
        type: 'Sustainable Build',
        size: '2,800 sq ft',
        year: 2023,
        location: 'Seattle, WA'
      }
    ],
    reviews: [
      {
        id: '1',
        author: 'Sarah Johnson',
        rating: 5,
        date: '2024-01-10',
        comment: 'Michael built our dream home exactly as we envisioned. His attention to detail and communication throughout the process was exceptional.'
      },
      {
        id: '2',
        author: 'David Miller',
        rating: 5,
        date: '2023-12-15',
        comment: 'Outstanding work on our kitchen renovation. Professional, timely, and the quality exceeded our expectations.'
      }
    ]
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Builder Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
              <Avatar className="w-32 h-32">
                <AvatarImage src={builder.avatar} alt={builder.name} />
                <AvatarFallback className="text-2xl">{builder.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{builder.name}</h1>
                    <p className="text-xl text-gray-600 mb-2">{builder.title}</p>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{builder.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(builder.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-lg font-medium">{builder.rating}</span>
                        <span className="ml-1 text-gray-600">({builder.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{builder.experience} years experience</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {builder.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline">{specialty}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Button size="lg" className="w-full md:w-auto">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Inquiry
                    </Button>
                    <Button variant="outline" size="lg" className="w-full md:w-auto">
                      <Phone className="w-4 h-4 mr-2" />
                      Call {builder.phone}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">About {builder.name}</h2>
                <p className="text-gray-700 leading-relaxed mb-6">{builder.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Certifications & Memberships</h3>
                    <div className="space-y-2">
                      {builder.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center">
                          <Award className="w-4 h-4 mr-2 text-blue-600" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Specializations</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {builder.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary">{specialty}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {builder.projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-3 left-3">{project.type}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{project.name}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-2" />
                        <span>{project.size}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Completed {project.year}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{project.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {builder.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{review.author}</h3>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-3 text-blue-600" />
                      <span>{builder.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-3 text-blue-600" />
                      <span>{builder.email}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                      <span>{builder.location}</span>
                    </div>
                  </div>
                  <div>
                    <Button size="lg" className="w-full mb-4">
                      Send Message
                    </Button>
                    <Button variant="outline" size="lg" className="w-full">
                      Schedule Consultation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default BuilderProfile;
