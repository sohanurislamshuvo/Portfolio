import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  currentImageUrl: string;
  onImageChange: (url: string) => void;
  label?: string;
  description?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  currentImageUrl,
  onImageChange,
  label = "Profile Picture",
  description = "Upload a profile picture or enter an image URL"
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPG, PNG, GIF, etc.)",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // Convert file to base64 for local storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewUrl(result);
        onImageChange(result);
        setIsUploading(false);
        toast({
          title: "Image uploaded successfully",
          description: "Your profile picture has been updated",
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setIsUploading(false);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image",
        variant: "destructive"
      });
    }
  };

  const handleUrlChange = (url: string) => {
    setPreviewUrl(null);
    onImageChange(url);
  };

  const removeImage = () => {
    setPreviewUrl(null);
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast({
      title: "Image removed",
      description: "Profile picture has been removed",
    });
  };

  const displayUrl = previewUrl || currentImageUrl;

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="profilePicture">{label}</Label>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>

      {/* Image Preview */}
      {displayUrl && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">Current Image</h4>
            <Button
              size="sm"
              variant="destructive"
              onClick={removeImage}
            >
              <X className="w-4 h-4 mr-2" />
              Remove
            </Button>
          </div>
          <div className="flex justify-center">
            <img
              src={displayUrl}
              alt="Profile preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-border shadow-lg"
              onError={() => {
                toast({
                  title: "Image load error",
                  description: "The image URL is invalid or inaccessible",
                  variant: "destructive"
                });
              }}
            />
          </div>
        </Card>
      )}

      {/* Upload Options */}
      <div className="grid gap-4">
        {/* File Upload */}
        <div>
          <Label htmlFor="fileUpload">Upload from Computer</Label>
          <div className="flex items-center gap-2 mt-2">
            <Input
              ref={fileInputRef}
              id="fileUpload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex-1"
            >
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? 'Uploading...' : 'Choose File'}
            </Button>
          </div>
        </div>

        {/* URL Input */}
        <div>
          <Label htmlFor="imageUrl">Or enter image URL</Label>
          <div className="flex items-center gap-2 mt-2">
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={currentImageUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (currentImageUrl) {
                  setPreviewUrl(null);
                  onImageChange(currentImageUrl);
                }
              }}
            >
              <ImageIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="p-3 bg-muted/50 rounded-lg">
        <h5 className="font-medium text-sm mb-2">Tips:</h5>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Recommended size: 400x400 pixels or larger</li>
          <li>• Supported formats: JPG, PNG, GIF, WebP</li>
          <li>• Maximum file size: 5MB</li>
          <li>• For best results, use a square image</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUpload;
