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
    <section className="mozillaheadline bg-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black mb-6 tracking-tight">
            PARTNERSHIPS
          </h1>
          <div className="w-32 h-1 bg-primary mx-auto mb-8"></div>
          {/* <p className="text-gray-900 text-lg max-w-2xl mx-auto">
            We're proud to partner with industry leaders who share our passion
            for excellence and innovation.
          </p> */}
        </div>

        <div className="space-y-6">
          <div>
            <div className="grid grid-cols-3">
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
          </div>
        </div>
      </div>
    </section>
  );
}
