import { getPayload } from 'payload';
import config from "@payload-config";


export async function getActivePOTM() {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: 'player-of-the-month',
    where: { isActive: { equals: true } },
    depth: 2,
  });

  const month = result.docs[0];
  if (!month) return null;

  const votes = await payload.find({
    collection: 'potm-votes',
    where: { month: { equals: month.id } },
  });

  /* eslint-disable @typescript-eslint/no-explicit-any  */
  const counts: Record<string, number> = {};
  votes.docs.forEach((vote: any) => {
    const pid = typeof vote.player === 'string' ? vote.player : vote.player.id;
    counts[pid] = (counts[pid] || 0) + 1;
  });

  return {
    ...month,
    voteCounts: counts,
    totalVotes: votes.totalDocs,
  };
}