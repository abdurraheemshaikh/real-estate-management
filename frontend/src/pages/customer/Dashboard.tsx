import { useState, useEffect } from 'react';
import { MessageSquare, Star, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { api } from '@/api';

const CustomerMessages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedBuilderId, setSelectedBuilderId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [savedProjects, setSavedProjects] = useState([]);
  const customerId = 20; // Replace with dynamic customer ID
  const customerName = 'Ali'; // Replace with dynamic name

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/search/messages/customer/${customerId}`);
      setConversations(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const fetchSavedProjects = async () => {
    try {
      const res = await api.get(`/search/saved/${customerId}`);
      setSavedProjects(res.data);
    } catch (err) {
      console.error('Failed to fetch saved projects:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchSavedProjects();
  }, []);

  const handleSendMessage = async (msgText: string, builder: any) => {
    try {
      await api.post('/search/messages/send', {
        builder_id: builder.builder_id,
        customer_id: customerId,
        customer_name: customerName,
        sender: 'Customer',
        message: msgText,
      });

      setReplyText('');
      fetchMessages();
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleUnsave = async (projectId: number) => {
    try {
      await api.delete('/search/saved/remove', {
        params: {
          customer_id: customerId,
          project_id: projectId,
        },
      });
      setSavedProjects(savedProjects.filter((p) => p.id !== projectId));
    } catch (err) {
      console.error('Unsave failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">My Conversations</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-2">Builders</h3>
            <div className="space-y-2">
              {conversations.map((conv) => (
                <Button
                  key={conv.builder_id}
                  variant={conv.builder_id === selectedBuilderId ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setSelectedBuilderId(conv.builder_id)}
                >
                  {conv.builder_name}
                </Button>
              ))}
            </div>
          </div>
          <div className="col-span-3">
            {selectedBuilderId ? (
              <>
                <h3 className="text-xl font-semibold mb-4">
                  Chat with {
                    conversations.find(c => c.builder_id === selectedBuilderId)?.builder_name
                  }
                </h3>
                <div className="bg-white border rounded-lg shadow p-4 h-[400px] overflow-y-auto space-y-4">
                  {conversations.find(c => c.builder_id === selectedBuilderId)?.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3 rounded-lg max-w-[75%] ${
                        msg.sender === 'Customer' ? 'bg-blue-100 ml-auto' : 'bg-gray-100 mr-auto'
                      }`}
                    >
                      <div className="text-sm text-gray-800">{msg.sender}</div>
                      <div className="text-gray-700">{msg.message}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(msg.timestamp).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="Reply..."
                    className="flex-1 border rounded px-3 py-2"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <Button
                    onClick={() => {
                      const builder = conversations.find(c => c.builder_id === selectedBuilderId);
                      if (!replyText.trim() || !builder) return;
                      handleSendMessage(replyText, builder);
                    }}
                  >
                    Send
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-gray-600">Select a builder to view messages.</p>
            )}
          </div>
        </div>

        {/* Saved Projects */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Saved Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProjects.map((project: any) => (
              <Card key={project.id} className="bg-white shadow-sm">
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                  <p className="text-gray-600 mb-2">{project.location}</p>
                  <p className="text-gray-800 font-semibold">PKR {project.price.toLocaleString()}</p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Star className="w-4 h-4 mr-1" />
                      Review
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleUnsave(project.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Unsave
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomerMessages;
