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

      <div className="relative w-full max-h-[100px] md:max-h-[100px] flex justify-center items-center overflow-hidden">
        <div className="w-full h-1/2">
          <Image
            src="/assets/anniversary_banner.jpeg"
            alt="Anniversary Celebration"
            width={500} 
            height={100}
            className="w-full h-50 object-contain pointer-events-none"
            priority
          />
        </div>
      </div>
    </div>
  );
}