import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ApiProvider } from "@/contexts/ApiContext";
import DynamicRoutes from "./components/DynamicRoutes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ApiProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <DynamicRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </ApiProvider>
  </QueryClientProvider>
);

export default App;
