"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import Image from "next/image"

// Mock property data
const mockProperties = [
  {
    id: "prop1",
    title: "Mountain Retreat Cabin",
    location: "123 Mountain View Drive, Aspen, Colorado, USA",
    latitude: "39.1911",
    longitude: "-106.8175",
    propertyType: "cabin",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 8,
    pricePerNight: "250",
    description: "A beautiful mountain retreat perfect for yoga and meditation retreats. Nestled in the heart of the Rocky Mountains, this cabin offers breathtaking views and a peaceful atmosphere ideal for wellness retreats.",
    amenities: ["Wifi", "Parking", "TV", "Kitchen", "Air Conditioning", "Heating", "Fireplace"],
    activityPreferences: ["Yoga", "Meditation", "Hiking", "Nature", "Relaxation", "Sound Healing"],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
    ]
  },
  {
    id: "prop2",
    title: "Lakeside Villa",
    location: "456 Lake Shore Drive, Lake Tahoe, California, USA",
    latitude: "39.0968",
    longitude: "-120.0324",
    propertyType: "villa",
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 10,
    pricePerNight: "350",
    description: "Stunning lakeside villa with panoramic views and luxury amenities.",
    amenities: ["Wifi", "Parking", "Pool", "Kitchen", "Air Conditioning", "Hot Tub"],
    activityPreferences: ["Spa", "Wellness", "Fitness", "Adventure", "Detox"],
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6"]
  }
]

// Form options
const amenitiesList = [
  "Wifi", "Parking", "TV", "Kitchen", "Air Conditioning",
  "Heating", "Pool", "Hot Tub", "Fireplace", "Gym",
  "Laundry", "Pet Friendly", "Smoking Allowed"
]

const activityPreferencesList = [
  "Yoga", "Meditation", "Hiking", "Spa", "Wellness",
  "Fitness", "Nature", "Adventure", "Relaxation",
  "Mindfulness", "Detox", "Retreat"
]

const propertyTypes = [
  { value: "cabin", label: "Cabin" },
  { value: "villa", label: "Villa" },
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "bungalow", label: "Bungalow" },
  { value: "lodge", label: "Lodge" },
  { value: "resort", label: "Resort" },
  { value: "farmhouse", label: "Farmhouse" }
]

export default function PropertyFormPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get('edit')
  const isEditing = !!editId
  const [loading, setLoading] = useState(isEditing)
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedImages, setUploadedImages] = useState([])
  const [customActivity, setCustomActivity] = useState("")
  const [draggedImageIndex, setDraggedImageIndex] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [dragOverIndex, setDragOverIndex] = useState(null)
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
    { id: 1, title: "Basic Information" },
    { id: 2, title: "Location Details" },
    { id: 3, title: "Property Specifications" },
    { id: 4, title: "Amenities & Features" },
    { id: 5, title: "Activities & Experiences" },
    { id: 6, title: "Images & Media" }
  ]

  const totalSteps = steps.length

  useEffect(() => {
    if (isEditing) {
      const property = mockProperties.find(p => p.id === editId)
      if (property) {
        setFormData({
          title: property.title || "",
          description: property.description || "",
          location: property.location || "",
          longitude: property.longitude || "",
          latitude: property.latitude || "",
          propertyType: property.propertyType || "",
          bedrooms: property.bedrooms?.toString() || "",
          bathrooms: property.bathrooms?.toString() || "",
          maxGuests: property.maxGuests?.toString() || "",
          pricePerNight: property.pricePerNight || "",
          amenities: property.amenities || [],
          activityPreferences: property.activityPreferences || [],
          images: property.images || []
        })

        if (property.images && property.images.length > 0) {
          const imageObjects = property.images.map((url, index) => ({
            id: `existing-${index}`,
            name: `image-${index + 1}.jpg`,
            preview: url,
            file: null
          }))
          setUploadedImages(imageObjects)
        }
      }
      setLoading(false)
    }
  }, [editId, isEditing])

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

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)

    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newImage = {
            id: Date.now() + Math.random(),
            name: file.name,
            preview: e.target.result,
            file: file
          }
          setUploadedImages(prev => [...prev, newImage])
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, e.target.result]
          }))
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const removeImage = (imageId) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId))
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => uploadedImages[index]?.id !== imageId)
    }))
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  // Drag and drop handlers for file upload
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    const imageFiles = files.filter(file => file.type.startsWith('image/'))

    if (imageFiles.length > 0) {
      handleFileUpload({ target: { files: imageFiles } })
    }
  }

  // Drag and drop handlers for image reordering
  const handleImageDragStart = (e, index) => {
    setDraggedImageIndex(index)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', index.toString())
  }

  const handleImageDragOver = (e, index) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverIndex(index)
  }

  const handleImageDragLeave = () => {
    setDragOverIndex(null)
  }

  const handleImageDrop = (e, dropIndex) => {
    e.preventDefault()
    setDragOverIndex(null)

    if (draggedImageIndex === null || draggedImageIndex === dropIndex) {
      setDraggedImageIndex(null)
      return
    }

    const newImages = [...uploadedImages]
    const draggedImage = newImages[draggedImageIndex]

    // Remove the dragged image from its original position
    newImages.splice(draggedImageIndex, 1)

    // Insert it at the new position
    newImages.splice(dropIndex, 0, draggedImage)

    setUploadedImages(newImages)
    setDraggedImageIndex(null)
  }

  const handleImageDragEnd = () => {
    setDraggedImageIndex(null)
    setDragOverIndex(null)
  }

  // Move image functions for easier reordering
  const moveImageLeft = (index) => {
    if (index > 0) {
      const newImages = [...uploadedImages]
      const temp = newImages[index]
      newImages[index] = newImages[index - 1]
      newImages[index - 1] = temp
      setUploadedImages(newImages)
    }
  }

  const moveImageRight = (index) => {
    if (index < uploadedImages.length - 1) {
      const newImages = [...uploadedImages]
      const temp = newImages[index]
      newImages[index] = newImages[index + 1]
      newImages[index + 1] = temp
      setUploadedImages(newImages)
    }
  }

  // Dynamic layout based on image count
  const getImageGridLayout = (imageCount) => {
    switch (imageCount) {
      case 1:
        return "grid-cols-1 max-w-sm mx-auto"
      case 2:
        return "grid-cols-1 sm:grid-cols-2 max-w-lg mx-auto"
      case 3:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-2xl mx-auto"
      case 4:
        return "grid-cols-2 md:grid-cols-2 max-w-xl mx-auto"
      case 5:
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-3 max-w-2xl mx-auto"
      case 6:
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-3 max-w-3xl mx-auto"
      case 7:
      case 8:
      case 9:
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-3 max-w-3xl mx-auto"
      default:
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 max-w-4xl mx-auto"
    }
  }

  // Get special styling for different image counts
  const getImageAspectRatio = (imageCount, index) => {
    if (imageCount === 1) return "aspect-[4/3]" // Landscape for single image
    if (imageCount === 2) return "aspect-square" // Square for pair
    if (imageCount === 3 && index === 0) return "aspect-[4/3]" // First image landscape in trio
    return "aspect-square" // Default square
  }

  const addCustomActivity = () => {
    if (customActivity.trim() && !formData.activityPreferences.includes(customActivity.trim())) {
      setFormData(prev => ({
        ...prev,
        activityPreferences: [...prev.activityPreferences, customActivity.trim()]
      }))
      setCustomActivity("")
      toast.success("Custom activity added successfully")
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

  const goToStep = (stepNumber) => {
    if (stepNumber <= currentStep || validateStepsUpTo(stepNumber - 1)) {
      setCurrentStep(stepNumber)
    }
  }

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.title || !formData.pricePerNight) {
          toast.error("Please fill in all required fields")
          return false
        }
        break
      case 2:
        if (!formData.location) {
          toast.error("Please enter a location")
          return false
        }
        break
      case 3:
        if (!formData.propertyType) {
          toast.error("Please select a property type")
          return false
        }
        break
      default:
        break
    }
    return true
  }

  const validateStepsUpTo = (stepNumber) => {
    for (let i = 1; i <= stepNumber; i++) {
      const currentStepBackup = currentStep
      setCurrentStep(i)
      if (!validateCurrentStep()) {
        setCurrentStep(currentStepBackup)
        return false
      }
    }
    return true
  }

  const handleSubmit = () => {
    if (!formData.title || !formData.location || !formData.propertyType || !formData.pricePerNight) {
      toast.error("Please fill in all required fields")
      return
    }

    console.log(`${isEditing ? 'Updated' : 'Created'} property data:`, formData)
    toast.success(`Property ${isEditing ? 'updated' : 'created'} successfully!`)
    router.push("/dashboard/properties")
  }

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-black mb-2">Basic Information</h2>
              <p className="text-sm text-gray-600">
                {isEditing ? "Update your property details" : "Tell us about your retreat property"}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
                  <Label htmlFor="title" className="text-sm font-medium text-black block mb-2">
                    Property Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Serene Mountain Yoga Retreat"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="text-sm py-2 border focus:border-black transition-colors"
                  />
                  <p className="text-xs text-gray-600 mt-1">Create an engaging title for your property</p>
                </div>

                <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-xl border border-gray-300">
                  <Label htmlFor="pricePerNight" className="text-sm font-medium text-black block mb-2">
                    Price Per Night <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-sm">$</span>
                    <Input
                      id="pricePerNight"
                      type="number"
                      placeholder="250"
                      value={formData.pricePerNight}
                      onChange={(e) => handleInputChange("pricePerNight", e.target.value)}
                      className="text-sm py-2 pl-7 border focus:border-black transition-colors"
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Set your nightly rate in USD</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-200 to-gray-300 p-4 rounded-xl border border-gray-400">
                <Label htmlFor="description" className="text-sm font-medium text-black block mb-2">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your retreat property, its unique features, and the experience guests can expect..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={8}
                  className="text-sm border focus:border-black resize-none transition-colors"
                />
                <p className="text-xs text-gray-600 mt-1">Paint a picture of your property</p>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-black mb-2">Location Details</h2>
              <p className="text-sm text-gray-600">
                {isEditing ? "Update location information" : "Where is your retreat located?"}
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-gray-50 to-gray-150 p-4 rounded-xl border border-gray-200">
                <Label htmlFor="location" className="text-sm font-medium text-black block mb-2">
                  Property Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  placeholder="123 Mountain View Drive, Aspen, Colorado, USA"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="text-sm py-2 border focus:border-black transition-colors"
                />
                <p className="text-xs text-gray-600 mt-1">Complete address including city, state, and country</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-xl border border-gray-300">
                  <Label htmlFor="latitude" className="text-sm font-medium text-black block mb-2">
                    Latitude
                  </Label>
                  <Input
                    id="latitude"
                    placeholder="39.1911"
                    value={formData.latitude}
                    onChange={(e) => handleInputChange("latitude", e.target.value)}
                    className="text-sm py-2 border focus:border-black transition-colors"
                  />
                  <p className="text-xs text-gray-600 mt-1">Decimal degrees (North is positive)</p>
                </div>

                <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-xl border border-gray-300">
                  <Label htmlFor="longitude" className="text-sm font-medium text-black block mb-2">
                    Longitude
                  </Label>
                  <Input
                    id="longitude"
                    placeholder="-106.8175"
                    value={formData.longitude}
                    onChange={(e) => handleInputChange("longitude", e.target.value)}
                    className="text-sm py-2 border focus:border-black transition-colors"
                  />
                  <p className="text-xs text-gray-600 mt-1">Decimal degrees (West is negative)</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-3 rounded-lg border border-gray-300">
                <p className="text-xs text-gray-700">
                  <strong>Tip:</strong> Find coordinates on Google Maps by right-clicking your location
                </p>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-black mb-2">Property Specifications</h2>
              <p className="text-sm text-gray-600">
                {isEditing ? "Update property type and capacity" : "Define your property type and capacity"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-gray-50 to-gray-150 p-4 rounded-xl border border-gray-200">
                <Label htmlFor="propertyType" className="text-sm font-medium text-black block mb-2">
                  Property Type <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.propertyType} onValueChange={(value) => handleInputChange("propertyType", value)}>
                  <SelectTrigger className="text-sm py-2 border focus:border-black transition-colors bg-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300 shadow-lg">
                    {propertyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value} className="hover:bg-gray-100 focus:bg-gray-100">
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-600 mt-1">Choose your property category</p>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-3 rounded-lg border border-gray-300">
                    <Label htmlFor="bedrooms" className="text-sm font-medium text-black block mb-1">
                      Bedrooms
                    </Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      min="1"
                      max="20"
                      placeholder="3"
                      value={formData.bedrooms}
                      onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                      className="text-sm py-1 border focus:border-black transition-colors"
                    />
                  </div>
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-3 rounded-lg border border-gray-300">
                    <Label htmlFor="bathrooms" className="text-sm font-medium text-black block mb-1">
                      Bathrooms
                    </Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      min="1"
                      max="10"
                      placeholder="2"
                      value={formData.bathrooms}
                      onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                      className="text-sm py-1 border focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-150 to-gray-250 p-3 rounded-lg border border-gray-400">
                  <Label htmlFor="maxGuests" className="text-sm font-medium text-black block mb-1">
                    Maximum Guests
                  </Label>
                  <Input
                    id="maxGuests"
                    type="number"
                    min="1"
                    max="50"
                    placeholder="8"
                    value={formData.maxGuests}
                    onChange={(e) => handleInputChange("maxGuests", e.target.value)}
                    className="text-sm py-1 border focus:border-black transition-colors"
                  />
                  <p className="text-xs text-gray-600 mt-1">Total guest capacity</p>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-black mb-2">Amenities & Features</h2>
              <p className="text-sm text-gray-600">
                {isEditing ? "Update available amenities" : "What amenities do you offer?"}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {amenitiesList.map((amenity) => (
                <div
                  key={amenity}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    formData.amenities.includes(amenity)
                      ? "border-black bg-gradient-to-br from-gray-800 to-black text-white shadow-md transform scale-105"
                      : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:shadow-sm hover:bg-white"
                  }`}
                  onClick={() => handleAmenityChange(amenity, !formData.amenities.includes(amenity))}
                >
                  <div className="text-center">
                    <Label htmlFor={amenity} className={`text-xs font-medium cursor-pointer block ${
                      formData.amenities.includes(amenity) ? "text-white" : "text-gray-700"
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
              ))}
            </div>

            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-3 rounded-lg border border-gray-300">
              <p className="text-xs text-gray-700">
                <strong>Tip:</strong> Select all amenities available to guests to increase booking appeal
              </p>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-black mb-2">Activities & Experiences</h2>
              <p className="text-sm text-gray-600">
                {isEditing ? "Update retreat activities" : "What activities do you offer?"}
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {activityPreferencesList.map((activity) => (
                  <div
                    key={activity}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      formData.activityPreferences.includes(activity)
                        ? "border-black bg-gradient-to-br from-gray-700 to-gray-900 text-white shadow-md transform scale-105"
                        : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:shadow-sm hover:bg-white"
                    }`}
                    onClick={() => handleActivityChange(activity, !formData.activityPreferences.includes(activity))}
                  >
                    <div className="text-center">
                      <Label htmlFor={activity} className={`text-xs font-medium cursor-pointer block ${
                        formData.activityPreferences.includes(activity) ? "text-white" : "text-gray-700"
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
                ))}
              </div>

              <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-xl border border-gray-300">
                <Label className="text-sm font-medium text-black block mb-2">Add Custom Activity</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., Sound Healing, Breathwork"
                    value={customActivity}
                    onChange={(e) => setCustomActivity(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addCustomActivity()}
                    className="flex-1 text-sm py-2 border focus:border-black transition-colors"
                  />
                  <Button
                    type="button"
                    onClick={addCustomActivity}
                    className="bg-gradient-to-r from-gray-700 to-black hover:from-gray-800 hover:to-gray-900 text-white px-4 py-2 text-sm font-medium rounded-lg"
                  >
                    Add
                  </Button>
                </div>
              </div>

              {formData.activityPreferences.filter(activity => !activityPreferencesList.includes(activity)).length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-black block mb-2">Custom Activities</Label>
                  <div className="flex flex-wrap gap-2">
                    {formData.activityPreferences
                      .filter(activity => !activityPreferencesList.includes(activity))
                      .map((activity, index) => (
                        <div key={index} className="flex items-center gap-2 bg-gradient-to-r from-gray-700 to-black text-white px-3 py-1 rounded-full text-xs">
                          <span>{activity}</span>
                          <button
                            type="button"
                            onClick={() => handleActivityChange(activity, false)}
                            className="text-white hover:text-gray-300 transition-colors font-bold"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-black mb-2">Images & Media</h2>
              <p className="text-sm text-gray-600">
                {isEditing ? "Update property photos" : "Add photos of your property"}
              </p>
            </div>

            <div className="space-y-4">
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                  isDragOver
                    ? "border-black bg-gradient-to-br from-gray-200 to-gray-300 scale-105"
                    : "border-gray-400 bg-gradient-to-br from-gray-50 to-gray-150 hover:border-gray-500"
                }`}
                onClick={triggerFileUpload}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="space-y-3">
                  <div className="mx-auto w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xl text-gray-600">📷</span>
                  </div>
                  <div>
                    <Button
                      type="button"
                      onClick={triggerFileUpload}
                      className="bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-gray-800 text-white px-6 py-2 text-sm font-medium rounded-lg"
                    >
                      Choose Images
                    </Button>
                    <p className="text-gray-600 mt-2 text-sm">
                      {isDragOver ? "Drop images here" : "JPG, PNG • Max 10 images"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {isDragOver ? "Release to upload" : "Drag and drop files here or click to browse"}
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

              {uploadedImages.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-black">
                      {isEditing ? "Current Images" : "Uploaded"} ({uploadedImages.length})
                    </Label>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={triggerFileUpload}
                      className="text-xs px-3 py-1 border border-gray-400 hover:border-black transition-colors"
                    >
                      Add More
                    </Button>
                  </div>

                  <div className={`grid gap-4 ${getImageGridLayout(uploadedImages.length)}`}>
                    {uploadedImages.map((image, index) => (
                      <div
                        key={image.id}
                        className={`relative group transition-all duration-200 ${
                          draggedImageIndex === index ? "opacity-50 scale-95" : ""
                        } ${
                          dragOverIndex === index ? "ring-2 ring-black ring-offset-2" : ""
                        }`}
                        draggable
                        onDragStart={(e) => handleImageDragStart(e, index)}
                        onDragOver={(e) => handleImageDragOver(e, index)}
                        onDragLeave={handleImageDragLeave}
                        onDrop={(e) => handleImageDrop(e, index)}
                        onDragEnd={handleImageDragEnd}
                      >
                        <div className={`${getImageAspectRatio(uploadedImages.length, index)} bg-gray-200 rounded-lg overflow-hidden`}>
                          <Image
                            src={image.preview}
                            alt={image.name}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover transition-transform duration-200"
                          />
                        </div>

                        {/* Overlay with controls */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 rounded-lg flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center space-x-2">
                            {/* Move Left Button */}
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => moveImageLeft(index)}
                                className="bg-white/90 hover:bg-white text-black p-2 rounded-full shadow-md transition-all hover:scale-110"
                                title="Move left"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                              </button>
                            )}

                            {/* Drag Handle */}
                            <div className="bg-white/90 text-black p-2 rounded-full shadow-md cursor-move" title="Drag to reorder">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                              </svg>
                            </div>

                            {/* Move Right Button */}
                            {index < uploadedImages.length - 1 && (
                              <button
                                type="button"
                                onClick={() => moveImageRight(index)}
                                className="bg-white/90 hover:bg-white text-black p-2 rounded-full shadow-md transition-all hover:scale-110"
                                title="Move right"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                          title="Remove image"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>

                        {/* Primary Badge */}
                        {index === 0 && (
                          <div className="absolute top-2 left-2 bg-gradient-to-r from-gray-800 to-black text-white px-2 py-1 rounded text-xs font-medium shadow-md">
                            Primary
                          </div>
                        )}

                        {/* Position Number */}
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                          {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-3 rounded-lg border border-gray-300">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-700">
                    <strong>Tips:</strong> Use natural lighting • Show key areas • First image is primary
                  </p>
                  {uploadedImages.length > 0 && (
                    <div className="text-xs text-gray-600 bg-white px-2 py-1 rounded">
                      Layout: {uploadedImages.length} image{uploadedImages.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-black mx-auto"></div>
          <p className="text-gray-600">Loading property data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Floating Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-300/50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="text-sm text-gray-600 hover:text-black hover:bg-gray-100 px-3 py-2 rounded-lg transition-all"
              >
                ← Back
              </Button>
              <div className="h-6 w-px bg-gray-400"></div>
              <div>
                <h1 className="text-xl font-semibold text-black">
                  {isEditing ? "Edit Property" : "New Property"}
                </h1>
                <p className="text-xs text-gray-600">
                  {isEditing ? "Update your listing" : "Create your retreat listing"}
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <span className="text-xs text-gray-600">Progress</span>
              <div className="w-24 bg-gray-300 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-gray-800 to-black h-1.5 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
              <span className="text-xs font-medium text-black">{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Creative Step Navigation */}
      <div className="relative">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="relative">
            {/* Background Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-300"></div>
            <div
              className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-gray-700 to-black transition-all duration-700 ease-out"
              style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            ></div>

            {/* Step Dots */}
            <div className="relative flex justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center group">
                  <div
                    className={`w-12 h-12 rounded-full border-4 cursor-pointer transition-all duration-300 flex items-center justify-center ${
                      currentStep === step.id
                        ? "bg-gradient-to-r from-gray-800 to-black border-white shadow-lg scale-110"
                        : currentStep > step.id
                        ? "bg-gradient-to-r from-gray-600 to-gray-800 border-white shadow-md"
                        : "bg-white border-gray-400 hover:border-gray-500 hover:shadow-sm"
                    }`}
                    onClick={() => goToStep(step.id)}
                  >
                    <span className={`text-sm font-semibold ${
                      currentStep >= step.id ? "text-white" : "text-gray-600"
                    }`}>
                      {currentStep > step.id ? "✓" : step.id}
                    </span>
                  </div>
                  <div className={`mt-2 text-xs font-medium text-center max-w-20 transition-colors ${
                    currentStep === step.id ? "text-black" : "text-gray-600"
                  }`}>
                    {step.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200">
          <div className="p-6">
            {renderStepContent()}
          </div>
        </div>
      </div>

      {/* Clean Footer Navigation */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex items-center space-x-6 bg-white/95 backdrop-blur-md shadow-xl border border-gray-300 px-6 py-3">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`text-sm font-medium px-6 py-2 transition-all ${
              currentStep === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white shadow-md"
            }`}
          >
            ← Previous
          </button>

          <div className="flex items-center space-x-2 text-xs text-gray-600 px-4">
            <span>{currentStep}</span>
            <span>/</span>
            <span>{totalSteps}</span>
          </div>

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-gray-800 text-white px-6 py-2 text-sm font-medium shadow-md transition-all"
            >
              Next →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-900 hover:to-gray-700 text-white px-8 py-2 text-sm font-medium shadow-md transition-all"
            >
              {isEditing ? "Update" : "Create"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
