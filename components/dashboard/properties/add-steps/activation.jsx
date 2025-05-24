"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function ActivationStep({ data, updateData }) {
  const [startDate, setStartDate] = useState(data.availableFrom ? new Date(data.availableFrom) : null);
  const [endDate, setEndDate] = useState(data.availableTo ? new Date(data.availableTo) : null);

  const handleSwitchChange = (checked) => {
    updateData({ isActive: checked });
  };

  const handleSelectChange = (name, value) => {
    updateData({ [name]: value });
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    if (value === "" || /^\d+$/.test(value)) {
      updateData({ [name]: value === "" ? "" : parseInt(value, 10) });
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    updateData({ availableFrom: date ? date.toISOString() : "" });
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    updateData({ availableTo: date ? date.toISOString() : "" });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Activate Listing</h3>
            <p className="text-sm text-muted-foreground">
              Make your property visible to guests
            </p>
          </div>
          <Switch
            checked={data.isActive}
            onCheckedChange={handleSwitchChange}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Availability</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Available From</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={handleStartDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label>Available To</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={handleEndDateChange}
                  initialFocus
                  disabled={(date) => startDate && date < startDate}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Booking Settings</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <Label>Instant Booking</Label>
            <p className="text-sm text-muted-foreground">
              Allow guests to book without approval
            </p>
          </div>
          <Switch
            checked={data.instantBooking}
            onCheckedChange={(checked) => updateData({ instantBooking: checked })}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="minStay">Minimum Stay (nights)</Label>
            <Input
              id="minStay"
              name="minStay"
              type="text"
              value={data.minStay}
              onChange={handleNumberChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxStay">Maximum Stay (nights)</Label>
            <Input
              id="maxStay"
              name="maxStay"
              type="text"
              value={data.maxStay}
              onChange={handleNumberChange}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Cancellation Policy</h3>
        <div className="space-y-2">
          <Select 
            value={data.cancellationPolicy} 
            onValueChange={(value) => handleSelectChange("cancellationPolicy", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select policy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flexible">Flexible (Full refund 1 day prior to arrival)</SelectItem>
              <SelectItem value="moderate">Moderate (Full refund 5 days prior to arrival)</SelectItem>
              <SelectItem value="strict">Strict (50% refund up to 1 week prior to arrival)</SelectItem>
              <SelectItem value="nonRefundable">Non-refundable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}