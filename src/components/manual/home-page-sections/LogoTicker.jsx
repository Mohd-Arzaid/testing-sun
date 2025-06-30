import honeywell from "@/assets/client-logos/honeywell.svg";
import panasonic from "@/assets/client-logos/panasonic.svg";
import ikea from "@/assets/client-logos/ikea.svg";
import ansell from "@/assets/client-logos/ansell.svg";
import ametek from "@/assets/client-logos/ametek.svg";
import bosch from "@/assets/client-logos/bosch.svg";
import { useEffect, useRef, useState } from "react";
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
  speed = "slow",
  pauseOnHover = true,
}) => {
  const containerRef = useRef(null); // Main container element ka reference
  const scrollerRef = useRef(null); // Scrolling ul element ka reference

  const [start, setStart] = useState(false);

  // useEffect - component mount hone par animation setup karta hai
  useEffect(() => {
    addAnimation();
  }, []); // Empty dependency array - sirf ek baar run hoga

  const addAnimation = () => {
    // Check kar rahe hain ki dono refs available hain ya nahi
    if (containerRef.current && scrollerRef.current) {
      // Scroller ke andar ke sab children (logo items) ko array mein convert kar rahe hain
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Har logo item ko duplicate kar rahe hain - infinite scroll effect ke liye
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true); // Logo item ko clone kar rahe hain (deep copy)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem); // Clone ko scroller mein add kar rahe hain
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  };

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        // Left direction ke liye CSS custom property set kar rahe hain
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards" // CSS animation forwards chalegi
        );
      } else {
        // Right direction ke liye reverse kar rahe hain
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse" // CSS animation reverse chalegi
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        // Fast speed - 20 seconds mein complete cycle
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        // Normal speed - 40 seconds mein complete cycle
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        // Slow speed (default) - 60 seconds mein complete cycle
        containerRef.current.style.setProperty("--animation-duration", "60s");
      }
    }
  };

  return (
    <div className="bg-white w-full py-5">
      <div className="max-w-[84rem] mx-auto px-4">
        <div
          ref={containerRef}
          className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
          // overflow hidden - bahar nikalne wale elements hide ho jayenge
          // mask-image - edges par fade effect dene ke liye gradient mask
        >
          <ul
            ref={scrollerRef}
            className={cn(
              "flex w-max min-w-full shrink-0 flex-nowrap gap-6",
              start && "animate-scroll", // Animation class sirf tab add hogi jab start true ho
              pauseOnHover && "hover:[animation-play-state:paused]" // Hover par pause sirf tab hoga jab pauseOnHover true ho
            )}
          >
            {logos.map((logo) => (
              <li
                key={logo.name}
                className="flex items-center justify-center px-6 py-4 shrink-0"
              >
                <img
                  className="mx-auto w-fit" // Center align, width fit to content
                  src={logo.src}
                  alt={logo.alt}
                  height={logo.height}
                  width="auto"
                  style={{ height: `${logo.height}px` }} // Inline style - exact height pixels mein
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LogoTicker;
