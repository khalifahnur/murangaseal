// import { getPayloadClient } from "@/lib/payloadClient";
// import FixturesSection from "./FixturesSection";

// import { startOfDay } from "date-fns";

// export const revalidate = 60;

// export default async function MatchContainer() {
//   const payload = await getPayloadClient();

//   const { docs: fixtures } = await payload.find({
//     collection: "matches",
//     where: {
//     and: [
//       {
//         matchDate: {
//           greater_than_equal: startOfDay(new Date()).toISOString(),
//         },
//       },
//       {
//         status: {
//           in: ["upcoming", "live"],
//         },
//       },
//     ],
//   },
//     sort: "matchDate",
//     limit: 3,
//     depth: 1,
//   });

//   if (!fixtures || fixtures.length === 0) {
//     return null;
//   }

//   return <FixturesSection fixtures={fixtures}/>;
// }

import { getPayloadClient } from "@/lib/payloadClient";
import FixturesSection from "./FixturesSection";
import { startOfDay } from "date-fns";

export const revalidate = 60;

export default async function MatchContainer() {
  const payload = await getPayloadClient();
  const today = startOfDay(new Date()).toISOString();

  const [menRes, wslRes] = await Promise.all([
    payload.find({
      collection: "matches",
      where: {
        and: [
          {
            matchDate: {
              greater_than_equal: startOfDay(new Date()).toISOString(),
            },
          },
          {
            status: {
              in: ["upcoming", "live"],
            },
          },
        ],
      },
      sort: "matchDate",
      limit: 3,
      depth: 1,
    }),
    payload.find({
      collection: "wsl",
      where: {
        and: [
          {
            matchDate: {
              greater_than_equal: startOfDay(new Date()).toISOString(),
            },
          },
          {
            status: {
              in: ["upcoming", "live"],
            },
          },
        ],
      },
      sort: "matchDate",
      limit: 3,
      depth: 1,
    }),
  ]);

  const menFixtures = menRes.docs;
  const wslFixtures = wslRes.docs;

  if (menFixtures.length === 0 && wslFixtures.length === 0) {
    return null;
  }

  return (
    <FixturesSection menFixtures={menFixtures} wslFixtures={wslFixtures} />
  );
}
