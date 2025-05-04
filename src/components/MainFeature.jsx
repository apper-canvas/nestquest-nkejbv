import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const MainFeature = () => {
  // Icons setup before the return statement
  const SearchIcon = getIcon('Search');
  const HomeIcon = getIcon('Home');
  const BuildingIcon = getIcon('Building');
  const DollarSignIcon = getIcon('DollarSign');
  const BedDoubleIcon = getIcon('BedDouble');
  const ShowerHeadIcon = getIcon('ShowerHead');
  const MapPinIcon = getIcon('MapPin');
  const SquareIcon = getIcon('Square');
  const ListFilterIcon = getIcon('ListFilter');
  const CheckCircleIcon = getIcon('CheckCircle');
  
  // State for search form
  const [searchForm, setSearchForm] = useState({
    location: '',
    propertyType: '',
    priceRange: '',
    bedrooms: '',
    bathrooms: '',
    minArea: '',
    features: []
  });
  
  // State for search results
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Available property features for filtering
  const availableFeatures = [
    'Air Conditioning',
    'Swimming Pool',
    'Garden',
    'Garage',
    'Fireplace',
    'Gym',
    'Security System',
    'Balcony'
  ];
  
  // Sample locations for autocomplete
  const popularLocations = [
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Houston, TX',
    'Phoenix, AZ',
    'Philadelphia, PA',
    'San Antonio, TX',
    'San Diego, CA'
  ];
  
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for location field to show suggestions
    if (name === 'location') {
      const filteredLocations = popularLocations.filter(
        location => location.toLowerCase().includes(value.toLowerCase())
      );
      setLocationSuggestions(filteredLocations);
      setShowSuggestions(value.length > 0);
    }
    
    setSearchForm({
      ...searchForm,
      [name]: value
    });
  };
  
  // Handle checkbox change for features
  const handleFeatureToggle = (feature) => {
    const updatedFeatures = searchForm.features.includes(feature)
      ? searchForm.features.filter(f => f !== feature)
      : [...searchForm.features, feature];
    
    setSearchForm({
      ...searchForm,
      features: updatedFeatures
    });
  };
  
  // Select a location suggestion
  const selectLocation = (location) => {
    setSearchForm({
      ...searchForm,
      location
    });
    setShowSuggestions(false);
  };
  
  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setHasSearched(true);
    
    // Validate location
    if (!searchForm.location.trim()) {
      toast.error("Please enter a location to search");
      setIsSearching(false);
      return;
    }
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // Create mock search results based on form data
      // In a real app, this would be replaced with an API call
      const mockResults = generateMockResults(searchForm);
      setSearchResults(mockResults);
      setIsSearching(false);
      
      if (mockResults.length === 0) {
        toast.info("No properties found matching your criteria. Try adjusting your filters.");
      } else {
        toast.success(`Found ${mockResults.length} properties matching your criteria!`);
      }
    }, 1500);
  };
  
  // Generate mock results based on search form
  const generateMockResults = (form) => {
    // This would be replaced with an actual API call in a real app
    const mockDatabase = [
      {
        id: 1,
        title: "Modern Downtown Apartment",
        price: 2200,
        listingType: "rent",
        propertyType: "apartment",
        location: "New York, NY",
        features: {
          bedrooms: 2,
          bathrooms: 1,
          area: 950
        },
        amenities: ["Air Conditioning", "Balcony"],
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80"
      },
      {
        id: 2,
        title: "Luxury Condo with City View",
        price: 780000,
        listingType: "sale",
        propertyType: "condo",
        location: "Los Angeles, CA",
        features: {
          bedrooms: 3,
          bathrooms: 2,
          area: 1800
        },
        amenities: ["Swimming Pool", "Gym", "Security System"],
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80"
      },
      {
        id: 3,
        title: "Family Home in Suburbs",
        price: 450000,
        listingType: "sale",
        propertyType: "house",
        location: "Chicago, IL",
        features: {
          bedrooms: 4,
          bathrooms: 3,
          area: 2500
        },
        amenities: ["Garden", "Garage", "Fireplace"],
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80"
      },
      {
        id: 4,
        title: "Cozy Studio Apartment",
        price: 1400,
        listingType: "rent",
        propertyType: "apartment",
        location: "San Francisco, CA",
        features: {
          bedrooms: 0,
          bathrooms: 1,
          area: 550
        },
        amenities: ["Air Conditioning"],
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80"
      },
      {
        id: 5,
        title: "Waterfront Luxury Home",
        price: 1250000,
        listingType: "sale",
        propertyType: "house",
        location: "Seattle, WA",
        features: {
          bedrooms: 5,
          bathrooms: 4,
          area: 3800
        },
        amenities: ["Swimming Pool", "Garden", "Security System", "Balcony"],
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80"
      }
    ];
    
    // Filter results based on search criteria
    return mockDatabase.filter(property => {
      // Match location (case insensitive, partial match)
      const locationMatch = !form.location || 
        property.location.toLowerCase().includes(form.location.toLowerCase());
      
      // Match property type
      const propertyTypeMatch = !form.propertyType || 
        property.propertyType === form.propertyType;
      
      // Match price range
      let priceMatch = true;
      if (form.priceRange) {
        const [min, max] = form.priceRange.split('-').map(p => parseInt(p.replace(/\D/g, '')));
        priceMatch = property.price >= min && property.price <= max;
      }
      
      // Match bedrooms (min bedrooms)
      const bedroomsMatch = !form.bedrooms || 
        property.features.bedrooms >= parseInt(form.bedrooms);
      
      // Match bathrooms (min bathrooms)
      const bathroomsMatch = !form.bathrooms || 
        property.features.bathrooms >= parseInt(form.bathrooms);
      
      // Match area (min area)
      const areaMatch = !form.minArea || 
        property.features.area >= parseInt(form.minArea);
      
      // Match features/amenities
      const featuresMatch = form.features.length === 0 || 
        form.features.every(feature => property.amenities.includes(feature));
      
      return locationMatch && propertyTypeMatch && priceMatch && 
             bedroomsMatch && bathroomsMatch && areaMatch && featuresMatch;
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card overflow-hidden border border-surface-200 dark:border-surface-700">
        <div className="p-6 md:p-8">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Location Field */}
              <div className="relative col-span-1 md:col-span-2 lg:col-span-3">
                <label htmlFor="location" className="input-label flex items-center mb-1.5">
                  <MapPinIcon className="w-4 h-4 mr-1.5" />
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Enter city, neighborhood, or address"
                  className="w-full py-3 pl-4 pr-10 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 focus:ring-2 focus:ring-primary dark:focus:ring-primary-light"
                  value={searchForm.location}
                  onChange={handleInputChange}
                  onFocus={() => searchForm.location && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                <SearchIcon className="absolute right-3 top-9 w-5 h-5 text-surface-400" />
                
                {/* Location Suggestions */}
                {showSuggestions && locationSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg shadow-soft overflow-hidden">
                    <ul className="py-1 max-h-48 overflow-y-auto">
                      {locationSuggestions.map((location, index) => (
                        <li 
                          key={index}
                          className="px-4 py-2 cursor-pointer hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                          onClick={() => selectLocation(location)}
                        >
                          <div className="flex items-center">
                            <MapPinIcon className="w-4 h-4 mr-2 text-surface-500" />
                            <span>{location}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Basic Filters */}
              <div className="col-span-1">
                <label htmlFor="propertyType" className="input-label flex items-center mb-1.5">
                  <HomeIcon className="w-4 h-4 mr-1.5" />
                  Property Type
                </label>
                <select
                  id="propertyType"
                  name="propertyType"
                  className="w-full rounded-lg"
                  value={searchForm.propertyType}
                  onChange={handleInputChange}
                >
                  <option value="">Any type</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="land">Land</option>
                </select>
              </div>
              
              <div className="col-span-1">
                <label htmlFor="priceRange" className="input-label flex items-center mb-1.5">
                  <DollarSignIcon className="w-4 h-4 mr-1.5" />
                  Price Range
                </label>
                <select
                  id="priceRange"
                  name="priceRange"
                  className="w-full rounded-lg"
                  value={searchForm.priceRange}
                  onChange={handleInputChange}
                >
                  <option value="">Any price</option>
                  <option value="0-300000">$0 - $300,000</option>
                  <option value="300000-600000">$300,000 - $600,000</option>
                  <option value="600000-1000000">$600,000 - $1,000,000</option>
                  <option value="1000000-9999999">$1,000,000+</option>
                  <option value="0-1500">$0 - $1,500/mo (Rent)</option>
                  <option value="1500-3000">$1,500 - $3,000/mo (Rent)</option>
                  <option value="3000-10000">$3,000+/mo (Rent)</option>
                </select>
              </div>
              
              <div className="col-span-1">
                <label htmlFor="bedrooms" className="input-label flex items-center mb-1.5">
                  <BedDoubleIcon className="w-4 h-4 mr-1.5" />
                  Bedrooms
                </label>
                <select
                  id="bedrooms"
                  name="bedrooms"
                  className="w-full rounded-lg"
                  value={searchForm.bedrooms}
                  onChange={handleInputChange}
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
            </div>
            
            {/* Advanced Filters Toggle */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="text-sm flex items-center text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                <ListFilterIcon className="w-4 h-4 mr-1.5" />
                {showAdvancedFilters ? 'Hide advanced filters' : 'Show advanced filters'}
              </button>
              
              <motion.button
                type="submit"
                className="btn-primary px-5 py-2.5"
                disabled={isSearching}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {isSearching ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>Searching...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <SearchIcon className="w-5 h-5 mr-2" />
                    <span>Search Properties</span>
                  </div>
                )}
              </motion.button>
            </div>
            
            {/* Advanced Filters */}
            <AnimatePresence>
              {showAdvancedFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-surface-200 dark:border-surface-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                      <div className="col-span-1">
                        <label htmlFor="bathrooms" className="input-label flex items-center mb-1.5">
                          <ShowerHeadIcon className="w-4 h-4 mr-1.5" />
                          Bathrooms
                        </label>
                        <select
                          id="bathrooms"
                          name="bathrooms"
                          className="w-full rounded-lg"
                          value={searchForm.bathrooms}
                          onChange={handleInputChange}
                        >
                          <option value="">Any</option>
                          <option value="1">1+</option>
                          <option value="2">2+</option>
                          <option value="3">3+</option>
                          <option value="4">4+</option>
                        </select>
                      </div>
                      
                      <div className="col-span-1">
                        <label htmlFor="minArea" className="input-label flex items-center mb-1.5">
                          <SquareIcon className="w-4 h-4 mr-1.5" />
                          Min Area (sq ft)
                        </label>
                        <input
                          id="minArea"
                          name="minArea"
                          type="number"
                          placeholder="Minimum square footage"
                          className="w-full rounded-lg"
                          value={searchForm.minArea}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    {/* Property Features */}
                    <div>
                      <h3 className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Property Features</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {availableFeatures.map((feature) => (
                          <div key={feature} className="flex items-center">
                            <button
                              type="button"
                              onClick={() => handleFeatureToggle(feature)}
                              className={`flex items-center p-2 w-full rounded-lg border transition-colors ${
                                searchForm.features.includes(feature) 
                                  ? 'bg-primary/10 dark:bg-primary/20 border-primary dark:border-primary-light text-primary dark:text-primary-light' 
                                  : 'border-surface-300 dark:border-surface-600 hover:bg-surface-100 dark:hover:bg-surface-700'
                              }`}
                            >
                              <CheckCircleIcon className={`w-4 h-4 mr-2 ${
                                searchForm.features.includes(feature)
                                  ? 'opacity-100'
                                  : 'opacity-30'
                              }`} />
                              <span className="text-sm">{feature}</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
      
      {/* Search Results */}
      <div className="mt-8">
        {isSearching ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-16 h-16 border-4 border-surface-200 dark:border-surface-700 border-t-primary dark:border-t-primary-light rounded-full animate-spin"></div>
          </div>
        ) : hasSearched && (
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {searchResults.length > 0 
                ? `${searchResults.length} properties found`
                : 'No properties found'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {searchResults.map((property) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="card overflow-hidden flex flex-col md:flex-row hover:shadow-soft"
                >
                  <div className="w-full md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-2 left-2">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-md ${
                        property.listingType === 'rent' ? 'bg-secondary text-white' : 'bg-primary text-white'
                      }`}>
                        {property.listingType === 'rent' ? 'For Rent' : 'For Sale'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 md:p-5 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{property.title}</h3>
                      <p className="font-bold text-primary dark:text-primary-light">
                        {property.listingType === 'rent' 
                          ? `$${property.price}/mo` 
                          : `$${property.price.toLocaleString()}`}
                      </p>
                    </div>
                    
                    <div className="flex items-center text-surface-500 dark:text-surface-400 mb-3">
                      <MapPinIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                      <p className="text-sm">{property.location}</p>
                    </div>
                    
                    <div className="flex space-x-4 mb-3">
                      <div className="flex items-center text-surface-600 dark:text-surface-300">
                        <BedDoubleIcon className="w-4 h-4 mr-1" />
                        <span className="text-sm">{property.features.bedrooms}</span>
                      </div>
                      <div className="flex items-center text-surface-600 dark:text-surface-300">
                        <ShowerHeadIcon className="w-4 h-4 mr-1" />
                        <span className="text-sm">{property.features.bathrooms}</span>
                      </div>
                      <div className="flex items-center text-surface-600 dark:text-surface-300">
                        <SquareIcon className="w-4 h-4 mr-1" />
                        <span className="text-sm">{property.features.area} ft²</span>
                      </div>
                    </div>
                    
                    {property.amenities && property.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {property.amenities.map((amenity, index) => (
                          <span 
                            key={index}
                            className="inline-block text-xs px-2 py-1 bg-surface-100 dark:bg-surface-700 rounded-full text-surface-700 dark:text-surface-300"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <button 
                        className="btn-primary px-4 py-2 text-sm w-full md:w-auto"
                        onClick={() => toast.success(`Contact request sent for ${property.title}`)}
                      >
                        Contact Agent
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {searchResults.length === 0 && (
              <div className="text-center p-12 bg-surface-100/50 dark:bg-surface-800/50 rounded-2xl border border-dashed border-surface-300 dark:border-surface-700">
                <BuildingIcon className="w-16 h-16 mx-auto text-surface-400 dark:text-surface-600 mb-4" />
                <h3 className="text-xl font-medium mb-2">No properties match your search criteria</h3>
                <p className="text-surface-600 dark:text-surface-400 mb-6">Try adjusting your search filters or exploring different locations</p>
                <button 
                  className="btn-outline px-4 py-2"
                  onClick={() => setShowAdvancedFilters(true)}
                >
                  Adjust Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainFeature;