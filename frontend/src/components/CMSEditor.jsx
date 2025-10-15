import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import axios from 'axios';
import { Save, Edit, Image as ImageIcon } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const CMSEditor = () => {
  const [blocks, setBlocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingBlock, setEditingBlock] = useState(null);
  const [editContent, setEditContent] = useState({});

  useEffect(() => {
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/cms/blocks`);
      setBlocks(response.data);
    } catch (error) {
      console.error('Failed to fetch blocks:', error);
      toast.error('Failed to load CMS content');
    } finally {
      setIsLoading(false);
    }
  };

  const startEditing = (block) => {
    setEditingBlock(block.id);
    setEditContent(block.content);
  };

  const cancelEditing = () => {
    setEditingBlock(null);
    setEditContent({});
  };

  const saveBlock = async (blockId) => {
    try {
      await axios.put(`${BACKEND_URL}/api/cms/blocks/${blockId}`, {
        content: editContent
      });
      toast.success('Content updated successfully!');
      setEditingBlock(null);
      fetchBlocks();
    } catch (error) {
      console.error('Failed to save:', error);
      toast.error('Failed to update content');
    }
  };

  const updateContentField = (field, value) => {
    setEditContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNestedField = (path, value) => {
    setEditContent(prev => {
      const newContent = { ...prev };
      const keys = path.split('.');
      let current = newContent;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newContent;
    });
  };

  const groupedBlocks = blocks.reduce((acc, block) => {
    if (!acc[block.page]) acc[block.page] = [];
    acc[block.page].push(block);
    return acc;
  }, {});

  const renderField = (key, value, path = '') => {
    const fullPath = path ? `${path}.${key}` : key;

    if (typeof value === 'string') {
      if (value.length > 100) {
        return (
          <div key={fullPath} className="mb-4">
            <Label>{key.replace(/_/g, ' ').toUpperCase()}</Label>
            <Textarea
              value={value}
              onChange={(e) => path ? updateNestedField(fullPath, e.target.value) : updateContentField(key, e.target.value)}
              rows={4}
              className="mt-2"
            />
          </div>
        );
      } else {
        return (
          <div key={fullPath} className="mb-4">
            <Label>{key.replace(/_/g, ' ').toUpperCase()}</Label>
            <Input
              value={value}
              onChange={(e) => path ? updateNestedField(fullPath, e.target.value) : updateContentField(key, e.target.value)}
              className="mt-2"
            />
          </div>
        );
      }
    }

    if (Array.isArray(value)) {
      return (
        <div key={fullPath} className="mb-4">
          <Label className="text-lg font-semibold">{key.replace(/_/g, ' ').toUpperCase()}</Label>
          <div className="mt-2 space-y-2">
            <Textarea
              value={JSON.stringify(value, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  path ? updateNestedField(fullPath, parsed) : updateContentField(key, parsed);
                } catch (err) {
                  // Invalid JSON, don't update
                }
              }}
              rows={10}
              className="font-mono text-sm"
            />
            <p className="text-xs text-gray-500">Edit JSON array directly</p>
          </div>
        </div>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <div key={fullPath} className="mb-4 p-4 border rounded-lg">
          <Label className="text-lg font-semibold mb-3 block">{key.replace(/_/g, ' ').toUpperCase()}</Label>
          {Object.entries(value).map(([subKey, subValue]) => renderField(subKey, subValue, fullPath))}
        </div>
      );
    }

    return null;
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading CMS content...</div>;
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="home">
        <TabsList>
          {Object.keys(groupedBlocks).map(page => (
            <TabsTrigger key={page} value={page} className="capitalize">
              {page}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(groupedBlocks).map(([page, pageBlocks]) => (
          <TabsContent key={page} value={page}>
            <div className="space-y-4">
              {pageBlocks.map(block => (
                <Card key={block.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="capitalize">
                        {block.section_id.replace(/_/g, ' ')}
                      </CardTitle>
                      {editingBlock === block.id ? (
                        <div className="space-x-2">
                          <Button 
                            size="sm" 
                            onClick={() => saveBlock(block.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Save size={16} className="mr-1" />
                            Save
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={cancelEditing}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => startEditing(block)}
                        >
                          <Edit size={16} className="mr-1" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {editingBlock === block.id ? (
                      <div className="space-y-4">
                        {Object.entries(editContent).map(([key, value]) => 
                          renderField(key, value)
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <pre className="bg-gray-50 p-4 rounded text-sm overflow-auto max-h-96">
                          {JSON.stringify(block.content, null, 2)}
                        </pre>
                        <p className="text-xs text-gray-500">
                          Last updated: {new Date(block.updated_at).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
