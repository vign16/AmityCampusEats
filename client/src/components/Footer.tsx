import { Link } from "wouter";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

// Define base URL for static assets
const baseUrl = "/api/static";

const Footer = () => {
  return (
    <footer className="relative mt-20">
      {/* Wave design at the top */}
      <div className="absolute top-0 left-0 right-0 transform -translate-y-99%">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="text-gray-900 w-full">
          <path fill="currentColor" fillOpacity="1" d="M0,64L48,64C96,64,192,64,288,53.3C384,43,480,21,576,16C672,11,768,21,864,32C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"></path>
        </svg>
      </div>
      
      {/* Footer main content */}
      <div className="bg-gray-900 text-white pt-20 pb-10 border-t-4 border-amber-500">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Column 1: Logo and info */}
            <div className="space-y-6">
              <div className="flex items-center">
                <img 
                  src={`${baseUrl}/amity logo.jpg`}
                  alt="Amity Logo" 
                  className="h-16 w-16 mr-3 rounded-full border-3 border-amber-500 p-1 shadow-lg" 
                />
                <div className="font-poppins font-bold text-2xl text-white">
                  Amity<span className="text-amber-500">Campus</span>Eats
                </div>
              </div>
              <p className="text-gray-300 mt-4 text-base">
                Experience authentic Indian cuisine at our campus canteen with fresh ingredients and traditional recipes.
              </p>
              <div className="flex gap-4 mt-4">
                <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-md">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-md">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-md">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            {/* Column 2: Quick Links */}
            <div>
              <h3 className="font-poppins font-semibold text-2xl mb-6 relative">
                <span className="relative z-10">Quick Links</span>
                <span className="absolute bottom-0 left-0 w-16 h-1 bg-amber-500"></span>
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-amber-400 flex items-center group text-base">
                    <ArrowRight className="h-5 w-0 group-hover:w-5 overflow-hidden transition-all duration-300 mr-0 group-hover:mr-2" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/menu" className="text-gray-300 hover:text-amber-400 flex items-center group text-base">
                    <ArrowRight className="h-5 w-0 group-hover:w-5 overflow-hidden transition-all duration-300 mr-0 group-hover:mr-2" />
                    Menu
                  </Link>
                </li>
                <li>
                  <Link href="/auth" className="text-gray-300 hover:text-amber-400 flex items-center group text-base">
                    <ArrowRight className="h-5 w-0 group-hover:w-5 overflow-hidden transition-all duration-300 mr-0 group-hover:mr-2" />
                    Login/Register
                  </Link>
                </li>
                <li>
                  <Link href="/checkout" className="text-gray-300 hover:text-amber-400 flex items-center group text-base">
                    <ArrowRight className="h-5 w-0 group-hover:w-5 overflow-hidden transition-all duration-300 mr-0 group-hover:mr-2" />
                    Checkout
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Column 3: Opening Hours */}
            <div>
              <h3 className="font-poppins font-semibold text-2xl mb-6 relative">
                <span className="relative z-10">Opening Hours</span>
                <span className="absolute bottom-0 left-0 w-16 h-1 bg-amber-500"></span>
              </h3>
              <ul className="space-y-5">
                <li className="flex items-start bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                  <Clock className="h-6 w-6 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <span className="block text-white font-medium">Monday - Friday</span>
                    <span className="text-gray-300 text-base">9:00 AM - 5:00 PM</span>
                  </div>
                </li>
                <li className="flex items-start bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                  <Clock className="h-6 w-6 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <span className="block text-white font-medium">Saturday - Sunday</span>
                    <span className="text-gray-300 text-base">Closed</span>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Column 4: Contact Us */}
            <div>
              <h3 className="font-poppins font-semibold text-2xl mb-6 relative">
                <span className="relative z-10">Contact Us</span>
                <span className="absolute bottom-0 left-0 w-16 h-1 bg-amber-500"></span>
              </h3>
              <ul className="space-y-5">
                <li className="flex items-start bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                  <MapPin className="h-6 w-6 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-300 text-base">Amity University Campus, Block A</span>
                </li>
                <li className="flex items-start bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                  <Phone className="h-6 w-6 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-300 text-base">+91 123-456-7890</span>
                </li>
                <li className="flex items-start bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                  <Mail className="h-6 w-6 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-300 text-base">info@amitycampuseats.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Copyright section */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-base">© {new Date().getFullYear()} AmityCampusEats. All rights reserved.</p>
              <div className="mt-4 md:mt-0">
                <Link href="/" className="text-gray-400 hover:text-amber-400 mx-3 transition-colors text-base">Privacy Policy</Link>
                <Link href="/" className="text-gray-400 hover:text-amber-400 mx-3 transition-colors text-base">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
