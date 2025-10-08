import React, { Suspense, lazy } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy-load components that depend on client-only APIs to avoid SSR import issues
const Auth = lazy(() => import("./pages/Auth"));
const AdminLeads = lazy(() => import("./pages/AdminLeads"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

// Lazy-load toasters to avoid SSR importing issues
const ShadToaster = lazy(() => import("@/components/ui/toaster").then(m => ({ default: m.Toaster })));
const SonnerToaster = lazy(() => import("@/components/ui/sonner").then(m => ({ default: m.Toaster })));

const queryClient = new QueryClient();

const App = () => {
  console.log("App component rendering...");
  const isBrowser = typeof window !== 'undefined';
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {isBrowser && (
            <Suspense fallback={null}>
              <ShadToaster />
            </Suspense>
          )}
          {isBrowser && (
            <Suspense fallback={null}>
              <SonnerToaster />
            </Suspense>
          )}
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/feed" element={<Navigate to="/" replace />} />
              <Route path="/feed/" element={<Navigate to="/" replace />} />
              <Route 
                path="/admin/leads" 
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminLeads />
                  </ProtectedRoute>
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
