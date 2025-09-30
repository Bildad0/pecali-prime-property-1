import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/pecali_logo.png"
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get current route
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", href: "/", id: "home" },
    { label: "Properties", href: "/properties", id: "properties" },
    { label: "Services", href: "/services", id: "services" },
    { label: "Training", href: "/training", id: "training" },
    { label: "About", href: "/about", id: "about" },
    { label: "Contact", href: "/contact", id: "contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // new centralized navigation handler
  const handleNavClick = (href: string, id?: string) => {
    // If already on the target route and there's an id -> scroll
    if (location.pathname === href && id) {
      scrollToSection(id);
      setIsOpen(false);
      return;
    }

    // If target is same-page anchor (e.g. "/" with id) but we're on a different route:
    if (id && href === "/") {
      navigate(href);
      // small delay to allow page/component mount before scrolling
      setTimeout(() => scrollToSection(id), 180);
      setIsOpen(false);
      return;
    }

    // Default: navigate to the target route
    navigate(href);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 bg-background/95 backdrop-blur-md border-b border-border shadow-card">
      <div className="container mx-auto px-2">
        {/* Top bar with contact info */}
        <div className="hidden md:flex items-center justify-between py-1 text-sm border-b border-border/50">
          <div className="flex items-center space-x-4 text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>+254 758 174718</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>info@pecali.co.ke</span>
            </div>
          </div>
          <div className="text-muted-foreground">
            Premier Real Estate Solutions in Kenya
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex items-center justify-between py-1">
          {/* Logo with responsive sizing */}
          <img 
            src={logo} 
            alt="PECALI Real Estate" 
            className={cn(
              "w-auto transition-transform duration-200 hover:scale-105",
              "h-8 sm:h-12 md:h-16 lg:h-20", // Responsive heights
              "object-contain p-0 m-0"
            )}
          />

          {/* Desktop Navigation with active states */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href} 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href, item.id);
                }}
                className={cn(
                  "text-foreground transition-colors duration-200 font-medium px-1",
                  "hover:text-primary relative py-1",
                  isActive(item.href) && "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              className="bg-gradient-primary hover:bg-gradient-luxury shadow-gold px-3 py-1"
              onClick={() => handleNavClick('/contact', 'contact')}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button (always visible on small screens) */}
          <button
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md transition-colors duration-150 flex items-center justify-center
                       bg-background/30 backdrop-blur-sm text-foreground hover:bg-background/40"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation with active states - positioned below navbar and constrained to viewport */}
        <div
          className={cn(
            "md:hidden absolute left-0 right-0 top-full bg-background/95 border-t border-border shadow-card transition-all duration-300 ease-in-out",
            isOpen
              ? "overflow-auto pb-4" // allow scrolling when open
              : "overflow-hidden"
          )}
          // limit height so menu never overflows viewport on mobile
          style={{ maxHeight: isOpen ? "calc(100vh - 64px)" : 0 }}
        >
          <div className="space-y-2 pt-3 px-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href, item.id);
                }}
                className={cn(
                  "block transition-colors duration-200 font-medium py-2 px-2 rounded-md",
                  "hover:text-primary",
                  isActive(item.href) ? "text-primary" : "text-foreground"
                )}
              >
                {item.label}
              </a>
            ))}
            <div className="px-2">
              <Button
                className="w-full bg-gradient-primary hover:bg-gradient-luxury shadow-gold mt-2 px-3 py-2"
                onClick={() => handleNavClick("/contact", "contact")}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;