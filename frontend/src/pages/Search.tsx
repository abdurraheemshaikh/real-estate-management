import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import ProfileCard from '../components/ProfileCard';
import { api } from '@/api.js';

export type SearchType = 'properties' | 'builders' | 'agents' | 'projects';

const Search = () => {
  const [searchParams] = useSearchParams();
  const searchType = searchParams.get('type') || 'properties';
  const location = searchParams.get('location') || '';
  const minRating = searchParams.get('rating') || '';

  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);

  // State for all
  const [builders, setBuilders] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);

  // Loaders and flags
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isAgentLoading, setIsAgentLoading] = useState(false);
  const [agentNotFound, setAgentNotFound] = useState(false);
  const [isProjectLoading, setIsProjectLoading] = useState(false);
  const [projectNotFound, setProjectNotFound] = useState(false);
  const [isPropertyLoading, setIsPropertyLoading] = useState(false);
  const [propertyNotFound, setPropertyNotFound] = useState(false);

  const handlePropertyTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setPropertyTypes([...propertyTypes, type]);
    } else {
      setPropertyTypes(propertyTypes.filter(t => t !== type));
    }
  };

  const getResults = () => {
    switch (searchType) {
      case 'builders': return builders;
      case 'agents': return agents;
      case 'projects': return projects;
      case 'properties': return properties;
      default: return [];
    }
  };
  const resultsCount = getResults().length;

  const getTitle = () => {
    switch (searchType) {
      case 'builders': return 'Find Builders';
      case 'agents': return 'Find Agents';
      case 'projects': return 'Find Projects';
      default: return 'Search Properties';
    }
  };

  useEffect(() => {
    const fetchBuilders = async () => {
      if (searchType !== 'builders') return;
      try {
        setIsLoading(true);
        setNotFound(false);
        const response = location
          ? await api.get(`/search/builders/${location}`)
          : await api.get('/search/builders');

        const data = response.data;
        if (!data || data.length === 0) {
          setNotFound(true);
          setBuilders([]);
        } else {
          const transformed = data.map((builder: any) => ({
            id: builder.id,
            name: builder.company_name,
            title: builder.username,
            location: builder.city,
            rating: builder.rating,
            reviewCount: builder.is_verified ? Math.floor(Math.random() * 50) + 10 : 0,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${builder.company_name}`,
            specialties: [],
            experience: Math.floor(Math.random() * 10) + 5,
            bio: builder.bio,
          }));
          setBuilders(transformed);
        }
      } catch (err) {
        console.error('Failed to fetch builders:', err);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBuilders();
  }, [searchType, location]);

  useEffect(() => {
    const fetchAgents = async () => {
      if (searchType !== 'agents') return;
      try {
        setIsAgentLoading(true);
        setAgentNotFound(false);
        const response = location
          ? await api.get(`/search/Agents/${location}`, { params: { rating: minRating } })
          : await api.get('/search/Agents', { params: { rating: minRating } });

        const data = response.data;
        if (!data || data.length === 0) {
          setAgentNotFound(true);
          setAgents([]);
        } else {
          const transformed = data.map((agent: any) => ({
            id: agent.user_id,
            name: agent.full_name || agent.company_name,
            title: agent.username,
            location: agent.city,
            rating: agent.rating,
            reviewCount: agent.is_verified ? Math.floor(Math.random() * 50) + 10 : 0,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${agent.username || agent.full_name}`,
            specialties: agent.specialties || [],
            experience: Math.floor(Math.random() * 10) + 5,
            bio: agent.bio,
          }));
          setAgents(transformed);
        }
      } catch (err) {
        console.error('Failed to fetch agents:', err);
        setAgentNotFound(true);
      } finally {
        setIsAgentLoading(false);
      }
    };
    fetchAgents();
  }, [searchType, location]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (searchType !== 'projects') return;
      try {
        setIsProjectLoading(true);
        setProjectNotFound(false);
        const response = location
          ? await api.get(`/search/projects/${location}`)
          : await api.get('/search/projects');

        const data = response.data;
        const transformed = data.map((project: any) => ({
          title: project.title,
          price: '',
          location: project.location,
          bedrooms: 0,
          bathrooms: 0,
          sqft: 0,
          image: project.image_urls?.[0]?.image_url || '',
          type: 'Project',
        }));
        setProjects(transformed);
        if (transformed.length === 0) setProjectNotFound(true);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setProjectNotFound(true);
      } finally {
        setIsProjectLoading(false);
      }
    };
    fetchProjects();
  }, [searchType, location]);

  useEffect(() => {
    const fetchProperties = async () => {
      if (searchType !== 'properties') return;
      try {
        setIsPropertyLoading(true);
        setPropertyNotFound(false);
        const response = location
          ? await api.get(`/search/project_city/${location}`)
          : await api.get('/search/projects');

        const data = response.data;
        const transformed = data.map((property: any) => ({
          id: property.id.toString(),
          title: property.title,
          price: property.price ? `$${property.price.toLocaleString()}` : '',
          location: property.location,
          bedrooms: property.bedrooms ,
          bathrooms: property.bathrooms,
          sqft: property.sqft,
          image: property.image_urls?.[0]?.image_url || '',
          type: property.type || 'Property',
        }));
        setProperties(transformed);
        if (transformed.length === 0) setPropertyNotFound(true);
      } catch (err) {
        console.error('Failed to fetch properties:', err);
        setPropertyNotFound(true);
      } finally {
        setIsPropertyLoading(false);
      }
    };
    fetchProperties();
  }, [searchType, location]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="bg-white border-b py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{getTitle()}</h1>
          <SearchBar showFilters={searchType === 'properties'} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            {searchType === 'properties' && (
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-4">Price Range</h3>
                    <Slider value={priceRange} onValueChange={setPriceRange} max={1000000} step={10000} />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0].toLocaleString()}</span>
                      <span>${priceRange[1].toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-4">Property Type</h3>
                    {['House', 'Apartment', 'Condo', 'Townhouse', 'Land'].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={propertyTypes.includes(type)}
                          onCheckedChange={(checked) => handlePropertyTypeChange(type, checked as boolean)}
                        />
                        <Label htmlFor={type}>{type}</Label>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="lg:w-3/4">
            <p className="text-gray-600 mb-6">{resultsCount} results found{location && ` in ${location}`}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {searchType === 'builders' && (
                isLoading ? <p>Loading builders...</p> :
                notFound ? <p>No builders found.</p> :
                builders.map((builder) => (
                  <ProfileCard key={builder.id} profile={builder} type="builder" />
                ))
              )}

              {searchType === 'agents' && (
                isAgentLoading ? <p>Loading agents...</p> :
                agentNotFound ? <p>No agents found.</p> :
                agents.map((agent) => (
                  <ProfileCard key={agent.id} profile={agent} type="agent" />
                ))
              )}

              {searchType === 'projects' && (
                isProjectLoading ? <p>Loading projects...</p> :
                projectNotFound ? <p>No projects found.</p> :
                projects.map((project) => (
                  <PropertyCard key={project.id} property={project} />
                ))
              )}

              {searchType === 'properties' && (
                isPropertyLoading ? <p>Loading properties...</p> :
                propertyNotFound ? <p>No properties found.</p> :
                properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Search;
