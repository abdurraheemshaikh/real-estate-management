import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Save, Camera } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { api } from '@/api.js';
import { useAuth } from '@/contexts/AuthContext';

const BuilderProfile = () => {
  const user = useAuth()
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [builderProfile, setBuilderProfile] = useState({
    company_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    price: '',
    bio: '',
    password: ''
  });

  const [logo, setLogo] = useState<File | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      

      try {
       
        const response = await api.get(`/search/Get_Profile/${user?.user?.username || storedUser?.username}`);
        const data = response.data;

        setBuilderProfile({
          company_name: data.company_name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          city: data.city || '',
          price: data.price?.toString() || '',
          bio: data.bio || '',
          password: ''
        });
      } catch (err) {
        console.error('Failed to fetch builder profile:', err);
        setMessage('Could not load profile.');
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setBuilderProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(file);
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      Object.entries(builderProfile).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      if (logo) formData.append('logo', logo);
      formData.append('username', storedUser?.username || '');

const payload = {
  company_name: formData.get('company_name') || 'Default Company',
  phone: formData.get('phone') || '1234567890',
  email: formData.get('email') || '',
  address: formData.get('address') || '123 Default St',
  city: formData.get('city') || 'Default City',
  price: formData.get('price') || '1000',
  bio: formData.get('bio') || 'Default bio',
};

await api.post(`/search/Update_builders/${user.user.id}`, payload);

      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      setMessage('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Builder Profile</h1>
          <p className="text-gray-600">Update your company and contact details</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Profile Information</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={storedUser?.avatar} alt={storedUser?.name} />
                  <AvatarFallback className="text-2xl">
                    {storedUser?.name?.charAt(0) || 'B'}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="absolute opacity-0 w-8 h-8 cursor-pointer bottom-0 right-0"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                value={builderProfile.company_name}
                onChange={(e) => handleInputChange('company_name', e.target.value)}
                disabled={!isEditing}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={builderProfile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={builderProfile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={builderProfile.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={builderProfile.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="price">Price Range</Label>
                <Input
                  id="price"
                  value={builderProfile.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  value={builderProfile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={builderProfile.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              {isEditing && (
                <Button onClick={handleSave} disabled={loading} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              )}

              {message && (
                <div className={`text-sm mt-2 ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                  {message}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default BuilderProfile;
