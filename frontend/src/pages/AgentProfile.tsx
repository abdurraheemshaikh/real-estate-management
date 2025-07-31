
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
import PropertyCard from '../components/PropertyCard';

const AgentProfile = () => {
  const { id } = useParams();
  
  const [agent] = useState({
    id: '1',
    name: 'David Rodriguez',
    title: 'Senior Real Estate Agent',
    location: 'Seattle, WA',
    rating: 4.9,
    reviewCount: 89,
    specialties: ['Luxury Homes', 'First-time Buyers', 'Investment Properties', 'Commercial'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    experience: 15,
    phone: '(555) 987-6543',
    email: 'david@seattlerealty.com',
    website: 'www.davidrodriguezrealty.com',
    description: 'As a Seattle native with 15 years in real estate, I help clients navigate the Pacific Northwest market with confidence. Whether you\'re buying your first home or expanding your investment portfolio, I provide personalized service and market expertise.',
    certifications: ['Certified Residential Specialist', 'Accredited Buyer Representative', 'Luxury Home Marketing Specialist'],
    stats: {
      propertiesSold: 234,
      avgDaysOnMarket: 18,
      avgSalePrice: '$650K'
    }
  });

  const [listings] = useState([
    {
      id: '1',
      title: 'Luxury Waterfront Condo',
      price: '$850,000',
      location: 'Capitol Hill, Seattle',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1800,
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
      type: 'Condo',
      featured: true
    },
    {
      id: '2',
      title: 'Modern Family Home',
      price: '$750,000',
      location: 'Queen Anne, Seattle',
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2200,
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop',
      type: 'House'
    }
  ]);

  const [reviews] = useState([
    {
      id: '1',
      author: 'Jennifer Smith',
      rating: 5,
      date: '2024-01-12',
      comment: 'David made our home buying process seamless. His knowledge of the Seattle market is unparalleled, and he was always available to answer our questions.'
    },
    {
      id: '2',
      author: 'Michael Johnson',
      rating: 5,
      date: '2024-01-05',
      comment: 'Sold our house in just 12 days! David\'s marketing strategy and pricing advice were spot on. Highly recommend!'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Agent Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
              <Avatar className="w-32 h-32">
                <AvatarImage src={agent.avatar} alt={agent.name} />
                <AvatarFallback className="text-2xl">{agent.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{agent.name}</h1>
                    <p className="text-xl text-gray-600 mb-2">{agent.title}</p>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{agent.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(agent.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-lg font-medium">{agent.rating}</span>
                        <span className="ml-1 text-gray-600">({agent.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{agent.experience} years experience</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {agent.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline">{specialty}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Button size="lg" className="w-full md:w-auto">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" size="lg" className="w-full md:w-auto">
                      <Phone className="w-4 h-4 mr-2" />
                      Call {agent.phone}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{agent.stats.propertiesSold}</div>
              <div className="text-gray-600">Properties Sold</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{agent.stats.avgDaysOnMarket}</div>
              <div className="text-gray-600">Avg Days on Market</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{agent.stats.avgSalePrice}</div>
              <div className="text-gray-600">Avg Sale Price</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">About {agent.name}</h2>
                <p className="text-gray-700 leading-relaxed mb-6">{agent.description}</p>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Certifications & Credentials</h3>
                  <div className="space-y-2">
                    {agent.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center">
                        <Award className="w-4 h-4 mr-2 text-blue-600" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {listings.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onContact={() => console.log('Contact for property:', property.id)}
                  onFavorite={() => console.log('Favorite property:', property.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {reviews.map((review) => (
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
                      <span>{agent.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-3 text-blue-600" />
                      <span>{agent.email}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                      <span>{agent.location}</span>
                    </div>
                  </div>
                  <div>
                    <Button size="lg" className="w-full mb-4">
                      Send Message
                    </Button>
                    <Button variant="outline" size="lg" className="w-full">
                      Schedule Viewing
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

export default AgentProfile;
