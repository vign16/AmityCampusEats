import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { MenuItem } from "@shared/schema";
import MenuCategories from "@/components/MenuCategories";
import MenuItemCard from "@/components/MenuItemCard";
import ItemDetailModal from "@/components/ItemDetailModal";
import Cart from "@/components/Cart";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocation } from "wouter";

const MenuPage = () => {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split("?")[1] || "");
  const initialCategory = urlParams.get('category') || "breakfast";
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Set the category from URL when component mounts
  useEffect(() => {
    const category = urlParams.get('category');
    if (category) {
      setActiveCategory(category);
    }
  }, [location]);

  // Fetch menu items based on active category
  const { data: menuItems, isLoading, error } = useQuery({
    queryKey: ['/api/menu-items', activeCategory],
    queryFn: async () => {
      const res = await fetch(`/api/menu-items/${activeCategory}`);
      if (!res.ok) {
        throw new Error('Failed to fetch menu items');
      }
      return res.json() as Promise<MenuItem[]>;
    }
  });

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleViewDetails = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Render loading state
  const renderSkeletons = () => {
    return Array(4).fill(0).map((_, index) => (
      <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md">
        <Skeleton className="w-full h-48" />
        <div className="p-4">
          <div className="flex justify-between items-start">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-6 w-1/4" />
          </div>
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-4 w-2/3 mt-1" />
          <Skeleton className="h-10 w-full mt-4" />
        </div>
      </div>
    ));
  };

  return (
    <>
      <section id="menu" className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-poppins font-bold text-2xl md:text-3xl text-center mb-6">Our Menu</h2>
          
          <MenuCategories 
            activeCategory={activeCategory} 
            onCategoryChange={handleCategoryChange} 
          />
          
          {error ? (
            <div className="text-center text-red-500 my-8">
              Error loading menu items. Please try again later.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                renderSkeletons()
              ) : (
                menuItems?.map((item) => (
                  <MenuItemCard 
                    key={item.id} 
                    menuItem={item} 
                    onViewDetails={handleViewDetails} 
                  />
                ))
              )}
            </div>
          )}
        </div>
      </section>
      
      <ItemDetailModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        item={selectedItem} 
      />
      
      <Cart />
    </>
  );
};

export default MenuPage;
