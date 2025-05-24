"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const activitiesGroups = [
  {
    title: "Outdoor Activities",
    items: [
      { id: "hiking", label: "Hiking" },
      { id: "swimming", label: "Swimming" },
      { id: "fishing", label: "Fishing" },
      { id: "skiing", label: "Skiing" },
      { id: "golfing", label: "Golfing" },
      { id: "biking", label: "Biking" },
      { id: "boating", label: "Boating" },
      { id: "surfing", label: "Surfing" }
    ]
  },
  {
    title: "Location Features",
    items: [
      { id: "beachAccess", label: "Beach Access" },
      { id: "lakeAccess", label: "Lake Access" },
      { id: "mountainViews", label: "Mountain Views" },
      { id: "cityExploring", label: "City Exploring" },
      { id: "wineCountry", label: "Wine Country" },
      { id: "ruralRetreat", label: "Rural Retreat" }
    ]
  },
  {
    title: "Property Atmosphere",
    items: [
      { id: "familyFriendly", label: "Family Friendly" },
      { id: "romantic", label: "Romantic" },
      { id: "peaceful", label: "Peaceful" },
      { id: "lively", label: "Lively" },
      { id: "luxurious", label: "Luxurious" },
      { id: "rustic", label: "Rustic" }
    ]
  }
];

export default function ActivitiesStep({ data, updateData }) {
  const handleCheckboxChange = (id, checked) => {
    updateData({ [id]: checked });
  };

  return (
    <div className="space-y-8">
      {activitiesGroups.map((group) => (
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