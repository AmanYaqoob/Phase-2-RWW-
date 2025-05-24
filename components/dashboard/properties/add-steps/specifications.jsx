"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

export default function SpecificationsStep({ data = {}, updateData }) {
  // Ensure data has default values
  const formData = {
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    size: "",
    sizeUnit: "sqft",
    ...data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  const handleSelectChange = (name, value) => {
    updateData({ [name]: value });
  };

  const incrementValue = (field) => {
    updateData({ [field]: formData[field] + 1 });
  };

  const decrementValue = (field) => {
    if (formData[field] > 1) {
      updateData({ [field]: formData[field] - 1 });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bedrooms */}
        <div className="space-y-2">
          <Label>Bedrooms</Label>
          <div className="flex items-center">
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              onClick={() => decrementValue('bedrooms')}
              disabled={formData.bedrooms <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="w-12 text-center font-medium mx-2">
              {formData.bedrooms}
            </div>
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              onClick={() => incrementValue('bedrooms')}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Bathrooms */}
        <div className="space-y-2">
          <Label>Bathrooms</Label>
          <div className="flex items-center">
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              onClick={() => decrementValue('bathrooms')}
              disabled={formData.bathrooms <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="w-12 text-center font-medium mx-2">
              {formData.bathrooms}
            </div>
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              onClick={() => incrementValue('bathrooms')}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Max Guests */}
        <div className="space-y-2">
          <Label>Max Guests</Label>
          <div className="flex items-center">
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              onClick={() => decrementValue('maxGuests')}
              disabled={formData.maxGuests <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="w-12 text-center font-medium mx-2">
              {formData.maxGuests}
            </div>
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              onClick={() => incrementValue('maxGuests')}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="size">Property Size</Label>
          <Input
            id="size"
            name="size"
            placeholder="e.g. 1500"
            value={formData.size}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sizeUnit">Unit</Label>
          <Select 
            value={formData.sizeUnit} 
            onValueChange={(value) => handleSelectChange("sizeUnit", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sqft">Square Feet</SelectItem>
              <SelectItem value="sqm">Square Meters</SelectItem>
              <SelectItem value="acres">Acres</SelectItem>
              <SelectItem value="hectares">Hectares</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2 mt-4">
        <Label>Property Features</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {[
            { label: "Beachfront", value: "beachfront" },
            { label: "Waterfront", value: "waterfront" },
            { label: "Ski-in/Ski-out", value: "skiInOut" },
            { label: "Mountain View", value: "mountainView" },
            { label: "Lake View", value: "lakeView" },
            { label: "Ocean View", value: "oceanView" },
            { label: "Desert View", value: "desertView" },
            { label: "Forest View", value: "forestView" }
          ].map((feature) => (
            <div key={feature.value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={feature.value}
                checked={formData[feature.value] || false}
                onChange={(e) => updateData({ [feature.value]: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor={feature.value} className="text-sm font-normal">
                {feature.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}