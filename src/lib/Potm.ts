import { getPayload } from 'payload';
import config from "@payload-config";

export async function getActivePOTM() {
  const payload = await getPayload({ config });

  const activeResult = await payload.find({
    collection: 'player-of-the-month',
    where: { isActive: { equals: true } },
    depth: 2,
    limit: 1,
  });

  const activeMonth = activeResult.docs[0];
  
  if (activeMonth) {
    const votes = await payload.find({
      collection: 'potm-votes',
      where: { month: { equals: activeMonth.id } },
    });

    /* eslint-disable @typescript-eslint/no-explicit-any  */
    const counts: Record<string, number> = {};
    votes.docs.forEach((vote: any) => {
      const pid = typeof vote.player === 'string' ? vote.player : vote.player.id;
      counts[pid] = (counts[pid] || 0) + 1;
    });

    return {
      ...activeMonth,
      voteCounts: counts,
      totalVotes: votes.totalDocs,
    };
  }

  const latestResult = await payload.find({
    collection: 'player-of-the-month',
    where: { 
      winner: { exists: true }, 
      isActive: { equals: false }
    },
    depth: 2,
    sort: '-monthYear', 
    limit: 1,
  });

  const latestMonth = latestResult.docs[0];
  
  if (latestMonth) {
    const votes = await payload.find({
      collection: 'potm-votes',
      where: { month: { equals: latestMonth.id } },
    });

    /* eslint-disable @typescript-eslint/no-explicit-any  */
    const counts: Record<string, number> = {};
    votes.docs.forEach((vote: any) => {
      const pid = typeof vote.player === 'string' ? vote.player : vote.player.id;
      counts[pid] = (counts[pid] || 0) + 1;
    });

    return {
      ...latestMonth,
      voteCounts: counts,
      totalVotes: votes.totalDocs,
    };
  }

  return null;
}