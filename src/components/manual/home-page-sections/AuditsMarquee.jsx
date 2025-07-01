import { AUDIT_IMAGES } from "@/data/audits-marquee-data/audits-marquee-data";
import { useMemo, memo, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const ANIMATION_SPEEDS = {
  fast: "30s",
  normal: "40s",
  slow: "80s",
};

const AuditsMarquee = ({
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
}) => {
  // State to control when animation starts - exactly like original behavior
  const [start, setStart] = useState(false);

  // Start animation after component mounts - replicating original timing
  useEffect(() => {
    setStart(true);
  }, []);

  // Memoize animation styles to prevent unnecessary recalculations
  const animationStyles = useMemo(() => {
    const animationDirection = direction === "left" ? "forwards" : "reverse";
    return {
      "--animation-direction": animationDirection,
      "--animation-duration": ANIMATION_SPEEDS[speed],
    };
  }, [direction, speed]);

  // Create duplicated images array for infinite scroll effect
  const duplicatedImages = useMemo(() => {
    return [...AUDIT_IMAGES, ...AUDIT_IMAGES]; // Duplicate the array instead of DOM manipulation
  }, []);

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
          className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
          style={animationStyles}
        >
          <ul
            className={cn(
              "flex w-max min-w-full shrink-0 flex-nowrap gap-6",
              // Animation only starts when start is true - exactly like original
              start && "animate-scroll",
              // GPU acceleration optimization
              "[will-change:transform]",
              // Pause on hover functionality
              pauseOnHover && "hover:[animation-play-state:paused]"
            )}
          >
            {duplicatedImages.map((image, idx) => (
              <li
                key={`${image.name}-${idx}`} // Stable unique keys - proper React pattern
                className="flex items-center justify-center shrink-0 pb-16"
              >
                <div
                  className="cursor-pointer overflow-hidden relative h-64 w-80 rounded-lg shadow-xl group/card flex flex-col justify-end p-5 bg-cover bg-center border border-neutral-200"
                  style={{
                    backgroundImage: `url(${image.src})`,
                  }}
                >
                  {/* Overlay */}
                  <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-10 group-hover/card:opacity-20"></div>

                  {/* Bottom gradient for better text visibility */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent"></div>

                  {/* Bottom Content */}
                  <div className="z-10">
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
};

// Memoize component to prevent unnecessary re-renders
export default memo(AuditsMarquee);
