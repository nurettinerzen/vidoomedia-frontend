import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import axios from 'axios';
import { Upload, Trash2, Copy, Image as ImageIcon } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const MediaLibrary = () => {
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/api/cms/media`);
      setMedia(response.data);
    } catch (error) {
      console.error('Failed to fetch media:', error);
      toast.error('Failed to load media library');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${BACKEND_URL}/api/cms/media`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('File uploaded successfully!');
      fetchMedia();
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  const deleteMedia = async (mediaId) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/cms/media/${mediaId}`);
      toast.success('File deleted successfully');
      fetchMedia();
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Failed to delete file');
    }
  };

  const copyUrl = (mediaId, filename) => {
    const url = `${BACKEND_URL}/api/cms/media/${mediaId}`;
    navigator.clipboard.writeText(url);
    toast.success(`URL copied: ${filename}`);
  };

  const getImageUrl = (mediaId) => {
    return `${BACKEND_URL}/api/cms/media/${mediaId}`;
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading media library...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={isUploading}
              className="flex-1"
            />
            {isUploading && (
              <span className="text-sm text-gray-600">Uploading...</span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Upload images (JPG, PNG, GIF, WebP). Max size: 10MB
          </p>
        </CardContent>
      </Card>

      {/* Media Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((item) => (
          <Card key={item.id} className="overflow-hidden hover-lift">
            <div className="aspect-square bg-gray-100 flex items-center justify-center">
              {item.content_type.startsWith('image/') ? (
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(data:${item.content_type};base64,${item.data})`
                  }}
                />
              ) : (
                <ImageIcon size={48} className="text-gray-400" />
              )}
            </div>
            <CardContent className="p-3">
              <p className="text-sm font-medium truncate mb-2">
                {item.filename}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyUrl(item.id, item.filename)}
                  className="flex-1"
                  data-testid={`copy-url-${item.id}`}
                >
                  <Copy size={14} className="mr-1" />
                  Copy
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deleteMedia(item.id)}
                  className="text-red-600 hover:bg-red-50"
                  data-testid={`delete-${item.id}`}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {(item.size / 1024).toFixed(1)} KB
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {media.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <ImageIcon size={48} className="mx-auto mb-4 text-gray-300" />
          <p>No media files yet. Upload your first image above.</p>
        </div>
      )}
    </div>
  );
};
