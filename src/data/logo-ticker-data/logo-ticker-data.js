// Import all SVG assets properly for Vite build
import honeywellLogo from "@/assets/client-logos/honeywell.svg";
import ikeaLogo from "@/assets/client-logos/ikea.svg";
import panasonicLogo from "@/assets/client-logos/panasonic.svg";
import ansellLogo from "@/assets/client-logos/ansell.svg";
import ametekLogo from "@/assets/client-logos/ametek.svg";
import boschLogo from "@/assets/client-logos/bosch.svg";

export const COMPANY_LOGOS = [
  {
    name: "Honeywell",
    src: honeywellLogo,
    height: 37,
    alt: "Honeywell Logo",
  },
  {
    name: "IKEA",
    src: ikeaLogo,
    height: 30,
    alt: "IKEA Logo",
  },
  {
    name: "Panasonic",
    src: panasonicLogo,
    height: 26,
    alt: "Panasonic Logo",
  },
  {
    name: "Ansell",
    src: ansellLogo,
    height: 26,
    alt: "Ansell Logo",
  },
  {
    name: "Ametek",
    src: ametekLogo,
    height: 23.5,
    alt: "Ametek Logo",
  },
  {
    name: "Bosch",
    src: boschLogo,
    height: 32,
    alt: "Bosch Logo",
  },
];
