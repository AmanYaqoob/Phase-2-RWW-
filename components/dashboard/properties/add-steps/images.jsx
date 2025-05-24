"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon, ImagePlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ImagesStep({ data = {}, updateData }) {
  const [dragActive, setDragActive] = useState(false);
  const [bgDragActive, setBgDragActive] = useState(false);
  
  // Ensure data has default values
  const formData = {
    propertyImages: [],
    backgroundImage: null,
    ...data
  };

  // Handle drag events for property images
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drag events for background image
  const handleBgDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setBgDragActive(true);
    } else if (e.type === "dragleave") {
      setBgDragActive(false);
    }
  };

  // Handle drop event for property images
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handlePropertyImages(e.dataTransfer.files);
    }
  };

  // Handle drop event for background image
  const handleBgDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setBgDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleBackgroundImage(e.dataTransfer.files[0]);
    }
  };

  // Handle file input change for property images
  const handlePropertyImagesChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handlePropertyImages(e.target.files);
    }
  };

  // Handle file input change for background image
  const handleBackgroundImageChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleBackgroundImage(e.target.files[0]);
    }
  };

  // Process property images
  const handlePropertyImages = (files) => {
    const newImages = Array.from(files).map(file => ({
      id: Date.now() + Math.random().toString(36).substring(2, 9),
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }));
    
    updateData({ propertyImages: [...formData.propertyImages, ...newImages] });
  };

  // Process background image
  const handleBackgroundImage = (file) => {
    const bgImage = {
      id: Date.now() + Math.random().toString(36).substring(2, 9),
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    };
    
    updateData({ backgroundImage: bgImage });
  };

  // Remove a property image
  const removePropertyImage = (id) => {
    const updatedImages = formData.propertyImages.filter(image => image.id !== id);
    updateData({ propertyImages: updatedImages });
  };

  // Remove background image
  const removeBackgroundImage = () => {
    updateData({ backgroundImage: null });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="property" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="property">Property Images</TabsTrigger>
          <TabsTrigger value="background">Background Image</TabsTrigger>
        </TabsList>
        
        <TabsContent value="property" className="mt-4">
          <div className="space-y-4">
            <div 
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            dragActive ? "border-primary bg-primary/5" : "border-border"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <h3 className="text-lg font-medium">Drag & drop your images here</h3>
            <p className="text-sm text-muted-foreground">
              or click to browse from your computer
            </p>
            <input
                  id="property-images-upload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
                  onChange={handlePropertyImagesChange}
            />
                <Button 
                  variant="outline" 
                  onClick={() => document.getElementById("property-images-upload").click()}
            >
              Select Files
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Upload high-quality images of your property. You can upload up to 20 images.
        </p>

            {formData.propertyImages.length > 0 && (
        <div className="space-y-4">
                <h3 className="font-medium">Uploaded Images ({formData.propertyImages.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.propertyImages.map((image) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square rounded-md overflow-hidden border bg-muted">
                        <img 
                          src={image.preview} 
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                        onClick={() => removePropertyImage(image.id)}
                  className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
                <p className="text-xs truncate mt-1">{image.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
        </TabsContent>
        
        <TabsContent value="background" className="mt-4">
          <div className="space-y-4">
            <p className="text-sm">
              Upload a high-quality background image that will be displayed as the main image for your property listing.
            </p>
            
            {!formData.backgroundImage ? (
              <div 
                className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  bgDragActive ? "border-primary bg-primary/5" : "border-border"
                }`}
                onDragEnter={handleBgDrag}
                onDragLeave={handleBgDrag}
                onDragOver={handleBgDrag}
                onDrop={handleBgDrop}
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <ImagePlus className="h-10 w-10 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Drag & drop your background image here</h3>
                  <p className="text-sm text-muted-foreground">
                    or click to browse from your computer
                  </p>
                  <input
                    id="background-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleBackgroundImageChange}
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => document.getElementById("background-image-upload").click()}
                  >
                    Select File
                  </Button>
                </div>
              </div>
            ) : (
              <Card className="overflow-hidden">
                <div className="relative aspect-video">
                  <img 
                    src={formData.backgroundImage.preview} 
                    alt="Background"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={removeBackgroundImage}
                    className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm font-medium">Background Image</p>
                  <p className="text-xs text-muted-foreground">{formData.backgroundImage.name}</p>
                </CardContent>
              </Card>
            )}
            
            <p className="text-xs text-muted-foreground">
              Recommended size: 1920x1080 pixels or larger. This image will be the first thing guests see.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}