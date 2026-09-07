import React from 'react';
import back1 from "../assets/back1.jpg";
import back2 from "../assets/back2.jpg";
import back3 from "../assets/back3.jpg";
import back4 from "../assets/back4.jpg";

function Backgound({ heroCount }) {
  const images = [back2, back1, back3, back4];
  const currentImage = images[heroCount] || back1;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Background Image with Subtle Parallax Zoom */}
      <img
        src={currentImage}
        alt="Hero Banner"
        className="w-full h-full object-cover object-center transition-all duration-700 ease-in-out transform scale-102"
      />
      {/* Dynamic Luxury Vignette & Dark Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
    </div>
  );
}

export default Backgound;
