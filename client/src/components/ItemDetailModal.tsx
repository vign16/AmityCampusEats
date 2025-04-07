import { useState, useEffect } from "react";
import { MenuItem, CartItem } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { X, Plus, Minus, Utensils } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface ItemDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem | null;
}

const ItemDetailModal = ({ isOpen, onClose, item }: ItemDetailModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const { addToCart } = useCart();

  // Reset quantity and image error state when item changes
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setImageError(false);
    }
  }, [isOpen, item]);

  if (!item) return null;

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const handleImageError = () => {
    setImageError(true);
  };

  const handleAddToCart = () => {
    if (item) {
      const cartItem: CartItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: quantity,
        imageUrl: item.imageUrl,
        description: item.description,
        category: item.category
      };
      
      addToCart(cartItem);
      onClose();
    }
  };

  const totalPrice = item.price * quantity;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="relative">
          {!imageError ? (
            <img 
              src={item.imageUrl} 
              alt={item.name} 
              className="w-full h-56 sm:h-64 object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-56 sm:h-64 bg-slate-200 flex items-center justify-center">
              <Utensils size={64} className="text-gray-400" />
            </div>
          )}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-2 right-2 rounded-full bg-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <DialogTitle className="font-poppins font-semibold text-2xl">
              {item.name}
            </DialogTitle>
            <span className="font-poppins font-medium text-primary text-xl">₹{item.price}</span>
          </div>
          
          <DialogDescription className="text-gray-600 mb-6">
            {item.description}
          </DialogDescription>
          
          <div className="flex items-center justify-between mb-6">
            <div className="font-poppins">Quantity</div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-8 h-8 flex items-center justify-center"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-medium text-lg">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-8 h-8 flex items-center justify-center"
                onClick={increaseQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <Button 
            className="w-full bg-primary text-white py-3 rounded-lg font-poppins font-medium hover:bg-secondary transition-colors"
            onClick={handleAddToCart}
          >
            Add to Cart - ₹{totalPrice}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDetailModal;
