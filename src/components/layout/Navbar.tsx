'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, Globe, ChevronDown } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/about', label: 'ABOUT US' },
  { 
    href: '/services', 
    label: 'SERVICES',
    subLinks: [
      { href: '/services/land-transport', label: 'LAND TRANSPORT' },
    ]
  },
  { 
    href: 'https://www.track-trace.com/', 
    label: 'TRACK ORDER',
    subLinks: [
      { href: 'https://www.track-trace.com/bol', label: 'BILL OF LANDING' },
      { href: 'https://www.track-trace.com/container', label: 'CONTAINER' },
      { href: 'https://www.track-trace.com/aircargo', label: 'AIR CARGO' },
    ]
  },
  { href: '/enquiry', label: 'ENQUIRY' },
  { href: '/contact', label: 'CONTACT US' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileTrackOpen, setMobileTrackOpen] = useState(false);
  const [visibility, setVisibility] = useState<any>(null);
  const [dynamicServices, setDynamicServices] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      try {
        // Fetch visibility settings
        const settingsRes = await fetch('/api/settings');
        if (settingsRes.ok) {
          const settingsData = await settingsRes.json();
          if (settingsData && settingsData.visibility) {
            setVisibility(settingsData.visibility);
          }
        }

        // Fetch dynamic services for sublinks
        const servicesRes = await fetch('/api/services');
        if (servicesRes.ok) {
          const servicesData = await servicesRes.json();
          if (Array.isArray(servicesData)) {
            setDynamicServices(servicesData);
          }
        }
      } catch (err) {
        console.error('Error fetching data in Navbar:', err);
      }
    };
    
    fetchData();
  }, []);

  const getNavLinks = () => {
     return navLinks.map(link => {
       if (link.label === 'SERVICES') {
         // Only show LAND TRANSPORT in sublinks
         const servicesSubLinks = dynamicServices.length > 0 
           ? dynamicServices
               .filter(s => s.slug === 'land-transport')
               .map(s => ({
                 href: `/services/${s.slug}`,
                 label: s.title.toUpperCase()
               }))
           : link.subLinks;
         
         // If dynamic filtering resulted in empty but we have hardcoded fallback
         const finalSubLinks = servicesSubLinks && servicesSubLinks.length > 0 ? servicesSubLinks : (link.subLinks || []);
         
         return { ...link, subLinks: finalSubLinks };
       }
       return link;
     });
   };

  const filteredNavLinks = getNavLinks().filter(link => {
    if (!mounted) return true;
    if (link.label === 'SERVICES' && visibility?.services === false) {
      return false;
    }
    if (link.label === 'TRACK ORDER' && visibility?.trackOrders === false) {
      return false;
    }
    return true;
  });

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:shadow-blue-600/50 transition-shadow">
                <Globe className="h-7 w-7 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-600 rounded-full border-2 border-white dark:border-slate-900"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tighter text-blue-900 dark:text-white leading-none">
                B2B<span className="text-red-600">LOGISTICS SOLUTION</span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.25em] text-slate-500 dark:text-slate-400 leading-none mt-1 uppercase">
                Premier Logistics Services in Madurai
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {filteredNavLinks.map(link => {
              const isActive = pathname === link.href || (link.subLinks && pathname.startsWith(link.href));
              const isDropdownOpen = activeDropdown === link.label;
              
              if (link.subLinks) {
                const isExternal = link.href.startsWith('http');
                const LinkComponent = isExternal ? 'a' : Link;
                const linkProps = isExternal ? { href: link.href, target: "_blank", rel: "noopener noreferrer" } : { href: link.href };

                return (
                  <div 
                    key={link.href} 
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <LinkComponent
                      {...(linkProps as any)}
                      className={`relative px-4 py-2 text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-1 rounded-lg ${
                        isActive 
                          ? 'text-red-600 bg-red-50 dark:bg-red-900/20' 
                          : 'text-slate-700 dark:text-slate-200 hover:text-red-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </LinkComponent>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 w-72 bg-white dark:bg-slate-800 shadow-2xl border border-slate-100 dark:border-slate-700 rounded-2xl overflow-hidden mt-2"
                        >
                          <div className="p-2">
                            {link.subLinks.map((subLink, index) => {
                              const isSubActive = pathname === subLink.href;
                              const isSubExternal = subLink.href.startsWith('http');
                              const SubLinkComponent = isSubExternal ? 'a' : Link;
                              const subLinkProps = isSubExternal ? { href: subLink.href, target: "_blank", rel: "noopener noreferrer" } : { href: subLink.href };

                              return (
                                <motion.div
                                  key={subLink.href}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                >
                                  <SubLinkComponent
                                    {...(subLinkProps as any)}
                                    className={`block px-4 py-3 text-sm font-bold tracking-wider transition-all duration-200 rounded-xl ${
                                      isSubActive 
                                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 shadow-lg shadow-yellow-400/30' 
                                        : 'text-slate-700 dark:text-slate-200 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-500 hover:text-blue-900'
                                    }`}
                                  >
                                    {subLink.label}
                                  </SubLinkComponent>
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const isExternal = link.href.startsWith('http');
              const LinkComponent = isExternal ? 'a' : Link;
              const linkProps = isExternal ? { href: link.href, target: "_blank", rel: "noopener noreferrer" } : { href: link.href };

              return (
                <LinkComponent
                  key={link.href}
                  {...(linkProps as any)}
                  className={`relative px-4 py-2 text-sm font-bold tracking-wide transition-all duration-300 rounded-lg ${
                    isActive 
                      ? 'text-red-600 bg-red-50 dark:bg-red-900/20' 
                      : 'text-slate-700 dark:text-slate-200 hover:text-red-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </LinkComponent>
              );
            })}
          </div>

          {/* Right Side - Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 transition-all duration-300"
              aria-label="Toggle theme"
            >
              <motion.div
                key={theme}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden py-4 border-t border-slate-100 dark:border-slate-800"
            >
              <div className="space-y-2">
                {filteredNavLinks.map(link => {
                  const isActive = pathname === link.href;
                  
                  if (link.subLinks) {
                    return (
                      <div key={link.href} className="space-y-1">
                        <button
                          onClick={() => {
                            if (link.href === '/services') {
                              setMobileServicesOpen(!mobileServicesOpen);
                            } else {
                              setMobileTrackOpen(!mobileTrackOpen);
                            }
                          }}
                          className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold tracking-wide text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                        >
                          <span>{link.label}</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen || (link.href.includes('track') && mobileTrackOpen) ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {(mobileServicesOpen && link.href === '/services') || (mobileTrackOpen && link.href.includes('track')) ? (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 space-y-1"
                            >
                              {link.subLinks?.map(subLink => {
                                const isSubActive = pathname === subLink.href;
                                return (
                                  <Link
                                    key={subLink.href}
                                    href={subLink.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                      isSubActive 
                                        ? 'bg-yellow-400 text-blue-900 font-bold' 
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-yellow-400 hover:text-blue-900'
                                    }`}
                                  >
                                    {subLink.label}
                                  </Link>
                                );
                              })}
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  const isExternal = link.href.startsWith('http');
                  if (isExternal) {
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block px-4 py-3 text-sm font-bold tracking-wide rounded-xl transition-colors ${
                          isActive 
                            ? 'bg-red-50 dark:bg-red-900/20 text-red-600' 
                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        {link.label}
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 text-sm font-bold tracking-wide rounded-xl transition-colors ${
                        isActive 
                          ? 'bg-red-50 dark:bg-red-900/20 text-red-600' 
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
