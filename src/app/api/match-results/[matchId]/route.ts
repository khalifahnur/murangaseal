import { NextResponse } from 'next/server';
import { getPayload } from "payload";
import config from "@payload-config";

interface Props {
  params: Promise<{
    matchId: string;
  }>;
}

export async function GET(
  request: Request,
  { params }:  Props
) {
  const {matchId} = await params;
  const payload = await getPayload({ config });

  const votes = await payload.find({
    collection: 'motm-votes',
    where: { match: { equals: matchId } },
  });
/* eslint-disable @typescript-eslint/no-explicit-any */
  const counts = votes.docs.reduce((acc: any, vote: any) => {
    const playerId = typeof vote.player === 'string' ? vote.player : vote.player.id;
    acc[playerId] = (acc[playerId] || 0) + 1;
    return acc;
  }, {});

  return NextResponse.json(counts);
}