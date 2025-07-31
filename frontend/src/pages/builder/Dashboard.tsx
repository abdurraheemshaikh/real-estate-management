import { useState, useEffect } from 'react';
import { Building, MessageSquare, Star, TrendingUp, Plus, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import PropertyCard from '@/components/PropertyCard';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { api } from '@/api';







const BuilderDashboard = () => {
  const [conversations, setConversations] = useState([]);
const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
const [replyText, setReplyText] = useState('');
const fetchMessages = async () => {
  try {
    const res = await api.get('/search/messages/21');
    setConversations(res.data);
  } catch (err) {
    console.error('Error fetching messages:', err);
  }
};

useEffect(() => {
  fetchMessages();
}, []);

  const [messages, setMessages] = useState([
  {
    id: 1,
    sender: 'Customer',
    message: 'Hi, I’m interested in the Modern Family Home project.',
    timestamp: '2025-07-09T12:00:00',
  },
  {
    id: 2,
    sender: 'Builder',
    message: 'Thanks for your interest! Would you like a site visit?',
    timestamp: '2025-07-09T12:05:00',
  },
]);

const handleSendMessage = async (msgText: string, customer: any) => {
  try {
    await api.post('/search/messages/send', {
      builder_id: 21,
      customer_id: customer.id,
      customer_name: customer.name,
      sender: "Builder", // or "Customer"
      message: msgText
    });

    console.log("Message sent!");
    // Optionally re-fetch messages here or push the new message to local state
  } catch (err) {
    console.error("Failed to send message:", err);
  }
};

  const [editProject, setEditProject] = useState<any>(null);
const [isEditOpen, setIsEditOpen] = useState(false);
  const [myProjects, setMyProjects] = useState([]);
  const [stats] = useState({
    totalProjects: 24,
    activeInquiries: 8,
    avgRating: 4.8,
    completedProjects: 16
  });

  const [openAddProject, setOpenAddProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    location: '',
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    sqft: 0,
    image_urls: [
      {
        id: 1,
        image_url: 'https://source.unsplash.com/featured/?house,villa,modern'
      }
    ]
  });


  const fetchMyProjects = async () => {
    try {
      const res = await api.get('/search/projects/21'); // Adjust ID dynamically in production
      setMyProjects(res.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  useEffect(() => {
    fetchMyProjects();
  }, []);

  const handleAddProject = async () => {
    try {
      await api.post('/search/projects/create', {
        ...newProject,
        builder_id: 21,
        city: 'Karachi',
        created_at: new Date().toISOString()
      });
      setOpenAddProject(false);
      setNewProject({
        title: '',
        location: '',
        price: 0,
        bedrooms: 0,
        bathrooms: 0,
        sqft: 0,
        image_urls: [
          {
            id: 1,
            image_url: 'https://source.unsplash.com/featured/?house,villa,modern'
          }
        ]
      });
      fetchMyProjects();
    } catch (err) {
      console.error('Error adding project:', err);
    }
  };

const handleEdit = (id: string) => {
  const project = myProjects.find(p => p.id.toString() === id.toString());
  if (project) {
    setEditProject(project);
    setIsEditOpen(true);
  }
};
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Builder Dashboard</h1>
          <p className="text-gray-600">Manage your projects and client inquiries</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card><CardContent className="p-6"><div className="flex justify-between"><div><p className="text-sm text-gray-600">Total Projects</p><p className="text-3xl font-bold">{stats.totalProjects}</p></div><Building className="w-8 h-8 text-blue-600" /></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex justify-between"><div><p className="text-sm text-gray-600">Active Inquiries</p><p className="text-3xl font-bold">{stats.activeInquiries}</p></div><MessageSquare className="w-8 h-8 text-green-600" /></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex justify-between"><div><p className="text-sm text-gray-600">Avg Rating</p><p className="text-3xl font-bold">{stats.avgRating}</p></div><Star className="w-8 h-8 text-yellow-500" /></div></CardContent></Card>
          <Card><CardContent className="p-6"><div className="flex justify-between"><div><p className="text-sm text-gray-600">Completed</p><p className="text-3xl font-bold">{stats.completedProjects}</p></div><TrendingUp className="w-8 h-8 text-purple-600" /></div></CardContent></Card>
        </div>

        {/* Projects Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">Your Projects</h2>
          <Button onClick={() => setOpenAddProject(true)}><Plus className="w-4 h-4 mr-2" />Add Project</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myProjects.map((project: any) => (
            <PropertyCard
              key={project.id}
              property={{
                id: project.id.toString(),
                title: project.title,
                price: `PKR ${project.price.toLocaleString()}`,
                location: project.location,
                bedrooms: project.bedrooms,
                bathrooms: project.bathrooms,
                sqft: project.sqft,
                image: project.image_urls?.[0]?.image_url || '',
                type: 'Builder',
                featured: true,
              }}
              actionLabel="Edit"
              onContact={() => handleEdit(project.id)}
            />
          ))}
        </div>
      </div>
      {/* Messaging Area */}
{/* Messaging Area */}
<div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-12">
  <div className="col-span-1">
    <h3 className="text-lg font-semibold mb-2">Customers</h3>
    <div className="space-y-2">
      {conversations.map((conv) => (
        <Button
          key={conv.customer_id}
          variant={conv.customer_id === selectedCustomerId ? 'default' : 'outline'}
          className="w-full justify-start"
          onClick={() => setSelectedCustomerId(conv.customer_id)}
        >
          {conv.customer_name}
        </Button>
      ))}
    </div>
  </div>
  <div className="col-span-3">
    {selectedCustomerId ? (
      <>
        <h3 className="text-xl font-semibold mb-4">
          Chat with {
            conversations.find(c => c.customer_id === selectedCustomerId)?.customer_name
          }
        </h3>
        <div className="bg-white border rounded-lg shadow p-4 h-[400px] overflow-y-auto space-y-4">
          {conversations.find(c => c.customer_id === selectedCustomerId)?.messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-lg max-w-[75%] ${
                msg.sender === 'Builder' ? 'bg-blue-100 ml-auto' : 'bg-gray-100 mr-auto'
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
            onClick={async () => {
              if (!replyText.trim()) return;

              try {
               await api.post('/search/messages/send', {
      builder_id: 21,
      customer_id: conversations.find(c => c.customer_id === selectedCustomerId)?.customer_id,
      customer_name: conversations.find(c => c.customer_id === selectedCustomerId)?.customer_name,
      sender: "Builder", // or "Customer"
      message: replyText,
    
                });
                setReplyText('');
                fetchMessages(); // Refresh conversation
              } catch (err) {
                console.error('Error sending message:', err);
              }
          

            }}
          >
            Send
          </Button>
        </div>
      </>
    ) : (
      <p className="text-gray-600">Select a customer to view messages.</p>
    )}
  </div>
</div>




      <Footer />

      {/* Add Project Dialog */}
      <Dialog open={openAddProject} onOpenChange={setOpenAddProject}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Project Title"
              className="w-full border px-3 py-2 rounded"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full border px-3 py-2 rounded"
              value={newProject.location}
              onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              className="w-full border px-3 py-2 rounded"
              value={newProject.price}
              onChange={(e) => setNewProject({ ...newProject, price: Number(e.target.value) })}
            />
            <input
              type="number"
              placeholder="Bedrooms"
              className="w-full border px-3 py-2 rounded"
              value={newProject.bedrooms}
              onChange={(e) => setNewProject({ ...newProject, bedrooms: Number(e.target.value) })}
            />
            <input
              type="number"
              placeholder="Bathrooms"
              className="w-full border px-3 py-2 rounded"
              value={newProject.bathrooms}
              onChange={(e) => setNewProject({ ...newProject, bathrooms: Number(e.target.value) })}
            />
            <input
              type="number"
              placeholder="Square Feet"
              className="w-full border px-3 py-2 rounded"
              value={newProject.sqft}
              onChange={(e) => setNewProject({ ...newProject, sqft: Number(e.target.value) })}
            />
            <div className="flex justify-end">
              <Button onClick={handleAddProject}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
  <DialogContent className="max-w-md">
    <DialogHeader>
      <DialogTitle>Edit Project</DialogTitle>
    </DialogHeader>
    {editProject && (
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Project Title"
          className="w-full border px-3 py-2 rounded"
          value={editProject.title}
          onChange={(e) =>
            setEditProject({ ...editProject, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Location"
          className="w-full border px-3 py-2 rounded"
          value={editProject.location}
          onChange={(e) =>
            setEditProject({ ...editProject, location: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full border px-3 py-2 rounded"
          value={editProject.price}
          onChange={(e) =>
            setEditProject({ ...editProject, price: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Bedrooms"
          className="w-full border px-3 py-2 rounded"
          value={editProject.bedrooms}
          onChange={(e) =>
            setEditProject({ ...editProject, bedrooms: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Bathrooms"
          className="w-full border px-3 py-2 rounded"
          value={editProject.bathrooms}
          onChange={(e) =>
            setEditProject({ ...editProject, bathrooms: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="Square Feet"
          className="w-full border px-3 py-2 rounded"
          value={editProject.sqft}
          onChange={(e) =>
            setEditProject({ ...editProject, sqft: Number(e.target.value) })
          }
        />

        <div className="flex justify-end">
          <Button
            onClick={async () => {
              try {
                await api.put(`/search/projects/${editProject.id}`, editProject);
                console.log("Updated successfully:", editProject);
                setIsEditOpen(false);
                // Refresh list if needed
              } catch (err) {
                console.error("Update failed:", err);
              }
            }}
          >
            Save Changes
          </Button>
        </div>
      </div>
    )}
  </DialogContent>
</Dialog>

    </div>
  );
};

export default BuilderDashboard;
