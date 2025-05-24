"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const propertyTypes = [
  "Cabin",
  "Villa",
  "Cottage",
  "Apartment",
  "House",
  "Chalet",
  "Bungalow",
  "Treehouse",
  "Yurt",
  "Boat",
  "Farm stay",
  "Mansion"
];

export default function BasicInfoStep({ data = {}, updateData }) {
  // Ensure data has default values
  const formData = {
    name: "",
    description: "",
    type: "",
    price: "",
    ...data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  const handleSelectChange = (name, value) => {
    updateData({ [name]: value });
  };

  // Validate price as numeric
  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
      updateData({ price: value });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Property Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="e.g. Mountain View Retreat"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe your property..."
          value={formData.description}
          onChange={handleChange}
          rows={5}
          required
        />
        <p className="text-xs text-muted-foreground">
          Provide a detailed description of your property. Highlight unique features and what makes it special.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Property Type</Label>
        <Select 
          value={formData.type} 
          onValueChange={(value) => handleSelectChange("type", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select property type" />
          </SelectTrigger>
          <SelectContent>
            {propertyTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price per Night ($)</Label>
        <Input
            id="price"
            name="price"
            type="text"
            placeholder="0.00"
            value={formData.price}
            onChange={handlePriceChange}
            required
          />
        </div>
        </div>
  );
}