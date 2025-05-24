"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const amenitiesGroups = [
  {
    title: "Essentials",
    items: [
      { id: "wifi", label: "WiFi" },
      { id: "kitchen", label: "Kitchen" },
      { id: "ac", label: "Air Conditioning" },
      { id: "heating", label: "Heating" },
      { id: "washer", label: "Washer" },
      { id: "dryer", label: "Dryer" },
      { id: "tv", label: "TV" },
      { id: "workspace", label: "Workspace" }
    ]
  },
  {
    title: "Features",
    items: [
      { id: "pool", label: "Pool" },
      { id: "hotTub", label: "Hot Tub" },
      { id: "patio", label: "Patio or Balcony" },
      { id: "bbqGrill", label: "BBQ Grill" },
      { id: "fireplace", label: "Fireplace" },
      { id: "gym", label: "Gym" },
      { id: "parking", label: "Free Parking" }
    ]
  },
  {
    title: "Safety",
    items: [
      { id: "smokeAlarm", label: "Smoke Alarm" },
      { id: "carbonMonoxideAlarm", label: "Carbon Monoxide Alarm" },
      { id: "fireExtinguisher", label: "Fire Extinguisher" },
      { id: "firstAidKit", label: "First Aid Kit" },
      { id: "securityCameras", label: "Security Cameras" }
    ]
  },
  {
    title: "Policies",
    items: [
      { id: "petsAllowed", label: "Pets Allowed" },
      { id: "smokingAllowed", label: "Smoking Allowed" },
      { id: "eventsAllowed", label: "Events Allowed" },
      { id: "infantsAllowed", label: "Infants Allowed" }
    ]
  }
];

export default function AmenitiesStep({ data, updateData }) {
  const handleCheckboxChange = (id, checked) => {
    updateData({ [id]: checked });
  };

  return (
    <div className="space-y-8">
      {amenitiesGroups.map((group) => (
        <div key={group.title} className="space-y-4">
          <h3 className="font-medium text-lg">{group.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {group.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Checkbox
                  id={item.id}
                  checked={data[item.id] || false}
                  onCheckedChange={(checked) => handleCheckboxChange(item.id, checked)}
                />
                <Label htmlFor={item.id} className="text-sm font-normal">
                  {item.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}