
import { Link } from 'react-router-dom';
import { ArrowRight, Building, Users, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import ProfileCard from '../components/ProfileCard';

const Index = () => {
  const featuredProperties = [
    {
      id: '1',
      title: 'Modern Downtown Apartment',
      price: '$450,000',
      location: 'Downtown, Seattle',
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
      type: 'Apartment',
      featured: true
    },
    {
      id: '2',
      title: 'Suburban Family Home',
      price: '$680,000',
      location: 'Bellevue, WA',
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2400,
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop',
      type: 'House',
      featured: true
    },
    {
      id: '3',
      title: 'Luxury Waterfront Condo',
      price: '$850,000',
      location: 'Capitol Hill, Seattle',
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1800,
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
      type: 'Condo',
      featured: true
    }
  ];

  const featuredBuilders = [
    {
      id: '1',
      name: 'Michael Chen',
      title: 'Custom Home Builder',
      location: 'Seattle, WA',
      rating: 4.9,
      reviewCount: 47,
      specialties: ['Custom Homes', 'Green Building', 'Modern Design'],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      experience: 12
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      title: 'Commercial Builder',
      location: 'Bellevue, WA',
      rating: 4.8,
      reviewCount: 32,
      specialties: ['Commercial', 'Renovation', 'Eco-Friendly'],
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      experience: 8
    }
  ];

  const featuredAgents = [
    {
      id: '1',
      name: 'David Rodriguez',
      title: 'Senior Real Estate Agent',
      location: 'Seattle, WA',
      rating: 4.9,
      reviewCount: 89,
      specialties: ['Luxury Homes', 'First-time Buyers', 'Investment Properties'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      experience: 15
    },
    {
      id: '2',
      name: 'Emily Davis',
      title: 'Residential Specialist',
      location: 'Tacoma, WA',
      rating: 4.8,
      reviewCount: 56,
      specialties: ['Family Homes', 'Condos', 'Market Analysis'],
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      experience: 10
    }
  ];

  const stats = [
    { icon: Building, label: 'Properties Listed', value: '10,000+' },
    { icon: Users, label: 'Happy Customers', value: '5,000+' },
    { icon: Star, label: 'Average Rating', value: '4.8' },
    { icon: TrendingUp, label: 'Success Rate', value: '95%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Find Your Dream Property
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Connect with top builders, agents, and discover amazing properties in your area
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium properties
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onContact={() => console.log('Contact for property:', property.id)}
                onFavorite={() => console.log('Favorite property:', property.id)}
              />
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild size="lg">
              <Link to="/search">
                View All Properties
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Builders */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Top Builders
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Work with experienced builders who bring your vision to life
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {featuredBuilders.map((builder) => (
              <ProfileCard
                key={builder.id}
                profile={builder}
                type="builder"
                onContact={() => console.log('Contact builder:', builder.id)}
                onViewProfile={() => console.log('View builder profile:', builder.id)}
              />
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/search?type=builders">
                View All Builders
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Agents */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Expert Agents
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get guidance from local experts who know the market inside out
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {featuredAgents.map((agent) => (
              <ProfileCard
                key={agent.id}
                profile={agent}
                type="agent"
                onContact={() => console.log('Contact agent:', agent.id)}
                onViewProfile={() => console.log('View agent profile:', agent.id)}
              />
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/search?type=agents">
                View All Agents
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect property with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/register">Sign Up Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              <Link to="/search">Browse Properties</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
