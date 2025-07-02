import { Link } from "react-router-dom";
import companyLogo from "../assets/company-logo/company-logo.webp";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { NAVIGATION_DATA } from "@/data/navbar-data/navbar-data";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";

const STYLES = {
  button:
    "text-base uppercase text-foreground/60 font-roboto tracking-wide hover:text-foreground/80 transition-colors",
  navContentItem:
    "text-base text-foreground/60 font-roboto tracking-wide hover:text-foreground/80 transition-colors block hover:bg-black/10 hover:rounded-md w-full p-2 text-left flex items-center",
  mobileButton:
    "text-base text-foreground/80 font-roboto tracking-wide hover:text-foreground hover:bg-neutral-100 transition-colors w-full justify-start py-3",
  mobileNavContentItem:
    "text-sm text-foreground/60 font-roboto tracking-wide hover:text-foreground/80 hover:bg-black/10 rounded-md transition-all duration-200",
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [updatesOpen, setUpdatesOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [faqsOpen, setFaqsOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // Close all dropdown menus
  const closeAllDropdowns = () => {
    setServicesOpen(false);
    setUpdatesOpen(false);
    setGalleryOpen(false);
    setFaqsOpen(false);
  };

  // Close mobile menu function
  const closeMobileMenu = () => {
    setIsOpen(false);
    closeAllDropdowns();
  };

  // Handle dropdown toggle - close others when opening one
  const handleDropdownToggle = (title, isOpen, setOpen) => {
    // if the title is not open, close all dropdowns because we are opening this one after closing others
    if (!isOpen) {
      closeAllDropdowns();
    }
    setOpen(!isOpen);
  };

  // close mobile menu when clicking outside or scrolling
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if mobile menu ref exists and the clicked element is not inside the mobile menu
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        closeMobileMenu();
      }
    };

    const handleScroll = () => {
      // Close mobile menu when user scrolls the page
      closeMobileMenu();
    };

    // Only add event listeners if mobile menu is open
    if (isOpen) {
      // Add event listener for mouse clicks on the entire document
      document.addEventListener("mousedown", handleClickOutside);
      // Add event listener for scroll events on the window
      window.addEventListener("scroll", handleScroll);
    }

    // Cleanup function - removes event listeners when component unmounts
    // or when isOpen state changes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  // Render Navigation Menu Content Items
  const createNavContent = (items) =>
    items.map((item) => (
      <NavigationMenuLink key={item.id} asChild>
        <Link to={item.link} className="block">
          <div className={STYLES.navContentItem}>
            <item.icon className="w-4 h-4 mr-2" />
            <span>{item.name}</span>
          </div>
        </Link>
      </NavigationMenuLink>
    ));

  const categoriesDesktop = [...NAVIGATION_DATA.categories].sort(
    (a, b) => a.desktopOrder - b.desktopOrder
  );
  const categoriesMobile = [...NAVIGATION_DATA.categories].sort(
    (a, b) => a.mobileOrder - b.mobileOrder
  );

  const navContent = {
    categories: createNavContent(categoriesDesktop),
    categoriesMobile: categoriesMobile,
    updates: createNavContent(NAVIGATION_DATA.updates),
    updatesMobile: NAVIGATION_DATA.updates,
    gallery: createNavContent(NAVIGATION_DATA.gallery),
    galleryMobile: NAVIGATION_DATA.gallery,
    faqs: createNavContent(NAVIGATION_DATA.faqs),
    faqsMobile: NAVIGATION_DATA.faqs,
  };

  return (
    <nav className="z-50 sticky top-0 md:top-[44px] w-full bg-white/70 backdrop-blur-lg border-b border-neutral-200">
      <div className="flex items-center justify-between px-4 md:px-8 h-20 max-w-[88rem] mx-auto">
        {/* Company Logo & Name */}
        <Link
          to="/"
          className="selection:bg-emerald-600 flex items-center justify-center space-x-2.5 text-2xl font-bold py-6 text-center text-neutral-600 md:mr-10"
        >
          <img
            src={companyLogo}
            alt="Sun Certifications India logo"
            className="w-10 h-10 md:w-12 md:h-12"
            loading="eager"
            decoding="async"
          />
          <div className="py-2 text-center">
            <h1 className="font-roboto text-black uppercase tracking-wide leading-normal text-[14px] md:text-xl font-bold">
              Sun Certifications India
            </h1>
            <p className="text-foreground/90 text-[10px] md:text-[13px] leading-none uppercase font-normal">
              Simplifying Certifications
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center justify-end">
          {/* Home, About & Services */}
          <NavigationMenu>
            <NavigationMenuList>
              {/* Home */}
              <NavigationMenuItem>
                <Link to="/">
                  <Button variant="link" className={STYLES.button}>
                    Home
                  </Button>
                </Link>
              </NavigationMenuItem>

              {/* About */}
              <NavigationMenuItem>
                <Link to="/about">
                  <Button variant="link" className={STYLES.button}>
                    About
                  </Button>
                </Link>
              </NavigationMenuItem>

              {/* Services */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={STYLES.button}>
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-3 gap-2 w-[700px] p-6">
                    {navContent.categories}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Updates */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={STYLES.button}>
                  Updates
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-[300px]">{navContent.updates}</div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Gallery */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={STYLES.button}>
                  Gallery
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-60">{navContent.gallery}</div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* FAQs */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={STYLES.button}>
                  FAQs
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-[265px]">{navContent.faqs}</div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Contact Us */}
              <NavigationMenuItem>
                <Link to="/contact">
                  <Button variant="link" className={STYLES.button}>
                    Contact Us
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black focus:outline-none"
          onClick={() => (isOpen ? closeMobileMenu() : setIsOpen(true))}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navbar Menu */}
      {isOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-full left-0 w-full bg-white border-t border-b border-neutral-200 shadow-lg z-40 max-h-[80vh] overflow-y-auto scrollbar-hide"
        >
          <div className="px-4 py-4 space-y-1">
            {/* Home */}
            <Link to="/" className="block w-full" onClick={closeMobileMenu}>
              <Button variant="ghost" className={STYLES.mobileButton}>
                Home
              </Button>
            </Link>

            {/* About */}
            <Link
              to="/about"
              className="block w-full"
              onClick={closeMobileMenu}
            >
              <Button variant="ghost" className={STYLES.mobileButton}>
                About
              </Button>
            </Link>

            {/* Services, Updates, Gallery, FAQs */}
            {[
              {
                title: "Services",
                items: navContent.categoriesMobile,
                isOpen: servicesOpen,
                setOpen: setServicesOpen,
              },
              {
                title: "Updates",
                items: navContent.updatesMobile,
                isOpen: updatesOpen,
                setOpen: setUpdatesOpen,
              },
              {
                title: "Gallery",
                items: navContent.galleryMobile,
                isOpen: galleryOpen,
                setOpen: setGalleryOpen,
              },
              {
                title: "FAQs",
                items: navContent.faqsMobile,
                isOpen: faqsOpen,
                setOpen: setFaqsOpen,
              },
            ].map(({ title, items, isOpen, setOpen }) => (
              <div key={title} className="w-full">
                <Button
                  variant="ghost"
                  className={`${STYLES.mobileButton} justify-between`}
                  onClick={() => handleDropdownToggle(title, isOpen, setOpen)}
                >
                  {title}
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>

                {isOpen && (
                  <div className="ml-4 mt-2 space-y-1">
                    {items.map((item) => (
                      <Link
                        key={item.id}
                        to={item.link}
                        className="block w-full"
                        onClick={closeMobileMenu}
                      >
                        <Button
                          variant="ghost"
                          className={STYLES.mobileNavContentItem}
                        >
                          <item.icon className="w-4 h-4 mr-2" />
                          {item.name}
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Contact Us */}
            <Link
              to="/contact"
              className="block w-full"
              onClick={closeMobileMenu}
            >
              <Button variant="ghost" className={STYLES.mobileButton}>
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
