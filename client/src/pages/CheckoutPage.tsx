import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { getRandomOrderNumber } from "@/lib/menuData";
import { CartItem } from "@shared/schema";
import Cart from "@/components/Cart";
import OrderConfirmation from "@/components/OrderConfirmation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "wouter";

// Checkout form schema
const checkoutFormSchema = z.object({
  customerName: z.string().min(3, { message: "Name must be at least 3 characters" }),
  customerPhone: z.string().min(10, { message: "Please enter a valid phone number" }),
  customerEmail: z.string().email({ message: "Please enter a valid email address" }),
  paymentMethod: z.enum(["qr_payment"]) // Only QR payment is available now
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    orderId: "",
    total: 0,
    status: "ordered",
    tokenNumber: ""
  });

  // Form setup
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      paymentMethod: "qr_payment"
    }
  });

  // Order submission mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CheckoutFormValues) => {
      // Format cart items for the order
      const orderItems = cartItems.map((item: CartItem) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));

      // Create order payload
      const orderData = {
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        totalAmount: cartTotal,
        status: "ordered",
        items: orderItems
      };

      return apiRequest("POST", "/api/orders", orderData);
    },
    onSuccess: (response) => {
      // Generate display-friendly order ID and token number
      const displayOrderId = getRandomOrderNumber();
      const tokenNumber = `T-${Math.floor(100 + Math.random() * 900)}`;
      
      // Set order details for the confirmation modal
      setOrderDetails({
        orderId: displayOrderId,
        total: cartTotal,
        status: "ordered",
        tokenNumber: tokenNumber
      });
      
      // Show toast and confirmation modal
      toast({
        title: "Order placed successfully!",
        description: "Your order has been confirmed.",
      });
      
      setShowConfirmation(true);
      clearCart();
    },
    onError: (error) => {
      toast({
        title: "Failed to place order",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: CheckoutFormValues) => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout",
        variant: "destructive"
      });
      return;
    }
    
    mutate(data);
  };

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Link href="/menu">
            <Button variant="ghost" size="sm" className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Menu
            </Button>
          </Link>
          <h1 className="font-poppins font-bold text-2xl md:text-3xl">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="md:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="font-poppins font-semibold text-xl mb-4">Personal Information</h2>
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="customerPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="customerEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="font-poppins font-semibold text-xl mb-4">Payment Method</h2>
                  
                  <div className="border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center mb-4">
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="qr_payment" id="qr_payment" checked />
                                  <FormLabel htmlFor="qr_payment" className="cursor-pointer font-semibold">
                                    PhonePe QR Payment
                                  </FormLabel>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <img 
                        src="/api/static/qr code.jpg" 
                        alt="PhonePe Logo" 
                        className="h-8 ml-auto"
                      />
                    </div>
                    
                    <div className="flex justify-center">
                      <div className="max-w-xs">
                        <img 
                          src="/api/static/qr code.jpg" 
                          alt="PhonePe QR Code" 
                          className="w-full rounded-lg border border-gray-200"
                        />
                        <div className="text-center mt-3">
                          <p className="text-sm text-gray-600 font-medium">Scan QR code using PhonePe app</p>
                          <p className="text-xs text-gray-500 mt-1">After payment, click "Pay Now" button below</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-amber-800 text-sm flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Payment must be completed prior to submitting your order. Token number will be generated after order submission.
                    </p>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-white font-poppins font-medium py-3 hover:bg-secondary transition-colors"
                  disabled={isPending || cartItems.length === 0}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing
                    </>
                  ) : (
                    `Pay Now - ₹${cartTotal}`
                  )}
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-20">
              <h2 className="font-poppins font-semibold text-xl mb-4">Order Summary</h2>
              
              {cartItems.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">₹{item.price} x {item.quantity}</p>
                      </div>
                      <p className="font-medium">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-primary">₹{cartTotal}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Cart />
      
      <OrderConfirmation 
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        orderDetails={orderDetails}
      />
    </>
  );
};

export default CheckoutPage;
