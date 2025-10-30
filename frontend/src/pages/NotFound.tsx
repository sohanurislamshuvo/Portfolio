import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useApi } from "@/contexts/ApiContext";

const NotFound = () => {
  const location = useLocation();
  const { portfolioConfig } = useApi();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-12">
              <div className="mb-8">
                <h1 className="text-8xl font-bold gradient-text mb-4">404</h1>
                <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  The page you're looking for doesn't exist or has been moved.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={portfolioConfig.urls?.home || "/"}>
                  <Button size="lg" className="btn-hero">
                    <Home className="w-5 h-5 mr-2" />
                    Go Home
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => window.history.back()}
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Go Back
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
