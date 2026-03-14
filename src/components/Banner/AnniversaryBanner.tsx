import Image from "next/image";

type BannerProps = {
  variant?: "strip" | "floating";
};

export default function AnniversaryBanner({ variant = "strip" }: BannerProps) {


  const containerClasses =
    variant === "strip"
      ? "w-full"
      : "z-50 mx-4 md:mx-auto max-w-6xl mb-12";

  return (
    <div className={`relative ${containerClasses}`}>

      {/* {windowDimensions.width > 0 && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={250}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 100, pointerEvents: 'none' }}
        />
      )} */}

      <div className="relative w-full max-h-[100px] md:max-h-[100px] flex justify-center items-center overflow-hidden">
        <div className="w-full h-1/2">
          <Image
            src="/assets/anniversary_banner.jpeg"
            alt="Anniversary Celebration"
            width={500} 
            height={200}
            className="w-full h-1/2 object-contain pointer-events-none"
            priority
          />
        </div>
      </div>
    </div>
  );
}