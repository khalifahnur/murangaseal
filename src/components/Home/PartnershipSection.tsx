import Image from "next/image";
import Link from "next/link";

const sponsors = [
  {
    id: "1",
    href: "https://www.ke.sportpesa.com/en/sports-betting/football-1/",
    image: "/assets/sponsors/sp-logo.jpg",
    alt: "SportPesa - Official Sports Betting Partner",
    text: "SportPesa",
    isBold: true,
    group: 1,
  },
  {
    id: "2",
    href: "https://casino-finix.com/en/",
    image: "/assets/sponsors/finix logo.jpg",
    alt: "Finix",
    text: "Finix",
    isBold: true,
    group: 2,
  },
  {
    id: "3",
    href: "https://whizmo.com/kenya/index.html",
    image: "/assets/sponsors/whizmo.svg",
    alt: "whizmo",
    text: "Whizmo",
    isBold: true,
    group: 2,
  },
];


export default function PartnershipSection() {
  return (
    <section className="bg-[#FFFF] bg-pattern-red-dots py-20">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-[#1e1e1e] text-[30px] font-bold tracking-widest uppercase mb-12 opacity-80">OFFICIAL PARTNERS</h3>
        
        {/* Top Tier Partners (Simulated Logos with Text for now, as images are specific to the club) */}
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 mb-16">
          {/* <div className="text-white text-4xl md:text-5xl font-black lowercase tracking-tighter">indeed</div>
          <div className="text-white text-4xl md:text-5xl font-bold tracking-tighter">Gtech</div>
          <div className="text-white text-3xl md:text-4xl font-bold italic tracking-tighter">Joma</div> */}
          {sponsors.map((partner) => (
                <Link
                  href={partner.href}
                  key={partner.image}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={partner.image}
                    alt={partner.alt}
                    width={200}
                    height={200}
                  />
                </Link>
              ))}
        </div>
        
        <div className="w-full h-px bg-black/20" />
      </div>
    </section>
  );
}
