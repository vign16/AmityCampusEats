import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import MenuPage from "@/pages/MenuPage";
import CheckoutPage from "@/pages/CheckoutPage";
import LoginPage from "@/pages/LoginPage";
import OrderHistoryPage from "@/pages/OrderHistoryPage";
import TestPage from "@/pages/TestPage"; // Import the test page
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";

function Router() {
  const [location] = useLocation();
  const showNavAndFooter = location !== "/login" && location !== "/auth" && location !== "/test";
  
  return (
    <>
      {showNavAndFooter && <Navbar />}
      <main className="min-h-screen">
        <Switch>
          <Route path="/test" component={TestPage} /> {/* Add the test route first */}
          <Route path="/" component={HomePage} />
          <Route path="/menu" component={MenuPage} />
          <ProtectedRoute path="/checkout" component={CheckoutPage} />
          <ProtectedRoute path="/order-history" component={OrderHistoryPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/auth" component={LoginPage} /> {/* Additional route for compatibility */}
          <Route component={NotFound} />
        </Switch>
      </main>
      {showNavAndFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router />
        <Toaster />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
