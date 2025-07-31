import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SearchBarProps {
  className?: string;
  showFilters?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ className = '', showFilters = true }) => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [searchType, setSearchType] = useState('builders'); // Default
  const [minRating, setMinRating] = useState('');


  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (searchType) params.set('type', searchType);
    if (priceRange && searchType === 'properties') params.set('price', priceRange);
    if (propertyType && searchType === 'properties') params.set('propertyType', propertyType);
    if (minRating) params.set('rating', minRating);


    navigate(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className={`w-full ${className}`}>
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Location Input */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Enter city, state, or ZIP"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Type Selector */}
          <Select value={searchType} onValueChange={setSearchType}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Search For" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="builders">Builders</SelectItem>
              <SelectItem value="agents">Agents</SelectItem>
              <SelectItem value="properties">Properties</SelectItem>
            </SelectContent>
          </Select>

          {/* Filters only for property search */}
          {showFilters && searchType === 'properties' && (
            <>
              {/* Property Type */}
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>

              {/* Price Range */}
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-100000">Under $100K</SelectItem>
                  <SelectItem value="100000-300000">$100K - $300K</SelectItem>
                  <SelectItem value="300000-500000">$300K - $500K</SelectItem>
                  <SelectItem value="500000-750000">$500K - $750K</SelectItem>
                  <SelectItem value="750000-1000000">$750K - $1M</SelectItem>
                  <SelectItem value="1000000+">$1M+</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}

          {/* Search Button */}
          <Button type="submit" className="h-12 bg-blue-600 hover:bg-blue-700">
            <Search className="w-5 h-5 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
