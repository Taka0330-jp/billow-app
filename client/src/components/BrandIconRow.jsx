import framer from "../assets/icons/framer.jpg";
import adobe from "../assets/icons/adobe.jpg";
import amazon from "../assets/icons/amazon.jpg";
import dropbox from "../assets/icons/dropbox.jpg";
import figma from "../assets/icons/figma.jpg";
import instacart from "../assets/icons/instacart.jpg";
import netflix from "../assets/icons/netflix.jpg";
import spotify from "../assets/icons/Spotify.jpg";

const brands = [
  { id: 1, src: framer, alt: "Framer" },
  { id: 2, src: adobe, alt: "Adobe" },
  { id: 3, src: amazon, alt: "Amazon" },
  { id: 4, src: dropbox, alt: "Dropbox" },
  { id: 5, src: figma, alt: "Figma" },
  { id: 6, src: instacart, alt: "Instacart" },
  { id: 7, src: netflix, alt: "Netflix" },
  { id: 8, src: spotify, alt: "Spotify" },
];

export default function BrandIconRow() {
  return (
    <div className="flex items-center gap-4 mt-6">
      {brands.map((brand) => (
        <div
          key={brand.id}
          className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md"
        >
          <img
            src={brand.src}
            alt={brand.alt}
            className="w-8 h-8 object-contain"
          />
        </div>
      ))}
    </div>
  );
}