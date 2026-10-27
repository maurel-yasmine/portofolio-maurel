import { Suspense, useEffect } from "react";
import { BrowserRouter, useLocation, useRoutes } from "react-router-dom";
import { Loading } from "@/components/Loading";
import { PageTransition } from "@/components/PageTransition";
import { ContainerProvider } from "@/context/ContainerProvider";
import { ThemeProviderContext } from "@/context/ThemeProviderContext";
import { MainLayout } from "@/layouts/MainLayout";
import routes from "virtual:generated-pages-react";

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="panel-soft w-full max-w-md p-8">
        <Loading rows={4} />
      </div>
    </div>
  );
}

/** Keeps the viewport at the top whenever the route changes. */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function AppRoutes() {
  const location = useLocation();
  const element = useRoutes(routes, location);

  return (
    <MainLayout>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <PageTransition key={location.pathname}>{element}</PageTransition>
      </Suspense>
    </MainLayout>
  );
}

/** Root component: providers + router + layout. */
export default function App() {
  return (
    <ThemeProviderContext>
      <ContainerProvider>
        <BrowserRouter>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
          >
            Skip to content
          </a>
          <AppRoutes />
        </BrowserRouter>
      </ContainerProvider>
    </ThemeProviderContext>
  );
}
