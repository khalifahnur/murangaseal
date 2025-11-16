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
    return null;
  }

  return <FixturesSection fixtures={fixtures}/>;
}
