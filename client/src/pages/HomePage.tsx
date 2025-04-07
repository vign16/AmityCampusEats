import { Link } from "wouter";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/menuData";
import Cart from "@/components/Cart";

// Define base URL for static assets
const baseUrl = "/api/static";

const HomePage = () => {
  return (
    <>
      <Hero />
      
      <section className="py-24 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-4xl md:text-5xl text-gray-800 mb-4">
              Explore Our <span className="text-primary">Flavors</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
            <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto">
              Authentic Indian cuisine made with fresh ingredients and traditional recipes that bring the vibrant tastes of India to campus
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {categories.map((category, index) => {
              // Use our authentic Indian food images
              const imageUrl = category.id === "breakfast" 
                ? `${baseUrl}/dosa.png` // Dosa for breakfast
                : category.id === "lunch"
                ? `${baseUrl}/south meals.png` // South meals for lunch
                : `${baseUrl}/samosa.jpg`; // Samosa for snacks
                
              const description = category.id === "breakfast" 
                ? "Start your day with our energizing South Indian breakfast specialties"
                : category.id === "lunch" 
                ? "Experience the rich flavors of our authentic North and South Indian thalis" 
                : "Enjoy savory and sweet treats perfect for a quick bite between classes";
                
              return (
                <div 
                  key={category.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200"
                >
                  <div className="h-64 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                    <img 
                      src={imageUrl} 
                      alt={category.label} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <h3 className="font-poppins font-bold text-3xl mb-2 text-white">
                        {category.label}
                      </h3>
                      <div className="w-12 h-1 bg-primary mb-3 rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-300"></div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-6 h-12">
                      {description}
                    </p>
                    <Link href={`/menu?category=${category.id}`}>
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90 text-white transition-all group-hover:scale-105 shadow-md rounded-xl py-3 font-semibold text-lg"
                      >
                        View Menu
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4 text-gray-800">Why Choose <span className="text-primary">AmityCampusEats</span>?</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
          <p className="max-w-2xl mx-auto text-gray-600 mb-16 text-lg">
            We make ordering food on campus simple, fast, and delicious with authentic Indian flavors.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:translate-y-[-5px] border border-gray-100">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v2M12 10v2M12 18v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M18 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              </div>
              <h3 className="font-poppins font-semibold text-xl mb-3 text-gray-800">Fast Service</h3>
              <div className="w-12 h-1 bg-primary mx-auto mb-4 rounded-full"></div>
              <p className="text-gray-600">
                Quick preparation and optimized pick-up process for students and faculty on the go. Ready when you need it.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:translate-y-[-5px] border border-gray-100">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a9 9 0 1 0 9 9M17.23 8.6A19.306 19.306 0 0 1 21 18" />
                  <path d="M12 19a9 9 0 0 1-9-9 9 9 0 0 1 9-9 8.991 8.991 0 0 1 7.032 3.364M3.5 5.5l1.4 1.4M19.5 5.5l-1.4 1.4M12 16v-5M12 8V7" />
                </svg>
              </div>
              <h3 className="font-poppins font-semibold text-xl mb-3 text-gray-800">Fresh Authentic Food</h3>
              <div className="w-12 h-1 bg-primary mx-auto mb-4 rounded-full"></div>
              <p className="text-gray-600">
                We prepare our food with fresh ingredients and traditional recipes for the most authentic Indian flavors.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:translate-y-[-5px] border border-gray-100">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6.5 3H3c-.5 0-1 .5-1 1v7c0 .5.5 1 1 1h9c.5 0 1-.5 1-1V4c0-.5-.5-1-1-1H8.3" />
                  <path d="M10.2 3c-.2-.7-1-1-1.7-1H6.5c-.7 0-1.5.3-1.7 1L4 6" />
                  <path d="M3 6h10M14.2 21c-.1.6-.8 1-1.4 1h-2.9c-.6 0-1.3-.4-1.4-1L8 14M6 18h4M2 14h12M6 6v6M4 8h2M8 6v2M10 8h2" />
                </svg>
              </div>
              <h3 className="font-poppins font-semibold text-xl mb-3 text-gray-800">Easy Ordering</h3>
              <div className="w-12 h-1 bg-primary mx-auto mb-4 rounded-full"></div>
              <p className="text-gray-600">
                Simple and intuitive ordering system designed for busy campus life. Order with just a few clicks.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Cart />
    </>
  );
};

export default HomePage;
