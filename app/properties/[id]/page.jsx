"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format, addDays } from "date-fns";
import {
  Calendar as CalendarIcon,
  Home,
  Users,
  Bath,
  Bed,
  MapPin,
  Wifi,
  Car,
  Tv,
  Coffee,
  Utensils,
  Snowflake,
  Flame,
  ChevronDown,
  Star,
  Waves,
  Edit,
  Upload,
  X,
  Check,
  Crown,
  Plus,
  Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import PropertyMap from "@/components/property-map";

// Mock property data
const mockProperties = [
  {
    id: "prop1",
    name: "Mountain Retreat Cabin",
    description: "Experience the beauty of the mountains in this cozy cabin retreat. Perfect for families and nature lovers, this cabin offers stunning views and a peaceful environment.",
    location: "Aspen, Colorado",
    type: "Cabin",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    price: "$250/night",
    status: "active",
    latitude: 39.1911,
    longitude: -106.8175,
    amenities: ["Wifi", "Parking", "TV", "Kitchen", "Air Conditioning", "Heating", "Pool"],
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994"
    ]
  },
  {
    id: "prop2",
    name: "Lakeside Villa",
    description: "Luxurious villa with breathtaking lake views. Enjoy the serene environment and modern amenities in this spacious property perfect for a relaxing getaway.",
    location: "Lake Tahoe, California",
    type: "Villa",
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    price: "$350/night",
    status: "active",
    latitude: 39.0968,
    longitude: -120.0324,
    amenities: ["Wifi", "Parking", "TV", "Kitchen", "Air Conditioning", "Heating", "Pool", "Hot Tub"],
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83"
    ]
  },
  {
    id: "prop3",
    name: "Desert Oasis Retreat",
    description: "Find peace and tranquility in this desert oasis. With stunning red rock views and a private setting, this is the perfect place to disconnect and recharge.",
    location: "Sedona, Arizona",
    type: "House",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    price: "$180/night",
    status: "inactive",
    latitude: 34.8697,
    longitude: -111.7610,
    amenities: ["Wifi", "Parking", "TV", "Kitchen", "Air Conditioning", "Heating"],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
    ]
  }
];

export default function PropertyPage() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [guestCounts, setGuestCounts] = useState({
    adults: 1,
    children: 0,
    pets: 0
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [isEditingImages, setIsEditingImages] = useState(false);
  const [images, setImages] = useState([]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchProperty = () => {
      setLoading(true);
      const foundProperty = mockProperties.find(p => p.id === params.id);
      setProperty(foundProperty || null);
      if (foundProperty) {
        setImages(foundProperty.images);
        setPrimaryImageIndex(0);
      }
      setLoading(false);
    };

    fetchProperty();
  }, [params.id]);

  useEffect(() => {
    if (property) {
      // Calculate total price based on selected dates
      const pricePerNight = parseInt(property.price.replace(/\D/g, ''));
      const nights = dateRange.from && dateRange.to
        ? Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 3600 * 24))
        : 0;

      // Calculate total with cleaning fee and service fee
      const cleaningFee = 75;
      const serviceFee = Math.round(pricePerNight * nights * 0.12);
      setTotalPrice(pricePerNight * nights + cleaningFee + serviceFee);
    }
  }, [property, dateRange]);

  // Image management functions
  const handleSetPrimary = (index) => {
    setPrimaryImageIndex(index);
    setSelectedImage(index);
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);

    // Adjust primary image index if needed
    if (primaryImageIndex >= index && primaryImageIndex > 0) {
      setPrimaryImageIndex(primaryImageIndex - 1);
    }

    // Adjust selected image if needed
    if (selectedImage >= index && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    } else if (selectedImage >= newImages.length) {
      setSelectedImage(newImages.length - 1);
    }
  };

  const handleAddImage = () => {
    // In a real app, this would open a file picker
    const newImageUrl = prompt("Enter image URL:");
    if (newImageUrl) {
      setImages([...images, newImageUrl]);
    }
  };

  // Guest count management functions
  const updateGuestCount = (type, increment) => {
    setGuestCounts(prev => {
      const newCount = increment ? prev[type] + 1 : prev[type] - 1;
      return {
        ...prev,
        [type]: Math.max(0, newCount)
      };
    });
  };

  const getTotalGuests = () => {
    return guestCounts.adults + guestCounts.children;
  };

  const getGuestSummary = () => {
    const parts = [];
    if (guestCounts.adults > 0) {
      parts.push(`${guestCounts.adults} ${guestCounts.adults === 1 ? 'adult' : 'adults'}`);
    }
    if (guestCounts.children > 0) {
      parts.push(`${guestCounts.children} ${guestCounts.children === 1 ? 'child' : 'children'}`);
    }
    if (guestCounts.pets > 0) {
      parts.push(`${guestCounts.pets} ${guestCounts.pets === 1 ? 'pet' : 'pets'}`);
    }
    return parts.length > 0 ? parts.join(', ') : '0 guests';
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-muted rounded w-1/4 mb-8"></div>
          <div className="h-96 bg-muted rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="h-6 bg-muted rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-3/4 mb-6"></div>
              <div className="h-6 bg-muted rounded w-1/4 mb-4"></div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="h-12 bg-muted rounded"></div>
                <div className="h-12 bg-muted rounded"></div>
                <div className="h-12 bg-muted rounded"></div>
                <div className="h-12 bg-muted rounded"></div>
              </div>
            </div>
            <div>
              <div className="h-64 bg-muted rounded mb-4"></div>
              <div className="h-10 bg-muted rounded mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
        <p className="text-muted-foreground mb-6">The property you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <a href="/dashboard/properties">Back to Properties</a>
                    </Button>
                  </div>
    );
  }

  const amenityIcons = {
    "Wifi": <Wifi className="h-5 w-5" />,
    "Parking": <Car className="h-5 w-5" />,
    "TV": <Tv className="h-5 w-5" />,
    "Kitchen": <Utensils className="h-5 w-5" />,
    "Air Conditioning": <Snowflake className="h-5 w-5" />,
    "Heating": <Flame className="h-5 w-5" />,
    "Pool": <Waves className="h-5 w-5" />
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto py-8 px-4 flex-1">
        <h1 className="text-3xl font-bold mb-2">{property.name}</h1>
        <p className="flex items-center text-muted-foreground mb-6">
          <MapPin className="h-4 w-4 mr-1" />
          {property.location}
        </p>

        {/* Enhanced Image Gallery */}
        <div className="mb-8 relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Property Images</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditingImages(!isEditingImages)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              {isEditingImages ? 'Done Editing' : 'Edit Images'}
            </Button>
          </div>

          {/* Enhanced Mosaic Image Display */}
          <div className="relative">
            {images.length === 1 ? (
              /* Single Image Layout */
              <div className="relative h-[500px] rounded-xl overflow-hidden group">
                <Image
                  src={images[0]}
                  alt={property.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                {isEditingImages && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={handleAddImage}
                        className="bg-white text-black hover:bg-gray-100"
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Add More Images
                      </Button>
                    </div>
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                  <Crown className="h-4 w-4 mr-1" />
                  Primary
                </div>
              </div>
            ) : images.length === 2 ? (
              /* Two Images Layout */
              <div className="grid grid-cols-2 gap-3 h-[500px]">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative rounded-xl overflow-hidden cursor-pointer group transition-all ${
                      selectedImage === index ? "ring-4 ring-primary shadow-2xl" : "hover:shadow-xl"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image}
                      alt={`${property.name} - Image ${index + 1}`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    {index === primaryImageIndex && (
                      <div className="absolute top-3 left-3 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                        <Crown className="h-3 w-3 mr-1" />
                        Primary
                      </div>
                    )}
                    {isEditingImages && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex gap-2">
                          {index !== primaryImageIndex && (
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSetPrimary(index);
                              }}
                              className="bg-white text-black hover:bg-gray-100"
                            >
                              <Crown className="h-4 w-4 mr-1" />
                              Set Primary
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage(index);
                            }}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* Multiple Images Mosaic Layout */
              <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[500px]">
                {/* Main large image */}
                <div
                  className={`col-span-2 row-span-2 relative rounded-xl overflow-hidden cursor-pointer group transition-all ${
                    selectedImage === 0 ? "ring-4 ring-primary shadow-2xl" : "hover:shadow-xl"
                  }`}
                  onClick={() => setSelectedImage(0)}
                >
                  <Image
                    src={images[0]}
                    alt={`${property.name} - Main`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  {0 === primaryImageIndex && (
                    <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Crown className="h-4 w-4 mr-1" />
                      Primary
                    </div>
                  )}
                  {isEditingImages && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-2">
                        {0 !== primaryImageIndex && (
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSetPrimary(0);
                            }}
                            className="bg-white text-black hover:bg-gray-100"
                          >
                            <Crown className="h-4 w-4 mr-1" />
                            Set Primary
                          </Button>
                        )}
                        {images.length > 1 && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage(0);
                            }}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Secondary images */}
                {images.slice(1, 5).map((image, index) => {
                  const actualIndex = index + 1;
                  const isLastVisible = actualIndex === 4 && images.length > 5;

                  return (
                    <div
                      key={actualIndex}
                      className={`relative rounded-xl overflow-hidden cursor-pointer group transition-all ${
                        selectedImage === actualIndex ? "ring-4 ring-primary shadow-2xl" : "hover:shadow-xl"
                      }`}
                      onClick={() => setSelectedImage(actualIndex)}
                    >
                      <Image
                        src={image}
                        alt={`${property.name} - Image ${actualIndex + 1}`}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />

                      {/* Show remaining count overlay */}
                      {isLastVisible && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <div className="text-white text-center">
                            <span className="text-2xl font-bold">+{images.length - 5}</span>
                            <p className="text-sm">more photos</p>
                          </div>
                        </div>
                      )}

                      {actualIndex === primaryImageIndex && (
                        <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                          <Crown className="h-3 w-3 mr-1" />
                          Primary
                        </div>
                      )}

                      {isEditingImages && !isLastVisible && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex gap-1">
                            {actualIndex !== primaryImageIndex && (
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSetPrimary(actualIndex);
                                }}
                                className="bg-white text-black hover:bg-gray-100 p-1 h-8 w-8"
                              >
                                <Crown className="h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveImage(actualIndex);
                              }}
                              className="p-1 h-8 w-8"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Add Image Button */}
                {isEditingImages && images.length < 5 && (
                  <div
                    className="rounded-xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center cursor-pointer hover:border-primary transition-colors bg-muted/20"
                    onClick={handleAddImage}
                  >
                    <div className="text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Add Image</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* All Images Thumbnail Strip (for navigation when more than 5 images) */}
            {images.length > 5 && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative h-16 w-24 rounded-lg overflow-hidden cursor-pointer transition-all flex-shrink-0 ${
                      selectedImage === index ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image}
                      alt={`${property.name} - Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {index === primaryImageIndex && (
                      <div className="absolute top-1 right-1 bg-yellow-500 rounded-full p-1">
                        <Crown className="h-2 w-2 text-black" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image Counter */}
          <div className="mt-4 text-center text-sm text-muted-foreground">
            {selectedImage + 1} of {images.length} images
            {primaryImageIndex === selectedImage && " (Primary)"}
          </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">About this property</h2>
                <p className="text-muted-foreground">{property.description}</p>
                  </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
                <div className="flex flex-col items-center justify-center p-4 bg-muted/20 rounded-lg">
                  <Home className="h-6 w-6 mb-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Type</span>
                  <span className="font-medium">{property.type}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-muted/20 rounded-lg">
                  <Bed className="h-6 w-6 mb-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Bedrooms</span>
                  <span className="font-medium">{property.bedrooms}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-muted/20 rounded-lg">
                  <Bath className="h-6 w-6 mb-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Bathrooms</span>
                  <span className="font-medium">{property.bathrooms}</span>
                    </div>
                <div className="flex flex-col items-center justify-center p-4 bg-muted/20 rounded-lg">
                  <Users className="h-6 w-6 mb-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Max Guests</span>
                  <span className="font-medium">{property.maxGuests}</span>
                  </div>
              </div>
            </TabsContent>

            <TabsContent value="amenities">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center p-3 bg-muted/20 rounded-lg">
                    {amenityIcons[amenity] || <Coffee className="h-5 w-5 mr-2 text-muted-foreground" />}
                    <span className="ml-2">{amenity}</span>
                    </div>
                ))}
                    </div>
            </TabsContent>

            <TabsContent value="location">
              <div className="py-4">
                <h3 className="text-lg font-medium mb-2">Property Location</h3>
                <p className="text-muted-foreground mb-4">{property.location}</p>
                <div className="h-[400px] rounded-lg overflow-hidden">
                  <PropertyMap
                    properties={[property]}
                    selectedProperty={property}
                    height="400px"
                    zoom={13}
                  />
                  </div>
              </div>
            </TabsContent>
          </Tabs>
          </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{property.price}</CardTitle>
              <CardDescription>per night</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label>Check-in</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from ? (
                            format(dateRange.from, "MMM d, yyyy")
                          ) : (
                            <span>Select date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-background border shadow-lg" align="start">
                        <Calendar
                          mode="single"
                          selected={dateRange.from}
                          onSelect={(date) =>
                            setDateRange((prev) => ({
                              ...prev,
                              from: date,
                              to: date && prev.to && date > prev.to ? addDays(date, 1) : prev.to,
                            }))
                          }
                          initialFocus
                          className="bg-background"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-1">
                    <Label>Check-out</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.to ? (
                            format(dateRange.to, "MMM d, yyyy")
                          ) : (
                            <span>Select date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-background border shadow-lg" align="start">
                        <Calendar
                          mode="single"
                          selected={dateRange.to}
                          onSelect={(date) =>
                            setDateRange((prev) => ({
                              ...prev,
                              to: date,
                            }))
                          }
                          disabled={(date) =>
                            date < dateRange.from || date < new Date()
                          }
                          initialFocus
                          className="bg-background"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Guests</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-between text-left font-normal">
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4" />
                          <span className="truncate">{getGuestSummary()}</span>
                        </div>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-4 bg-background border shadow-lg" align="end">
                      <div className="space-y-4">
                        <div className="text-sm font-medium">Who's coming?</div>

                        {/* Adults */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Adults</div>
                            <div className="text-sm text-muted-foreground">Ages 13 or above</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateGuestCount('adults', false)}
                              disabled={guestCounts.adults <= 1}
                              className="h-8 w-8"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{guestCounts.adults}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateGuestCount('adults', true)}
                              disabled={getTotalGuests() >= 10}
                              className="h-8 w-8"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Children */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Children</div>
                            <div className="text-sm text-muted-foreground">Ages 2-12</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateGuestCount('children', false)}
                              disabled={guestCounts.children <= 0}
                              className="h-8 w-8"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{guestCounts.children}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateGuestCount('children', true)}
                              disabled={getTotalGuests() >= 10}
                              className="h-8 w-8"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Pets */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Pets</div>
                            <div className="text-sm text-muted-foreground">Bringing a service animal?</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateGuestCount('pets', false)}
                              disabled={guestCounts.pets <= 0}
                              className="h-8 w-8"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{guestCounts.pets}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateGuestCount('pets', true)}
                              disabled={guestCounts.pets >= 5}
                              className="h-8 w-8"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="text-xs text-muted-foreground pt-2">
                          This place has a maximum of {property.maxGuests} guests, not including infants.
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex justify-between">
                    <span>{property.price} x {dateRange.from && dateRange.to ?
                      Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 3600 * 24)) : 0} nights</span>
                    <span>${parseInt(property.price.replace(/\D/g, '')) *
                      (dateRange.from && dateRange.to ?
                      Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 3600 * 24)) : 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>$75</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>${Math.round(parseInt(property.price.replace(/\D/g, '')) *
                      (dateRange.from && dateRange.to ?
                      Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 3600 * 24)) : 0) * 0.12)}</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${totalPrice}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-black hover:bg-gray-800 text-white"
                  onClick={() => router.push(`/properties/${property.id}/booking`)}
                >
                  Book Now
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  You won't be charged yet
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </div>
  );
}
