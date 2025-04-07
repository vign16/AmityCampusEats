import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Route, Redirect } from "wouter";

export function ProtectedRoute({
  path,
  component: Component,
}: {
  path: string;
  component: () => React.JSX.Element;
}) {
  const { user, isLoading } = useAuth();

  return (
    <Route path={path}>
      {() => {
        if (isLoading) {
          return (
            <div className="flex items-center justify-center min-h-screen">
              <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
            </div>
          );
        }
        
        if (!user) {
          console.log("User not authenticated, redirecting to login");
          return <Redirect to="/login" />;
        }
        
        console.log("User authenticated, rendering protected component");
        return <Component />;
      }}
    </Route>
  );
}