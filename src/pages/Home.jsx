import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const HomeIcon = getIcon('Home');
  const BuildingIcon = getIcon('Building2');
  const MapPinIcon = getIcon('MapPin');
  const BedDoubleIcon = getIcon('BedDouble');
  const ShowerHeadIcon = getIcon('ShowerHead');
  const SquareIcon = getIcon('Square');
  const GraduationCapIcon = getIcon('GraduationCap');
  const ShoppingBagIcon = getIcon('ShoppingBag');
  const TreePineIcon = getIcon('TreePine');
  
  useEffect(() => {
    // Simulate API call to fetch featured properties
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setFeaturedProperties([
            {
              id: 1,
              title: "Elegant Modern Apartment",
              price: 420000,
              listingType: "sale",
              propertyType: "apartment",
              location: {
                address: "123 Main Street",
                city: "San Francisco",
                state: "CA",
                zipCode: "94105",
              },
              features: {
                bedrooms: 2,
                bathrooms: 2,
                area: 1200
              },
              media: {
                photos: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80"]
              }
            },
            {
              id: 2,
              title: "Spacious Family Home",
              price: 750000,
              listingType: "sale",
              propertyType: "house",
              location: {
                address: "456 Oak Avenue",
                city: "Portland",
                state: "OR",
                zipCode: "97205",
              },
              features: {
                bedrooms: 4,
                bathrooms: 3,
                area: 2800
              },
              media: {
                photos: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80"]
              }
            },
            {
              id: 3,
              title: "Downtown Loft",
              price: 2500,
              listingType: "rent",
              propertyType: "apartment",
              location: {
                address: "789 Pine Street",
                city: "Seattle",
                state: "WA",
                zipCode: "98101",
              },
              features: {
                bedrooms: 1,
                bathrooms: 1,
                area: 950
              },
              media: {
                photos: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80"]
              }
            }
          ]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        toast.error("Failed to load featured properties");
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleSaveProperty = (id) => {
    toast.success("Property saved to favorites!");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/5 dark:to-accent/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 lg:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              Find Your Dream Home with NestQuest
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl mb-8 text-surface-700 dark:text-surface-300"
            >
              Discover thousands of properties for sale and rent, find your perfect match with our advanced search tools.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a href="#search" className="btn-primary px-6 py-3 text-lg">
                Search Properties
              </a>
              <a href="#featured" className="btn-outline px-6 py-3 text-lg">
                View Featured
              </a>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface-50 dark:from-surface-900 to-transparent"></div>
      </section>

      {/* Property Categories */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Find Properties by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            <CategoryCard icon={<HomeIcon className="w-6 h-6" />} title="Houses" count="2,453" />
            <CategoryCard icon={<BuildingIcon className="w-6 h-6" />} title="Apartments" count="1,872" />
            <CategoryCard icon={<BuildingIcon className="w-6 h-6" />} title="Commercial" count="562" />
            <CategoryCard icon={<HomeIcon className="w-6 h-6" />} title="Vacation" count="324" />
            <CategoryCard icon={<TreePineIcon className="w-6 h-6" />} title="Land" count="198" />
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="featured" className="py-12 md:py-16 bg-surface-100/50 dark:bg-surface-800/50">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Featured Properties</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  onSave={handleSaveProperty}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Neighborhood Features */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Discover Perfect Neighborhoods</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NeighborhoodFeature 
              icon={<GraduationCapIcon className="w-6 h-6" />}
              title="Near Schools"
              description="Find properties close to top-rated schools and educational institutions"
            />
            <NeighborhoodFeature 
              icon={<ShoppingBagIcon className="w-6 h-6" />}
              title="Shopping Access"
              description="Properties with convenient access to shopping centers and grocery stores"
            />
            <NeighborhoodFeature 
              icon={<TreePineIcon className="w-6 h-6" />}
              title="Parks & Recreation"
              description="Homes near parks, trails, and recreational facilities for active lifestyles"
            />
          </div>
        </div>
      </section>

      {/* Main Feature (Property Search) */}
      <section id="search" className="py-12 md:py-16 bg-surface-100/50 dark:bg-surface-800/50">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Find Your Perfect Property</h2>
          <MainFeature />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-800 dark:bg-surface-900 text-surface-100 py-8 md:py-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
                N
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                NestQuest
              </h3>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-surface-300 hover:text-primary transition">
                Terms
              </a>
              <a href="#" className="text-surface-300 hover:text-primary transition">
                Privacy
              </a>
              <a href="#" className="text-surface-300 hover:text-primary transition">
                Contact
              </a>
            </div>
          </div>
          <div className="border-t border-surface-700 pt-6 text-center text-surface-400 text-sm">
            &copy; {new Date().getFullYear()} NestQuest. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

const CategoryCard = ({ icon, title, count }) => {
  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
      className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer hover:border-primary dark:hover:border-primary-light border border-surface-200 dark:border-surface-700"
    >
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light mb-3">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-surface-500 dark:text-surface-400 text-sm">{count} listings</p>
    </motion.div>
  );
};

const PropertyCard = ({ property, onSave }) => {
  const BedDoubleIcon = getIcon('BedDouble');
  const ShowerHeadIcon = getIcon('ShowerHead');
  const SquareIcon = getIcon('Square');
  const HeartIcon = getIcon('Heart');
  
  const formatPrice = (price) => {
    return property.listingType === 'rent'
      ? `$${price.toLocaleString()}/mo`
      : `$${price.toLocaleString()}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card group hover:scale-[1.01] transition-all duration-300"
    >
      <div className="relative overflow-hidden h-48 md:h-56">
        <img
          src={property.media.photos[0]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <button 
            onClick={() => onSave(property.id)}
            className="w-9 h-9 rounded-full bg-white/80 dark:bg-surface-800/80 flex items-center justify-center hover:bg-white dark:hover:bg-surface-700 transition-colors"
            aria-label="Save property"
          >
            <HeartIcon className="w-5 h-5 text-surface-600 hover:text-primary" />
          </button>
        </div>
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2 py-1 rounded-md ${
            property.listingType === 'rent' ? 'bg-secondary text-white' : 'bg-primary text-white'
          }`}>
            {property.listingType === 'rent' ? 'For Rent' : 'For Sale'}
          </span>
        </div>
      </div>
      <div className="p-4 md:p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg truncate">{property.title}</h3>
          <p className="font-bold text-primary dark:text-primary-light">
            {formatPrice(property.price)}
          </p>
        </div>
        <div className="flex items-center text-surface-500 dark:text-surface-400 mb-3">
          <MapPinIcon className="w-4 h-4 mr-1 flex-shrink-0" />
          <p className="text-sm truncate">
            {property.location.address}, {property.location.city}, {property.location.state} {property.location.zipCode}
          </p>
        </div>
        <div className="flex justify-between border-t border-surface-200 dark:border-surface-700 pt-3">
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
      </div>
    </motion.div>
  );
};

const NeighborhoodFeature = ({ icon, title, description }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-6 transition-all hover:shadow-card border border-surface-200 dark:border-surface-700"
    >
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-surface-600 dark:text-surface-400">{description}</p>
    </motion.div>
  );
};

export default Home;