
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, Building, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const CustomerReviews = () => {
  const [reviews] = useState([
    {
      id: '1',
      type: 'builder',
      recipientName: 'Michael Chen',
      recipientTitle: 'Custom Home Builder',
      recipientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      comment: 'Michael built our dream home exactly as we envisioned. His attention to detail and communication throughout the process was exceptional.',
      date: '2024-01-10',
      status: 'published'
    },
    {
      id: '2',
      type: 'agent',
      recipientName: 'Sarah Johnson',
      recipientTitle: 'Real Estate Agent',
      recipientAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      rating: 4,
      comment: 'Sarah helped us find our perfect home in Bellevue. She was very knowledgeable about the area and guided us through the entire process.',
      date: '2023-12-15',
      status: 'published'
    }
  ]);

  const [pendingReviews] = useState([
    {
      id: '3',
      type: 'agent',
      recipientName: 'David Rodriguez',
      recipientTitle: 'Senior Real Estate Agent',
      recipientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      projectTitle: 'Downtown Condo Purchase',
      date: '2024-01-15'
    }
  ]);

  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: ''
  });

  const getTypeIcon = (type: string) => {
    return type === 'builder' ? <Building className="w-5 h-5" /> : <User className="w-5 h-5" />;
  };

  const handleRatingClick = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Reviews</h1>
          <p className="text-gray-600">Share your experiences and manage your reviews</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Reviews */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingReviews.map((pending) => (
                  <div key={pending.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3 mb-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={pending.recipientAvatar} alt={pending.recipientName} />
                        <AvatarFallback>{pending.recipientName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{pending.recipientName}</h3>
                        <p className="text-sm text-gray-600">{pending.recipientTitle}</p>
                        <p className="text-sm text-gray-500">{pending.projectTitle}</p>
                      </div>
                      <Badge variant="outline">
                        {pending.type}
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Rating
                        </label>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => handleRatingClick(star)}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`w-6 h-6 ${
                                  star <= newReview.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Review
                        </label>
                        <Textarea
                          placeholder="Share your experience..."
                          value={newReview.comment}
                          onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                          rows={3}
                        />
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm">Submit Review</Button>
                        <Button variant="outline" size="sm">Skip</Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {pendingReviews.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No pending reviews at the moment
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Published Reviews */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Published Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {getTypeIcon(review.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{review.recipientName}</h3>
                        <p className="text-sm text-gray-600">{review.recipientTitle}</p>
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
                          <span className="ml-2 text-sm text-gray-600">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {review.status}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {review.comment}
                    </p>
                    
                    <div className="flex space-x-2 mt-3">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Delete</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CustomerReviews;
