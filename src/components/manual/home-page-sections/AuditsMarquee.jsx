import { AUDIT_IMAGES } from "@/data/audits-marquee-data/audits-marquee-data";
import { useCallback, useEffect, useRef, useState, memo } from "react";
import { cn } from "@/lib/utils";

// Move constants outside component to prevent recreation
const ANIMATION_SPEEDS = {
  fast: "20s",
  normal: "40s",
  slow: "80s",
};

// Pre-duplicate images array to avoid runtime duplication
const DUPLICATED_IMAGES = [...AUDIT_IMAGES, ...AUDIT_IMAGES];

const AuditsMarquee = memo(
  ({ direction = "left", speed = "slow", pauseOnHover = true, className }) => {
    const containerRef = useRef(null);
    const scrollerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isReady, setIsReady] = useState(false);

    // Memoize style setters to prevent recreation on each render
    const setDirection = useCallback(() => {
      if (!containerRef.current) return;
      const value = direction === "left" ? "forwards" : "reverse";
      containerRef.current.style.setProperty("--animation-direction", value);
    }, [direction]);

    const setSpeed = useCallback(() => {
      if (!containerRef.current) return;
      containerRef.current.style.setProperty(
        "--animation-duration",
        ANIMATION_SPEEDS[speed]
      );
    }, [speed]);

    // Initialize intersection observer
    useEffect(() => {
      const options = {
        root: null,
        rootMargin: "50px", // Start loading slightly before the component is visible
        threshold: 0.1,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Once visible, no need to observe anymore
          }
        });
      }, options);

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }, []);

    // Only initialize animations when component is visible
    useEffect(() => {
      if (
        !isVisible ||
        !containerRef.current ||
        !scrollerRef.current ||
        isReady
      )
        return;

      // Start preloading images when component becomes visible
      const imagePromises = DUPLICATED_IMAGES.map((image) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = image.src;
        });
      });

      // Once all images are loaded, initialize the animation
      Promise.all(imagePromises)
        .then(() => {
          requestAnimationFrame(() => {
            setDirection();
            setSpeed();
            setIsReady(true);
          });
        })
        .catch((error) => {
          console.error("Failed to preload some images:", error);
          // Still initialize animation even if some images fail to load
          requestAnimationFrame(() => {
            setDirection();
            setSpeed();
            setIsReady(true);
          });
        });
    }, [isVisible, setDirection, setSpeed, isReady]);

    return (
      <div className="bg-white py-8">
        <div className="max-w-[84rem] mx-auto px-4 sm:px-6 md:px-12">
          {/* Heading */}
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800 drop-shadow-lg mb-2 sm:mb-3">
              International Audit Glimpse
            </h2>
            <p className="text-base sm:text-lg md:text-xl font-geist text-neutral-600 max-w-xl mx-auto">
              Showcasing our global auditing and certification expertise across
              diverse industries and international markets.
            </p>
          </div>

          <div
            ref={containerRef}
            className={cn(
              "overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
              className
            )}
          >
            <ul
              ref={scrollerRef}
              className={cn(
                "flex w-max min-w-full shrink-0 flex-nowrap gap-6 translate-z-0",
                isReady && "animate-scroll",
                "[will-change:transform]",
                pauseOnHover && "hover:[animation-play-state:paused]"
              )}
            >
              {DUPLICATED_IMAGES.map((image, idx) => (
                <li
                  key={`${image.name}-${idx}`}
                  className="flex items-center justify-center shrink-0 pb-16"
                >
                  <div
                    className="cursor-pointer overflow-hidden relative h-64 w-80 rounded-lg shadow-xl group/card flex flex-col justify-end p-5 bg-cover bg-center border border-neutral-200 translate-z-0"
                    style={{
                      backgroundImage: `url(${image.src})`,
                      contain: "paint",
                    }}
                  >
                    {/* Overlay - Using opacity classes instead of dynamic styles */}
                    <div className="absolute w-full h-full top-0 left-0 transition-opacity duration-300 bg-black opacity-10 group-hover/card:opacity-20"></div>

                    {/* Bottom gradient - Pre-composed layer */}
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent"></div>

                    {/* Bottom Content - Promote to own layer */}
                    <div className="z-10 translate-z-0">
                      <h3 className="font-bold font-playfair text-2xl tracking-wide text-white relative drop-shadow-2xl">
                        {image.name}
                      </h3>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
);

// Add display name for debugging
AuditsMarquee.displayName = "AuditsMarquee";

export default AuditsMarquee;
