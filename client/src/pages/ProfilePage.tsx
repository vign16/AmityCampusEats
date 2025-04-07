import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Link, Redirect } from 'wouter';
import { Loader2, User, Mail, Calendar } from 'lucide-react';

const ProfilePage = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
      </div>
    );
  }
  
  if (!user) {
    return <Redirect to="/auth" />;
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Summary Card */}
          <Card className="md:col-span-1">
            <CardHeader className="text-center">
              <div className="mx-auto bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-blue-600">{user.name.charAt(0)}</span>
              </div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>Amity University</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Link href="/orders">
                <Button variant="outline" className="w-full">View Order History</Button>
              </Link>
              <Link href="/menu">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Order Food</Button>
              </Link>
            </CardContent>
          </Card>
          
          {/* Profile Details Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <User className="mr-3 h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Full Name</h3>
                  <p className="text-lg">{user.name}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="mr-3 h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Email Address</h3>
                  <p className="text-lg">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Calendar className="mr-3 h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-sm text-gray-500">Member Since</h3>
                  <p className="text-lg">{formatDate(user.createdAt)}</p>
                </div>
              </div>
              
              <div className="pt-4 mt-4 border-t">
                <h3 className="font-semibold mb-2">Account Preferences</h3>
                <p className="text-gray-500 text-sm">
                  Account settings and preferences will be available in future updates.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;