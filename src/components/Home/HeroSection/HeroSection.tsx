import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative h-[65vh] min-h-[550px] w-full bg-[#080908] flex items-center overflow-hidden border-b border-white/5">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-[#2fa83e]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-16 grid lg:grid-cols-2 gap-8 items-center h-full">
        {/* Left Side: Brand Story */}
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-10 bg-[#2fa83e]"></span>
            <span className="text-[#2fa83e] font-semibold tracking-[0.3em] text-[10px] uppercase">
              Exclusive Artisan Collection
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif text-white leading-[1.1]">
            Elegance in <br />
            <span className="text-gray-400 font-light italic">Deep</span>
            <span className="text-[#2fa83e] drop-shadow-[0_0_15px_rgba(47,168,62,0.3)]">
              {" "}
              Emerald
            </span>
          </h1>

          <p className="text-gray-500 text-sm md:text-base max-w-sm font-light leading-relaxed uppercase tracking-wider">
            Premium hand-loomed fabric. <br /> Crafted for the modern
            aristocrat.
          </p>

          <div className="pt-4 flex items-center gap-6">
            <button className="bg-[#2fa83e] text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#258a32] hover:scale-105 transition-all duration-300 shadow-[0_10px_30px_rgba(47,168,62,0.2)]">
              Shop The Series
            </button>
            <div className="h-12 w-[1px] bg-white/10 mx-2"></div>
            <p className="text-[10px] text-gray-400 leading-tight uppercase tracking-[0.1em]">
              Limited Edition <br />{" "}
              <span className="text-white font-bold">50 Pieces Only</span>
            </p>
          </div>
        </div>

        {/* Right Side: Visual Showcase */}
        <div className="relative h-full flex items-center justify-center lg:justify-end">
          {/* Main Hero Image Box */}
          <div className="relative w-[80%] h-[80%] border border-white/10 p-2 group transition-all duration-700 hover:border-[#2fa83e]/40">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/hero.jpg" // High-end close up of panjabi texture/model
                alt="Emerald Panjabi"
                fill
                className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080908] via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Floating Technical Detail Card */}
            <div className="absolute -left-12 bottom-12 bg-[#0d0f0d] border border-white/10 p-5 backdrop-blur-md">
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <span className="text-[#2fa83e] font-serif text-xl">01</span>
                  <div className="h-[1px] w-8 bg-white/20"></div>
                  <span className="text-[9px] text-gray-400 uppercase tracking-widest">
                    Fabric Detail
                  </span>
                </div>
                <p className="text-xs text-white font-light tracking-wide italic">
                  120s Fine Egyptian Cotton with <br /> Emerald Silk Weaving
                </p>
              </div>
            </div>

            {/* Geometric Accent */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-[#2fa83e]/50"></div>
          </div>
        </div>
      </div>

      {/* Background "Ghost" Text for Premium Feel */}
      <div className="absolute bottom-4 right-8 overflow-hidden pointer-events-none hidden lg:block">
        <h2 className="text-[120px] font-serif font-black text-white/[0.02] leading-none select-none uppercase">
          Noble
        </h2>
      </div>
    </section>
  );
};

export default HeroSection;
