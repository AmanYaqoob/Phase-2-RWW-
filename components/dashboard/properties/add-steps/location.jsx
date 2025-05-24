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
import { MapPin } from "lucide-react";

// Mock list of countries
const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "France",
  "Germany",
  "Italy",
  "Spain",
  "Japan",
  "Mexico"
];

export default function LocationStep({ data, updateData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  const handleSelectChange = (name, value) => {
    updateData({ [name]: value });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="address">Street Address</Label>
        <Input
          id="address"
          name="address"
          placeholder="123 Mountain View Road"
          value={data.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            placeholder="City"
            value={data.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State/Province</Label>
          <Input
            id="state"
            name="state"
            placeholder="State/Province"
            value={data.state}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="zipCode">Zip/Postal Code</Label>
          <Input
            id="zipCode"
            name="zipCode"
            placeholder="Zip/Postal Code"
            value={data.zipCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select 
            value={data.country} 
            onValueChange={(value) => handleSelectChange("country", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2 mt-6">
        <Label>Map Location</Label>
        <div className="border rounded-md h-[300px] bg-muted/20 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MapPin className="h-10 w-10 mx-auto mb-2 opacity-50" />
            <p>Map integration would be here</p>
            <p className="text-xs mt-2">
              In a real application, this would be a map where you can pin your property location
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            id="latitude"
            name="latitude"
            placeholder="e.g. 40.7128"
            value={data.latitude}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            id="longitude"
            name="longitude"
            placeholder="e.g. -74.0060"
            value={data.longitude}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}