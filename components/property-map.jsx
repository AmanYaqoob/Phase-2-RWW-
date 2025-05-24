"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PropertyMap({
  properties = [],
  selectedProperty = null,
  height = "500px",
  zoom = 10,
  onPropertySelect = () => {}
}) {
  const [mapUrl, setMapUrl] = useState("");
  const [mapType, setMapType] = useState("place"); // place, view, streetview

  useEffect(() => {
    // Generate Google Maps URL based on properties
    if (selectedProperty && selectedProperty.latitude && selectedProperty.longitude) {
      // If a property is selected, center on that property
      const center = `${selectedProperty.latitude},${selectedProperty.longitude}`;

      if (mapType === "place") {
        setMapUrl(`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${center}&zoom=${zoom}`);
      } else if (mapType === "view") {
        setMapUrl(`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${center}&zoom=${zoom}`);
      } else if (mapType === "streetview") {
        setMapUrl(`https://www.google.com/maps/embed/v1/streetview?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&location=${center}&heading=210&pitch=10&fov=90`);
      }
    } else if (properties.length > 0) {
      // If no property is selected but we have properties, show all properties
      const markers = properties
        .filter(p => p.latitude && p.longitude)
        .map(p => `${p.latitude},${p.longitude}`)
        .join('|');

      if (markers) {
        setMapUrl(`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${markers.split('|')[0]}&zoom=${zoom}`);
      } else {
        // Default map centered on US
        setMapUrl(`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=USA&zoom=4`);
      }
    } else {
      // Default map centered on US
      setMapUrl(`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=USA&zoom=4`);
    }
  }, [selectedProperty, properties, zoom, mapType]);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {selectedProperty && selectedProperty.latitude && selectedProperty.longitude && (
          <div className="p-2 border-b flex items-center justify-between">
            <div className="flex space-x-2">
              <Badge
                variant={mapType === "place" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setMapType("place")}
              >
                Map
              </Badge>
              <Badge
                variant={mapType === "view" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setMapType("view")}
              >
                Satellite
              </Badge>
              <Badge
                variant={mapType === "streetview" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setMapType("streetview")}
              >
                Street View
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs flex items-center"
              onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedProperty.latitude},${selectedProperty.longitude}`, '_blank')}
            >
              <Navigation className="h-3 w-3 mr-1" />
              Directions
            </Button>
          </div>
        )}
        <div style={{ height, width: "100%" }}>
          {mapUrl ? (
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={mapUrl}
            ></iframe>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted/20">
              <div className="text-center">
                <MapPin className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                <p>Loading map...</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      {/* Property markers list */}
      {properties.length > 0 && (
        <div className="p-4 border-t">
          <h3 className="text-sm font-medium mb-2">Properties on map:</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {properties.map(property => (
              <div
                key={property.id}
                className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-muted/50 transition-colors ${
                  selectedProperty?.id === property.id ? 'bg-muted' : ''
                }`}
                onClick={() => onPropertySelect(property)}
              >
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                <div className="truncate">
                  <span className="font-medium">{property.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">{property.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
