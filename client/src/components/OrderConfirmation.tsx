import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, CheckCircle2, Clock, Package, Ticket } from "lucide-react";
import { useLocation } from "wouter";

interface OrderConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: {
    orderId: string;
    total: number;
    status: string;
    tokenNumber?: string;
  };
}

const OrderConfirmation = ({ isOpen, onClose, orderDetails }: OrderConfirmationProps) => {
  const [, navigate] = useLocation();

  const handleClose = () => {
    onClose();
    navigate("/menu");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-lg border-2 border-blue-500 shadow-xl z-50 bg-white">
        <div className="text-center p-6">
          <CheckCircle className="mx-auto h-20 w-20 text-green-500 mb-4" />
          
          <DialogTitle className="font-poppins font-bold text-3xl mb-3 text-gray-800">
            Order Confirmed!
          </DialogTitle>
          
          <DialogDescription className="text-gray-700 text-lg mb-5">
            Your order has been placed successfully.
          </DialogDescription>
          
          <div className="mb-6 bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between mb-3 text-lg">
              <span className="text-gray-700 font-medium">Order ID:</span>
              <span className="font-semibold">#{orderDetails.orderId}</span>
            </div>
            <div className="flex justify-between mb-3 text-lg">
              <span className="text-gray-700 font-medium">Total Amount:</span>
              <span className="font-semibold">₹{orderDetails.total}</span>
            </div>
            <div className="border-t-2 border-gray-200 pt-4 mt-4">
              <div className="flex items-center justify-center gap-3 bg-amber-50 p-4 rounded-lg border border-amber-200">
                <Ticket className="h-6 w-6 text-amber-600" />
                <span className="font-semibold text-amber-700 text-lg">TOKEN NUMBER:</span>
                <span className="font-bold text-2xl text-amber-800">{orderDetails.tokenNumber || "T-767"}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2 font-medium">Show this token number when collecting your order</p>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="font-poppins font-medium mb-3 text-lg">Order Status:</p>
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center mb-1">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Ordered</span>
              </div>
              
              <div className="h-2 flex-1 bg-gray-300 mx-2">
                <div className="h-full bg-green-400 w-1/2"></div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center mb-1">
                  <Clock className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Preparing</span>
              </div>
              
              <div className="h-2 flex-1 bg-gray-300 mx-2"></div>
              
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center mb-1">
                  <Package className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Ready</span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-700 mb-3 text-lg">
            Your food will be ready in approximately 15-20 minutes.
          </p>
          
          <div className="mb-6 bg-blue-50 p-5 rounded-lg border-2 border-blue-200 shadow-sm">
            <p className="text-blue-800 font-semibold text-lg">
              Thanks for ordering! Visit us again.
            </p>
            <p className="text-blue-700 text-base mt-1">
              Hours: 9:00 AM - 5:00 PM (Mon-Fri)
            </p>
          </div>
          
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-lg font-poppins font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={handleClose}
          >
            Back to Menu
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderConfirmation;
