
import { Star, MapPin, Phone, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Profile {
  id: string;
  name: string;
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  avatar: string;
  phone?: string;
  email?: string;
  experience?: number;
}

interface ProfileCardProps {
  profile: Profile;
  type: 'builder' | 'agent';
  onContact?: () => void;
  onViewProfile?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, type, onContact, onViewProfile }) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="w-16 h-16 max-w-[calc(100%-80px)]">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 truncate ">
                  {profile.name}
                </h3>
                <p className="text-gray-600 text-sm">{profile.title}</p>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{profile.location}</span>
                </div>
              </div>
              
              <Badge variant={type === 'builder' ? 'default' : 'secondary'}>
                {type === 'builder' ? 'Builder' : 'Agent'}
              </Badge>
            </div>

            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(profile.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {profile.rating} ({profile.reviewCount} reviews)
              </span>
            </div>

            {profile.experience && (
              <p className="text-sm text-gray-600 mt-1">
                {profile.experience} years experience
              </p>
            )}

            <div className="flex flex-wrap gap-2 mt-3">
              {profile.specialties.slice(0, 3).map((specialty, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {specialty}
                </Badge>
              ))}
              {profile.specialties.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{profile.specialties.length - 3} more
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <Button onClick={onViewProfile} variant="outline" size="sm">
                View Profile
              </Button>
              <Button onClick={onContact} size="sm">
                Contact
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
