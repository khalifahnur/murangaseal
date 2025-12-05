import { Footer } from "@/components/Home/Footer";
import Header from "@/components/Home/HeaderSection";
import PartnershipSection from "@/components/Home/PartnershipSection";
import { POTMPage } from "@/components/Potm/Potm";
import { getActivePOTM } from "@/lib/Potm";
import { getPayload } from "payload";
import { cookies } from "next/headers";
import config from "@payload-config";

export const revalidate = 60;

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("payload-token")?.value;

  let isAdmin = false;

  if (token) {
    try {
      const payload = await getPayload({ config });

      const { user } = await payload.auth({
        headers: new Headers({
          cookie: `payload-token=${token}`,
        }),
      });

      isAdmin = !!user;
    } catch (error) {
      console.error("Payload auth failed:", error);
      isAdmin = false;
    }
  }

  const active = await getActivePOTM();

  if (!active) {
    return (
      <>
        <Header />
        <div className="text-center py-20 text-2xl mozillaheadline">
          No active Player of the Month voting right now.
        </div>
        <PartnershipSection />
        <Footer />
      </>
    );
  }

  if (!active.isActive && active.winner) {
    return (
      <>
        <Header />
        <div className="max-w-4xl mx-auto p-6 mozillaheadline">
          <div className="mb-8 p-8 rounded-2xl text-center border-2 ">
            <h2 className="text-xl font-bold text-green-800">
              Winner Announced!
            </h2>
            <p className="text-xl mt-4 font-black">
              {/* eslint-disable @typescript-eslint/no-explicit-any */}
              {(active.winner as any)?.name} is Player of the Month!
            </p>
            <p>
             for {active.monthYear}
            </p>
          </div>
        </div>
        <PartnershipSection />
        <Footer />
      </>
    );
  }

  if (!active.isActive && !active.winner) {
    return (
      <>
        <Header />
        <div className="text-center py-20 text-2xl mozillaheadline">
          No voting available right now. Check back later!
        </div>
        <PartnershipSection />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6 mozillaheadline">
        
        {/* eslint-disable @typescript-eslint/no-explicit-any */}
        <POTMPage monthData={active as any} isAdmin={isAdmin} />
      </div>
      <PartnershipSection />
      <Footer />
    </>
  );
}