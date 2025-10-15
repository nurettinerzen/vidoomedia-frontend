import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import axios from 'axios';
import { Mail, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const EmailLogs = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/admin/email-logs`);
      setLogs(response.data);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
      toast.error('Failed to load email logs');
    } finally {
      setIsLoading(false);
    }
  };

  const getLogTypeBadge = (type) => {
    const colors = {
      driver_application: 'bg-blue-100 text-blue-800',
      advertiser_inquiry: 'bg-purple-100 text-purple-800',
    };
    return <Badge className={colors[type] || 'bg-gray-100 text-gray-800'}>
      {type.replace(/_/g, ' ')}
    </Badge>;
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading email logs...</div>;
  }

  return (
    <div className="space-y-4">
      {logs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            <Mail size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No email logs yet</p>
            <p className="text-sm mt-2">Form submissions will appear here</p>
          </CardContent>
        </Card>
      ) : (
        logs.map((log) => (
          <Card key={log.id} className="hover-lift">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getLogTypeBadge(log.log_type)}
                    <Badge className="bg-green-100 text-green-800">
                      {log.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{log.subject}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">To: {log.recipient}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedLog(selectedLog === log.id ? null : log.id)}
                  data-testid={`view-log-${log.id}`}
                >
                  <Eye size={16} className="mr-1" />
                  {selectedLog === log.id ? 'Hide' : 'View'}
                </Button>
              </div>
            </CardHeader>
            
            {selectedLog === log.id && (
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Email Body:</h4>
                    <pre className="bg-gray-50 p-4 rounded text-sm whitespace-pre-wrap">
                      {log.body}
                    </pre>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Form Data:</h4>
                    <pre className="bg-gray-50 p-4 rounded text-sm overflow-auto">
                      {JSON.stringify(log.form_data, null, 2)}
                    </pre>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Timestamp: {new Date(log.timestamp).toLocaleString()}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))
      )}
    </div>
  );
};
