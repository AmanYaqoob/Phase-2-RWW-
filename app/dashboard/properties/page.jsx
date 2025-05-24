"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Edit, Trash, Eye, MapPin, List, Map as MapIcon, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import PropertyMap from "@/components/property-map";

// Mock data for properties with coordinates
const mockProperties = [
  {
    id: "prop1",
    name: "Mountain Retreat Cabin",
      location: "Aspen, Colorado",
    type: "Cabin",
    bedrooms: 3,
    bathrooms: 2,
    price: "$250/night",
    status: "active",
    latitude: 39.1911,
    longitude: -106.8175
    },
    {
    id: "prop2",
    name: "Lakeside Villa",
    location: "Lake Tahoe, California",
    type: "Villa",
    bedrooms: 4,
    bathrooms: 3,
    price: "$350/night",
    status: "active",
    latitude: 39.0968,
    longitude: -120.0324
    },
    {
    id: "prop3",
    name: "Desert Oasis Retreat",
    location: "Sedona, Arizona",
    type: "House",
    bedrooms: 2,
    bathrooms: 2,
    price: "$180/night",
    status: "inactive",
    latitude: 34.8697,
    longitude: -111.7610
  },
  {
    id: "prop4",
    name: "Beachfront Bungalow",
    location: "Malibu, California",
    type: "Bungalow",
    bedrooms: 2,
    bathrooms: 1,
    price: "$420/night",
    status: "active",
    latitude: 34.0259,
    longitude: -118.7798
  },
  {
    id: "prop5",
    name: "Urban Loft",
    location: "New York, New York",
    type: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
    price: "$300/night",
    status: "active",
    latitude: 40.7128,
    longitude: -74.0060
  }
];

export default function PropertiesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState(mockProperties);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid, map

  // Check for success parameter in URL
  const success = searchParams.get("success");

  // Show success toast if redirected from add property page
  useEffect(() => {
  if (success) {
    toast.success("Property added successfully!");
    // Clear the success parameter from URL
    router.replace("/dashboard/properties");
  }
  }, [success, router]);

  const handleEditProperty = (id) => {
    router.push(`/dashboard/properties/form?edit=${id}`);
  };

  const handleAddProperty = () => {
    router.push("/dashboard/properties/form");
  };

  const handleDeleteProperty = (id) => {
    setProperties(properties.filter(property => property.id !== id));
    toast.success("Property deleted successfully");
  };

  const handleToggleStatus = (id) => {
    setProperties(properties.map(property =>
      property.id === id
        ? { ...property, status: property.status === "active" ? "inactive" : "active" }
        : property
    ));
    const property = properties.find(p => p.id === id);
    const newStatus = property.status === "active" ? "inactive" : "active";
    toast.success(`Property ${newStatus === "active" ? "activated" : "deactivated"} successfully`);
  };

  const handleViewProperty = (id) => {
    router.push(`/properties/${id}`);
  };

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
  };

        return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Properties</h1>
        <div className="flex items-center gap-4">
          <Button onClick={handleAddProperty} className="bg-black hover:bg-gray-800 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
          <div className="bg-muted rounded-md p-1 flex">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-sm"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("map")}
              className="rounded-sm"
            >
              <MapIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <Card
              key={property.id}
              className={`${selectedProperty?.id === property.id ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setSelectedProperty(property)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{property.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={property.status === "active" ? "success" : "secondary"}>
                      {property.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={property.status === "active"}
                        onCheckedChange={() => handleToggleStatus(property.id)}
                        className="data-[state=checked]:bg-green-600"
                      />
                    </div>
                  </div>
                </div>
                <CardDescription className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {property.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <span>{property.type}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Bedrooms:</span> {property.bedrooms}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Bathrooms:</span> {property.bathrooms}
                  </div>
                  <div className="font-medium">
                    {property.price}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => handleViewProperty(property.id)}>
                  <Eye className="mr-1 h-4 w-4" />
                  View
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditProperty(property.id)}>
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash className="mr-1 h-4 w-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this property?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete "{property.name}"
                          and remove all associated data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteProperty(property.id)}
                          className="bg-black hover:bg-gray-800 text-white"
                        >
                          Delete Property
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <PropertyMap
            properties={properties}
            selectedProperty={selectedProperty}
            onPropertySelect={handlePropertySelect}
            height="600px"
          />

          {selectedProperty && (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{selectedProperty.name}</CardTitle>
                  <Badge variant={selectedProperty.status === "active" ? "success" : "secondary"}>
                    {selectedProperty.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <CardDescription className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {selectedProperty.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedProperty.type}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Bedrooms:</span> {selectedProperty.bedrooms}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Bathrooms:</span> {selectedProperty.bathrooms}
                  </div>
                  <div className="font-medium">
                    {selectedProperty.price}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => handleViewProperty(selectedProperty.id)}>
                  <Eye className="mr-1 h-4 w-4" />
                  View Property
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => handleEditProperty(selectedProperty.id)}>
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeleteProperty(selectedProperty.id)}>
                    <Trash className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
      )}

      {properties.length === 0 && (
        <div className="text-center py-10">
          <Home className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
          <h3 className="mt-4 text-lg font-medium">No properties found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Your property listings will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
