import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { useLocation } from "wouter";

const Cart = () => {
  const { 
    cartItems, 
    isCartOpen, 
    closeCart, 
    updateQuantity, 
    removeFromCart,
    cartTotal 
  } = useCart();
  const [, navigate] = useLocation();

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col h-full">
        <SheetHeader className="p-4 bg-primary text-white">
          <SheetTitle className="font-poppins font-semibold text-xl">Your Cart</SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="flex-1 p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <ShoppingCart className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-2">Add items from the menu to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center py-4">
                  <div className="flex-1">
                    <h3 className="font-poppins font-medium">{item.name}</h3>
                    <p className="text-primary font-medium">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between mb-4">
            <span className="font-poppins">Subtotal</span>
            <span className="font-poppins font-semibold">₹{cartTotal}</span>
          </div>
          <Button
            className="w-full bg-primary text-white py-3 rounded-lg font-poppins font-medium hover:bg-secondary transition-colors"
            disabled={cartItems.length === 0}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
