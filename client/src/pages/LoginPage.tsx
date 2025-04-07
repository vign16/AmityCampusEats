import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Mail, User, ChevronRight, Utensils } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginFormSchema>;
type RegisterFormValues = z.infer<typeof registerFormSchema>;

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [, navigate] = useLocation();
  const [, params] = useRoute('/auth'); // or '/login' based on your route
  const { toast } = useToast();
  
  // Get redirect URL from query parameters
  const getRedirectUrl = () => {
    const url = new URL(window.location.href);
    const redirectPath = url.searchParams.get('redirect') || '/';
    return redirectPath;
  };

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { loginMutation, registerMutation, isLoading, user } = useAuth();
  
  // Redirect to original destination or home if already logged in
  useEffect(() => {
    if (user) {
      const redirectUrl = getRedirectUrl();
      navigate(redirectUrl);
    }
  }, [user, navigate]);
  
  // If we're still mounting and the user is already logged in, show loading
  if (user) return null;

  const onLoginSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        const redirectUrl = getRedirectUrl();
        navigate(redirectUrl);
      }
    });
  };

  const onRegisterSubmit = (data: RegisterFormValues) => {
    // We need to remove confirmPassword as it's not part of the API
    const { confirmPassword, ...registerData } = data;
    
    registerMutation.mutate(registerData, {
      onSuccess: () => {
        const redirectUrl = getRedirectUrl();
        navigate(redirectUrl);
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Login/Register form */}
      <div className="w-full md:w-1/2 p-6 md:p-10 flex items-center justify-center bg-gradient-to-br from-blue-50 to-yellow-50">
        <Card className="w-full max-w-md mx-auto border-0 shadow-lg bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex justify-center mb-4">
              <img 
                src="/api/static/amity logo.jpg" 
                alt="Amity University Logo" 
                className="h-16 w-auto"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-amber-500">Welcome to AmityCampusEats</CardTitle>
            <CardDescription className="text-center text-foreground/80">
              Sign in to order delicious food from our campus canteen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6 p-1 bg-gray-100 rounded-md">
                <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">Login</TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">Register</TabsTrigger>
              </TabsList>
            
              <TabsContent value="login" className="space-y-4">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Mail className="mr-2 h-4 w-4" />
                            Email
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="Enter your email" 
                                type="email"
                                className="pl-3 pr-10"
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Lock className="mr-2 h-4 w-4" />
                            Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="Enter your password" 
                                type="password"
                                className="pl-3 pr-10"
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={isLoading}
                    >
                      {loginMutation.isPending ? "Signing In..." : "Sign In"}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </Form>
                
                <div className="text-center text-sm">
                  <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                    Forgot password?
                  </a>
                </div>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <User className="mr-2 h-4 w-4" />
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your full name" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Mail className="mr-2 h-4 w-4" />
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your email" 
                              type="email" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Lock className="mr-2 h-4 w-4" />
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Create a password" 
                              type="password" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Lock className="mr-2 h-4 w-4" />
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Confirm your password" 
                              type="password" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={isLoading}
                    >
                      {registerMutation.isPending ? "Creating Account..." : "Create Account"}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-center text-sm text-gray-500">
              By continuing, you agree to AmityCampusEats' Terms of Service and Privacy Policy.
            </div>
          </CardFooter>
        </Card>
      </div>
      
      {/* Right side - Hero section */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-amber-500 text-white p-10 flex-col justify-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-6">Experience Amity Campus Dining</h2>
          <div className="flex items-center mb-6">
            <div className="h-1 w-20 bg-white rounded mr-4"></div>
            <span className="text-lg font-medium">Tech-Powered Food Ordering</span>
          </div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <div className="mr-4 mt-1 bg-white/20 p-1 rounded">
                <Utensils className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Authentic Indian Cuisine</h3>
                <p className="text-white/80">Enjoy a diverse selection of authentic South and North Indian delicacies on campus.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="mr-4 mt-1 bg-white/20 p-1 rounded">
                <User className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Personalized Experience</h3>
                <p className="text-white/80">Create your account to save favorites and track your order history.</p>
              </div>
            </li>
          </ul>
          <div className="mt-6 bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/20">
            <p className="italic text-white/90">"AmityCampusEats brings the best of technology to campus dining, making ordering quick and convenient for students and faculty."</p>
            <p className="font-semibold mt-2">Amity University Food Services</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;