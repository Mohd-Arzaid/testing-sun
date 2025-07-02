import { useMemo, memo, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { COMPANY_LOGOS } from "@/data/logo-ticker-data/logo-ticker-data";

const ANIMATION_SPEEDS = {
  fast: "15s",
  normal: "25s",
  slow: "35s",
};

const LogoTicker = ({
  direction = "left",
  speed = "normal",
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

  // Create duplicated logos array for infinite scroll effect
  const duplicatedLogos = useMemo(() => {
    return [...COMPANY_LOGOS, ...COMPANY_LOGOS]; // Duplicate the array instead of DOM manipulation
  }, []);

  return (
    <div className="bg-white w-full py-3 md:py-5">
      <div className="max-w-[84rem] mx-auto px-2 md:px-4">
        <div
          className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
          style={animationStyles}
        >
          <ul
            className={cn(
              "flex w-max min-w-full shrink-0 flex-nowrap gap-1 md:gap-6",
              // Animation only starts when start is true - exactly like original
              start && "animate-scroll",
              // GPU acceleration optimization
              "[will-change:transform]",
              // Pause on hover functionality
              pauseOnHover && "hover:[animation-play-state:paused]"
            )}
          >
            {duplicatedLogos.map((logo, index) => (
              <li
                key={`${logo.name}-${index}`} // Stable unique keys - proper React pattern
                className="flex items-center justify-center px-3 md:px-6 py-2 md:py-4 shrink-0"
              >
                <img
                  className="mx-auto w-fit scale-[0.8] md:scale-100"
                  src={logo.src}
                  alt={logo.alt}
                  height={logo.height}
                  width="auto"
                  style={{ height: `${logo.height}px` }} // Simple inline style - fast & clean
                  // Performance optimization: prevent layout shift
                  loading="eager"
                  decoding="sync"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Memoize component to prevent unnecessary re-renders
export default memo(LogoTicker);
