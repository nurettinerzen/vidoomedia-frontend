import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import axios from 'axios';
import { Lock } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/admin/login`, credentials);
      
      if (response.data.success) {
        localStorage.setItem('admin_token', response.data.token);
        toast.success('Login successful!');
        navigate('/admin-ridemedia-8432/dashboard');
      } else {
        toast.error(response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-t-lg">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Lock className="text-white" size={32} />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent className="pt-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                placeholder="admin"
                required
                className="mt-2"
                data-testid="username-input"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter password"
                required
                className="mt-2"
                data-testid="password-input"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg"
              disabled={isLoading}
              data-testid="login-button"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Default credentials:</p>
            <p className="font-mono bg-gray-100 p-2 rounded mt-2">
              Username: admin<br />
              Password: admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
