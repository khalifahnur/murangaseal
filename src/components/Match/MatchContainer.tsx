import { getPayloadClient } from "@/lib/payloadClient";
import FixturesSection from "./FixturesSection";

export default async function MatchContainer() {
  const payload = await getPayloadClient();

  const { docs: fixtures } = await payload.find({
    collection: "matches",
    sort: 'matchDate',
    limit: 3,
    depth: 1,
  });

  if (!fixtures || fixtures.length === 0) {
    return <div className="py-20 text-center">No Fixtures yet. Stay tuned!</div>;
  }

  return <FixturesSection fixtures={fixtures}/>;
}
