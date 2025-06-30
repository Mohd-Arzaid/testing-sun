import honeywell from "@/assets/client-logos/honeywell.svg";
import panasonic from "@/assets/client-logos/panasonic.svg";
import ikea from "@/assets/client-logos/ikea.svg";
import ansell from "@/assets/client-logos/ansell.svg";
import ametek from "@/assets/client-logos/ametek.svg";
import bosch from "@/assets/client-logos/bosch.svg";
import { useMemo, memo, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const logos = [
  {
    name: "Honeywell",
    src: honeywell,
    height: "37",
    alt: "Honeywell Logo",
  },
  {
    name: "IKEA",
    src: ikea,
    height: "30",
    alt: "IKEA Logo",
  },
  {
    name: "Panasonic",
    src: panasonic,
    height: "26",
    alt: "Panasonic Logo",
  },

  {
    name: "Ansell",
    src: ansell,
    height: "26",
    alt: "Ansell Logo",
  },
  {
    name: "Ametek",
    src: ametek,
    height: "23.5",
    alt: "Ametek Logo",
  },

  {
    name: "Bosch",
    src: bosch,
    height: "32",
    alt: "Bosch Logo",
  },
];

const LogoTicker = ({
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
}) => {
  // State to control when animation starts - exactly like original behavior
  const [start, setStart] = useState(false);

  // Start animation after component mounts - replicating original timing
  useEffect(() => {
    const timer = setTimeout(() => setStart(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Memoize animation styles to prevent unnecessary recalculations
  const animationStyles = useMemo(() => {
    const animationDirection = direction === "left" ? "forwards" : "reverse";
    let animationDuration;

    switch (speed) {
      case "fast":
        animationDuration = "20s";
        break;
      case "normal":
        animationDuration = "30s";
        break;
      default: // "slow"
        animationDuration = "40s";
        break;
    }

    return {
      "--animation-direction": animationDirection,
      "--animation-duration": animationDuration,
    };
  }, [direction, speed]);

  // Create duplicated logos array for infinite scroll effect
  const duplicatedLogos = useMemo(() => {
    return [...logos, ...logos]; // Duplicate the array instead of DOM manipulation
  }, []);

  return (
    <div className="bg-white w-full py-5">
      <div className="max-w-[84rem] mx-auto px-4">
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
            {duplicatedLogos.map((logo, index) => (
              <li
                key={`${logo.name}-${index}`} // Unique key for duplicated items
                className="flex items-center justify-center px-6 py-4 shrink-0"
              >
                <img
                  className="mx-auto w-fit"
                  src={logo.src}
                  alt={logo.alt}
                  height={logo.height}
                  width="auto"
                  style={{ height: `${logo.height}px` }}
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
