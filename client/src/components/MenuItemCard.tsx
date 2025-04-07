import { useState } from "react";
import { MenuItem } from "@shared/schema";
import { formatMenuItemForDisplay } from "@/lib/menuData";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Utensils } from "lucide-react";

interface MenuItemCardProps {
  menuItem: MenuItem;
  onViewDetails: (item: MenuItem) => void;
}

const MenuItemCard = ({ menuItem, onViewDetails }: MenuItemCardProps) => {
  const { addToCart } = useCart();
  const item = formatMenuItemForDisplay(menuItem);
  const [imageError, setImageError] = useState(false);
  
  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      imageUrl: item.imageUrl,
      description: item.description,
      category: item.category
    });
  };
  
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="menu-item bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg">
      {!imageError ? (
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-full h-48 object-cover"
          onClick={() => onViewDetails(menuItem)}
          onError={handleImageError}
        />
      ) : (
        <div 
          className="w-full h-48 bg-slate-200 flex items-center justify-center cursor-pointer"
          onClick={() => onViewDetails(menuItem)}
        >
          <Utensils size={48} className="text-gray-400" />
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-poppins font-semibold text-xl">{item.name}</h3>
          <span className="font-poppins font-medium text-primary">{item.formattedPrice}</span>
        </div>
        <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
        <Button 
          onClick={handleAddToCart}
          className="mt-4 w-full bg-primary text-white py-2 rounded-lg font-poppins hover:bg-secondary transition-colors"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default MenuItemCard;
