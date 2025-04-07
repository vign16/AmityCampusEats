import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, ShoppingBag, Clock, AlertCircle, RefreshCw } from 'lucide-react';
import { Redirect, useLocation } from 'wouter';
import { Order, CartItem } from '@shared/schema';
import { getQueryFn } from '@/lib/queryClient';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const OrderHistoryPage = () => {
  const { user, isLoading: isLoadingUser } = useAuth();
  const { addToCart, openCart } = useCart();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [reorderLoading, setReorderLoading] = useState<number | null>(null);
  
  const { 
    data: orders, 
    isLoading: isLoadingOrders,
    error 
  } = useQuery<Order[]>({
    queryKey: ['/api/user', user?.id, 'orders'],
    queryFn: user ? getQueryFn({ on401: 'throw' }) : () => Promise.resolve([]),
    enabled: !!user
  });
  
  const handleReorder = (order: Order) => {
    setReorderLoading(order.id);
    
    try {
      // Clear the current cart before adding new items
      // Note: We don't need to call clearCart() as we'll just add items
      
      // Add each item from the order to the cart
      if (Array.isArray(order.items)) {
        order.items.forEach((item: any) => {
          const cartItem: CartItem = {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            imageUrl: item.imageUrl || "",
            description: item.description || "",
            category: item.category || ""
          };
          addToCart(cartItem);
        });
        
        // Show success message
        toast({
          title: "Order reloaded",
          description: "The items have been added to your cart",
        });
        
        // Navigate to checkout and open cart
        setTimeout(() => {
          openCart();
          navigate("/menu");
        }, 500);
      }
    } catch (error) {
      toast({
        title: "Failed to reorder",
        description: "Could not add the items to your cart",
        variant: "destructive"
      });
    }
    
    setReorderLoading(null);
  };
  
  if (isLoadingUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
      </div>
    );
  }
  
  if (!user) {
    return <Redirect to="/auth" />;
  }

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500">Processing</Badge>;
      case 'ready':
        return <Badge className="bg-purple-500">Ready for Pickup</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>Pending</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Order History</h1>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => window.location.href = '/menu'}>
            Place New Order
          </Button>
        </div>
        
        {isLoadingOrders ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : error ? (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-red-600">
                <AlertCircle className="h-5 w-5" />
                <p>Error loading orders. Please try again later.</p>
              </div>
            </CardContent>
          </Card>
        ) : orders?.length ? (
          <div className="grid gap-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-gray-50 border-b">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5 text-blue-600" />
                        Order #{order.id}
                        {order.tokenNumber && (
                          <Badge variant="outline" className="ml-2 bg-amber-100 text-amber-800 border-amber-200">
                            Token: {order.tokenNumber}
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Clock className="h-3 w-3 mr-1 inline" />
                        {formatDate(order.createdAt || new Date())}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(order.status)}
                      <span className="font-semibold">₹{order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <h3 className="font-medium text-sm text-gray-500 mb-2">Order Items</h3>
                  <div className="space-y-2">
                    {Array.isArray(order.items) && order.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between pb-2 border-b border-gray-100 last:border-0">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600 text-sm">{item.quantity}×</span>
                          <span>{item.name}</span>
                        </div>
                        <span className="text-gray-700">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 border-t flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Delivered to: <span className="font-medium text-gray-700">{order.customerName}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-blue-600 border-blue-200"
                    onClick={() => handleReorder(order)}
                    disabled={reorderLoading === order.id}
                  >
                    {reorderLoading === order.id ? (
                      <>
                        <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>Reorder</>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6 text-center">
              <ShoppingBag className="h-12 w-12 text-blue-500 mx-auto mb-4 opacity-80" />
              <h3 className="text-xl font-semibold mb-2">No Order History Yet</h3>
              <p className="text-blue-700 mb-4">Your order history will appear here once you place an order.</p>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => window.location.href = '/menu'}>
                Order Now
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;