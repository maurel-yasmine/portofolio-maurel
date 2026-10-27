import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { useContainer } from "@/context/ContainerProvider";

interface MainLayoutProps {
  children: React.ReactNode;
}

/** App shell: floating navigation, the routed page, and the footer. */
export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const { setFullPathName } = useContainer();

  useEffect(() => {
    setFullPathName(location.pathname);
  }, [location.pathname, setFullPathName]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      <Navbar />
      <main id="main-content" className="relative z-10 flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
