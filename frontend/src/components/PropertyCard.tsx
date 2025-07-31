import { Heart, MapPin, Bed, Bath, Square, Pencil } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/api';

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
  type: string;
  featured?: boolean;
}

interface PropertyCardProps {
  property: Property;
  editable?: boolean; // <-- New prop
  onContact?: () => void;
  onFavorite?: () => void;
  onEdit?: (property: Property) => void; // <-- New prop
   actionLabel?: string; // 👈 Add this line
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  editable = false,
  onContact,
  onFavorite,
  onEdit,
  actionLabel = 'Contact', // 👈 Default value for actionLabel
}) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {property.featured && (
          <Badge className="absolute top-3 left-3 bg-blue-600">Featured</Badge>
        )}
<Button
  variant="ghost"
  size="sm"
  className="absolute top-3 right-3 bg-white/80 hover:bg-white"
  onClick={async () => {
    if (onFavorite) {
      onFavorite();
    }
    if (property ) {
      try {
        await api.post('/search/saved/add', null, {
  params: {
    customer_id: 20,
    project_id: property.id, // Use property.id to save the project
  }}

        );
        console.log('Project saved to favorites!');
      } catch (err) {
        console.error('Error saving to favorites:', err);
      }
    }
  }}
>
  <Heart className="w-4 h-4" />
</Button>

        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary">{property.type}</Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Bed className="w-4 h-4 mr-1" />
                <span>{property.bedrooms}</span>
              </div>
              <div className="flex items-center">
                <Bath className="w-4 h-4 mr-1" />
                <span>{property.bathrooms}</span>
              </div>
              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1" />
                <span>{property.sqft.toLocaleString()} sqft</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">
              {property.price}
            </div>
            <Button onClick={onContact} size="sm">
  {actionLabel || 'Contact'}
</Button>

          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
