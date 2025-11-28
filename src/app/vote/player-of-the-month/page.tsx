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
      <div className="text-center py-20 text-2xl">
        No active Player of the Month voting right now.
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6 mozillaheadline">
        {!active.isActive && active.winner && (
          <div className="mb-8 p-8 bg-green-100 rounded-2xl text-center border-4 border-green-300">
            <h2 className="text-3xl font-bold text-green-800">
              Winner Announced!
            </h2>
            {/* eslint-disable @typescript-eslint/no-explicit-any  */}
            <p className="text-4xl mt-4 font-black">
              {(active.winner as any)?.name} is Player of the Month!
            </p>
          </div>
        )}
        {/* eslint-disable @typescript-eslint/no-explicit-any  */}
        <POTMPage monthData={active as any} isAdmin={isAdmin} />
      </div>

      <PartnershipSection />
      <Footer />
    </>
  );
}
