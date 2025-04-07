import { Button } from "@/components/ui/button";
import { Link } from "wouter";

// Define base URL for static assets
const baseUrl = "/api/static";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 to-amber-500 text-white overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/eastern.png')"}}></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center relative z-10">
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <div className="mb-2 text-amber-200 font-medium">9AM - 5PM • Monday to Friday</div>
          <h1 className="font-poppins font-bold text-4xl md:text-6xl mb-4 leading-tight text-shadow">
            Amity<span className="text-amber-300">Campus</span>Eats
          </h1>
          <p className="font-roboto mb-8 text-lg max-w-md opacity-90">
            Experience authentic Indian cuisine with vibrant flavors from North to South. 
            Fresh, homemade meals prepared right on your campus.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/menu">
              <Button 
                className="bg-white text-blue-600 hover:bg-amber-50 font-poppins font-semibold px-8 py-3 rounded-full shadow-lg transform transition-all hover:scale-105 border-2 border-amber-300"
                size="lg"
              >
                Order Now
              </Button>
            </Link>
            <Link href="/menu">
              <Button 
                className="bg-blue-700 text-white hover:bg-blue-800 font-poppins font-semibold px-8 py-3 rounded-full border-2 border-blue-500 transform transition-all hover:scale-105"
                size="lg"
              >
                View Menu
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="md:w-1/2 relative">
          <div className="absolute -inset-2 bg-white/20 rounded-full blur-xl transform -rotate-6"></div>
          <div className="relative bg-white p-3 rounded-2xl shadow-2xl transform rotate-3 border-4 border-amber-400">
            <img 
              src={`${baseUrl}/south meals.png`}
              alt="Authentic Indian Thali" 
              className="rounded-xl w-full h-72 md:h-96 object-cover" 
            />
            <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white font-bold px-4 py-2 rounded-full shadow-lg transform rotate-12">
              Authentic Cuisine
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>
  );
};

export default Hero;
