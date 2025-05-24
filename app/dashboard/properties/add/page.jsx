"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload, X, Camera } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

export default function AddPropertyPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedImages, setUploadedImages] = useState([])
  const [customActivity, setCustomActivity] = useState("")
  const fileInputRef = useRef(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    longitude: "",
    latitude: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    maxGuests: "",
    pricePerNight: "",
    amenities: [],
    activityPreferences: [],
    images: []
  })

  const steps = [
    { id: 1, title: "Basic Information", active: true },
    { id: 2, title: "Location", active: false },
    { id: 3, title: "Property Specifics", active: false },
    { id: 4, title: "Amenities", active: false },
    { id: 5, title: "Activity Preferences", active: false },
    { id: 6, title: "Images & Activation", active: false }
  ]

  const totalSteps = steps.length

  const amenitiesList = [
    "Wifi", "Parking", "TV", "Kitchen", "Air Conditioning",
    "Heating", "Pool", "Hot Tub", "Fireplace", "Gym",
    "Laundry", "Pet Friendly", "Smoking Allowed"
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAmenityChange = (amenity, checked) => {
    setFormData(prev => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenity]
        : prev.amenities.filter(a => a !== amenity)
    }))
  }

  const handleActivityChange = (activity, checked) => {
    setFormData(prev => ({
      ...prev,
      activityPreferences: checked
        ? [...prev.activityPreferences, activity]
        : prev.activityPreferences.filter(a => a !== activity)
    }))
  }

  // File upload functionality
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)

    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newImage = {
            id: Date.now() + Math.random(),
            file: file,
            preview: e.target.result,
            name: file.name
          }
          setUploadedImages(prev => [...prev, newImage])
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, newImage]
          }))
        }
        reader.readAsDataURL(file)
      } else {
        toast.error("Please upload only image files")
      }
    })
  }

  const removeImage = (imageId) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId))
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }))
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  const addCustomActivity = () => {
    if (customActivity.trim() && !formData.activityPreferences.includes(customActivity.trim())) {
      setFormData(prev => ({
        ...prev,
        activityPreferences: [...prev.activityPreferences, customActivity.trim()]
      }))
      setCustomActivity("")
      toast.success("Custom activity added!")
    } else if (formData.activityPreferences.includes(customActivity.trim())) {
      toast.error("This activity is already added")
    } else {
      toast.error("Please enter an activity name")
    }
  }

  // Navigation functions
  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const goToStep = (step) => {
    setCurrentStep(step)
  }

  // Validation for each step
  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.title.trim()) {
          toast.error("Property title is required")
          return false
        }
        if (!formData.pricePerNight || formData.pricePerNight <= 0) {
          toast.error("Valid price per night is required")
          return false
        }
        return true
      case 2:
        if (!formData.location.trim()) {
          toast.error("Location is required")
          return false
        }
        return true
      case 3:
        if (!formData.propertyType) {
          toast.error("Property type is required")
          return false
        }
        return true
      case 4:
      case 5:
      case 6:
        return true
      default:
        return true
    }
  }

  const handleSubmit = () => {
    // Final validation
    if (!formData.title || !formData.location || !formData.propertyType || !formData.pricePerNight) {
      toast.error("Please complete all required fields")
      return
    }

    // In a real app, this would make an API call
    console.log("Property data:", formData)
    toast.success("Property added successfully!")
    router.push("/dashboard/properties?success=true")
  }

  const activityPreferencesList = [
    "Yoga", "Meditation", "Hiking", "Spa", "Wellness", "Fitness",
    "Nature", "Adventure", "Relaxation", "Mindfulness", "Detox", "Retreat"
  ]

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Basic Information</h2>
              <p className="text-gray-600">Let's start with the essential details about your retreat property</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <Label htmlFor="title" className="text-base font-semibold text-gray-900 block mb-2">
                    Property Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Serene Mountain Yoga Retreat"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="text-lg py-3 border-2 focus:border-black"
                  />
                  <p className="text-sm text-gray-500 mt-2">Create a compelling title that captures the essence of your retreat</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <Label htmlFor="pricePerNight" className="text-base font-semibold text-gray-900 block mb-2">
                    Price Per Night ($) <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg font-medium">$</span>
                    <Input
                      id="pricePerNight"
                      type="number"
                      placeholder="250"
                      value={formData.pricePerNight}
                      onChange={(e) => handleInputChange("pricePerNight", e.target.value)}
                      className="text-lg py-3 pl-8 border-2 focus:border-black"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Set your nightly rate in USD</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <Label htmlFor="description" className="text-base font-semibold text-gray-900 block mb-2">
                  Property Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your retreat property in detail. What makes it special? What experiences can guests expect? Include amenities, surroundings, and the atmosphere you provide..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={8}
                  className="text-base border-2 focus:border-black resize-none"
                />
                <p className="text-sm text-gray-500 mt-2">Paint a vivid picture of your property and the retreat experience</p>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Location Details</h2>
              <p className="text-gray-600">Help guests find your retreat with precise location information</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="space-y-8">
                  <div>
                    <Label htmlFor="location" className="text-lg font-semibold text-gray-900 block mb-3">
                      Property Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="location"
                      placeholder="e.g., 123 Mountain View Drive, Aspen, Colorado, USA"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="text-lg py-4 border-2 focus:border-black"
                    />
                    <p className="text-sm text-gray-500 mt-2">Enter the complete address including city, state, and country</p>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">GPS Coordinates (Optional)</h3>
                    <p className="text-sm text-gray-600 mb-6">Provide exact coordinates for mapping and navigation services</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                        <Label htmlFor="latitude" className="text-base font-semibold text-gray-900 block mb-2">
                          Latitude
                        </Label>
                        <Input
                          id="latitude"
                          placeholder="e.g., 39.1911"
                          value={formData.latitude}
                          onChange={(e) => handleInputChange("latitude", e.target.value)}
                          className="text-lg py-3 border-2 focus:border-black"
                        />
                        <p className="text-xs text-gray-500 mt-2">Decimal degrees format (North is positive)</p>
                      </div>

                      <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                        <Label htmlFor="longitude" className="text-base font-semibold text-gray-900 block mb-2">
                          Longitude
                        </Label>
                        <Input
                          id="longitude"
                          placeholder="e.g., -106.8175"
                          value={formData.longitude}
                          onChange={(e) => handleInputChange("longitude", e.target.value)}
                          className="text-lg py-3 border-2 focus:border-black"
                        />
                        <p className="text-xs text-gray-500 mt-2">Decimal degrees format (West is negative)</p>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        💡 <strong>Tip:</strong> You can find coordinates by searching your address on Google Maps,
                        right-clicking on the location, and selecting the coordinates that appear.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Property Specifics</h2>
              <p className="text-gray-600">Define the type and capacity of your retreat property</p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-8 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Property Type</h3>
                  <div>
                    <Label htmlFor="propertyType" className="text-base font-semibold text-gray-900 block mb-3">
                      What type of property is this? <span className="text-red-500">*</span>
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("propertyType", value)}>
                      <SelectTrigger className="text-lg py-4 border-2 focus:border-black">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cabin">🏕️ Cabin</SelectItem>
                        <SelectItem value="villa">🏖️ Villa</SelectItem>
                        <SelectItem value="house">🏠 House</SelectItem>
                        <SelectItem value="apartment">🏢 Apartment</SelectItem>
                        <SelectItem value="bungalow">🏡 Bungalow</SelectItem>
                        <SelectItem value="lodge">🏔️ Lodge</SelectItem>
                        <SelectItem value="resort">🏨 Resort</SelectItem>
                        <SelectItem value="farmhouse">🚜 Farmhouse</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-500 mt-2">Choose the category that best describes your property</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Capacity & Layout</h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                        <Label htmlFor="bedrooms" className="text-base font-semibold text-gray-900 block mb-2">
                          🛏️ Bedrooms
                        </Label>
                        <Input
                          id="bedrooms"
                          type="number"
                          min="1"
                          max="20"
                          placeholder="3"
                          value={formData.bedrooms}
                          onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                          className="text-lg py-3 border-2 focus:border-black"
                        />
                      </div>
                      <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                        <Label htmlFor="bathrooms" className="text-base font-semibold text-gray-900 block mb-2">
                          🚿 Bathrooms
                        </Label>
                        <Input
                          id="bathrooms"
                          type="number"
                          min="1"
                          max="10"
                          placeholder="2"
                          value={formData.bathrooms}
                          onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                          className="text-lg py-3 border-2 focus:border-black"
                        />
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                      <Label htmlFor="maxGuests" className="text-base font-semibold text-gray-900 block mb-2">
                        👥 Maximum Guests
                      </Label>
                      <Input
                        id="maxGuests"
                        type="number"
                        min="1"
                        max="50"
                        placeholder="8"
                        value={formData.maxGuests}
                        onChange={(e) => handleInputChange("maxGuests", e.target.value)}
                        className="text-lg py-3 border-2 focus:border-black"
                      />
                      <p className="text-sm text-gray-500 mt-2">Total number of guests your property can accommodate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Property Amenities</h2>
              <p className="text-gray-600">Select all amenities available at your retreat property</p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {amenitiesList.map((amenity) => {
                    const amenityIcons = {
                      "Wifi": "📶",
                      "Parking": "🚗",
                      "TV": "📺",
                      "Kitchen": "🍳",
                      "Air Conditioning": "❄️",
                      "Heating": "🔥",
                      "Pool": "🏊‍♀️",
                      "Hot Tub": "🛁",
                      "Fireplace": "🔥",
                      "Gym": "💪",
                      "Laundry": "🧺",
                      "Pet Friendly": "🐕",
                      "Smoking Allowed": "🚬"
                    }

                    return (
                      <div
                        key={amenity}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          formData.amenities.includes(amenity)
                            ? "border-black bg-black text-white shadow-lg"
                            : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                        }`}
                        onClick={() => handleAmenityChange(amenity, !formData.amenities.includes(amenity))}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{amenityIcons[amenity] || "✨"}</span>
                          <div>
                            <Label htmlFor={amenity} className={`text-base font-medium cursor-pointer ${
                              formData.amenities.includes(amenity) ? "text-white" : "text-gray-900"
                            }`}>
                              {amenity}
                            </Label>
                            <Checkbox
                              id={amenity}
                              checked={formData.amenities.includes(amenity)}
                              onCheckedChange={(checked) => handleAmenityChange(amenity, checked)}
                              className="hidden"
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Tip:</strong> Select all amenities that are available to guests.
                    This helps potential visitors understand what your property offers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Activity Preferences</h2>
              <p className="text-gray-600">What retreat activities and experiences do you offer?</p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Popular Retreat Activities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {activityPreferencesList.map((activity) => {
                    const activityIcons = {
                      "Yoga": "🧘‍♀️",
                      "Meditation": "🕯️",
                      "Hiking": "🥾",
                      "Spa": "💆‍♀️",
                      "Wellness": "🌿",
                      "Fitness": "💪",
                      "Nature": "🌲",
                      "Adventure": "🏔️",
                      "Relaxation": "😌",
                      "Mindfulness": "🧠",
                      "Detox": "🥗",
                      "Retreat": "🏡"
                    }

                    return (
                      <div
                        key={activity}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          formData.activityPreferences.includes(activity)
                            ? "border-black bg-black text-white shadow-lg"
                            : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                        }`}
                        onClick={() => handleActivityChange(activity, !formData.activityPreferences.includes(activity))}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{activityIcons[activity] || "✨"}</span>
                          <Label htmlFor={activity} className={`text-base font-medium cursor-pointer ${
                            formData.activityPreferences.includes(activity) ? "text-white" : "text-gray-900"
                          }`}>
                            {activity}
                          </Label>
                          <Checkbox
                            id={activity}
                            checked={formData.activityPreferences.includes(activity)}
                            onCheckedChange={(checked) => handleActivityChange(activity, checked)}
                            className="hidden"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Custom Activity Section */}
                <div className="border-t pt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Add Custom Activities</h3>
                  <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                    <div className="flex gap-3">
                      <Input
                        placeholder="Enter a custom activity (e.g., Sound Healing, Breathwork, etc.)"
                        value={customActivity}
                        onChange={(e) => setCustomActivity(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addCustomActivity()}
                        className="flex-1 text-lg py-3 border-2 focus:border-black"
                      />
                      <Button
                        type="button"
                        onClick={addCustomActivity}
                        className="bg-black hover:bg-gray-800 text-white px-6 py-3"
                      >
                        Add Activity
                      </Button>
                    </div>
                  </div>

                  {/* Display Added Custom Activities */}
                  {formData.activityPreferences.filter(activity => !activityPreferencesList.includes(activity)).length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-base font-semibold text-gray-900 mb-3">Your Custom Activities:</h4>
                      <div className="flex flex-wrap gap-3">
                        {formData.activityPreferences
                          .filter(activity => !activityPreferencesList.includes(activity))
                          .map((activity, index) => (
                            <div key={index} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full">
                              <span className="font-medium">{activity}</span>
                              <button
                                type="button"
                                onClick={() => handleActivityChange(activity, false)}
                                className="text-white hover:text-red-300 transition-colors"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Property Images</h2>
              <p className="text-gray-600">Showcase your retreat property with stunning photos</p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="bg-gray-50 p-8 rounded-xl">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload Property Photos</h3>
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-gray-400 transition-colors cursor-pointer"
                      onClick={triggerFileUpload}
                    >
                      <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <Upload className="h-8 w-8 text-gray-400" />
                        </div>
                        <div>
                          <Button
                            type="button"
                            onClick={triggerFileUpload}
                            className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-lg font-medium"
                          >
                            <Camera className="h-5 w-5 mr-2" />
                            Choose Images from Device
                          </Button>
                          <p className="text-gray-500 mt-3">
                            Upload high-quality images (JPG, PNG) • Maximum 10 images
                          </p>
                          <p className="text-sm text-gray-400 mt-1">
                            Drag and drop files here or click to browse
                          </p>
                        </div>
                      </div>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>

                  {uploadedImages.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-gray-900">
                          Uploaded Images ({uploadedImages.length})
                        </h4>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={triggerFileUpload}
                          className="text-sm"
                        >
                          Add More Images
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {uploadedImages.map((image, index) => (
                          <div key={image.id} className="relative group">
                            <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-lg overflow-hidden">
                              <Image
                                src={image.preview}
                                alt={image.name}
                                width={300}
                                height={200}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                              />
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg" />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeImage(image.id)}
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                            {index === 0 && (
                              <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium">
                                Primary
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="text-base font-semibold text-blue-900 mb-2">📸 Photo Tips for Better Bookings</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Use natural lighting and capture different times of day</li>
                      <li>• Show key areas: bedrooms, bathrooms, common spaces, and outdoor areas</li>
                      <li>• Include photos of retreat activities and amenities</li>
                      <li>• Highlight unique features and beautiful views</li>
                      <li>• The first image will be your primary listing photo</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex items-center gap-2 hover:bg-gray-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Add New Property</h1>
                  <p className="text-gray-600 mt-1">Create your retreat listing in 6 simple steps</p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <span>Step {currentStep} of {totalSteps}</span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-black h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step Navigation */}
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-4 lg:space-x-8">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 ${
                          currentStep === step.id
                            ? "bg-black text-white shadow-lg scale-110"
                            : currentStep > step.id
                            ? "bg-green-500 text-white shadow-md"
                            : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                        }`}
                        onClick={() => goToStep(step.id)}
                      >
                        {currentStep > step.id ? "✓" : step.id}
                      </div>
                      <div className={`mt-2 text-xs font-medium text-center max-w-20 ${
                        currentStep === step.id ? "text-black" : "text-gray-500"
                      }`}>
                        {step.title}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-8 lg:w-16 h-0.5 mx-2 lg:mx-4 transition-colors duration-200 ${
                        currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 lg:p-8">
              {renderStepContent()}
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="bg-white border-t shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 text-sm font-medium disabled:opacity-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                <span>Step {currentStep} of {totalSteps}</span>
                <span>•</span>
                <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
              </div>

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-black hover:bg-gray-800 text-white px-6 py-3 text-sm font-medium shadow-lg"
                >
                  Next
                  <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-sm font-medium shadow-lg"
                >
                  Create Property
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}