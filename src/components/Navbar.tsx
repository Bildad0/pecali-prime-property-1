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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-card">
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

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1 text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation with active states */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 pb-2" : "max-h-0"
        )}>
          <div className="space-y-2 pt-2 border-t border-border">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href, item.id);
                }}
                className={cn(
                  "block transition-colors duration-200 font-medium px-1",
                  "hover:text-primary",
                  isActive(item.href) ? "text-primary" : "text-foreground"
                )}
              >
                {item.label}
              </a>
            ))}
            <Button 
              className="w-full bg-gradient-primary hover:bg-gradient-luxury shadow-gold mt-2 px-3 py-1"
              onClick={() => handleNavClick('/contact', 'contact')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;