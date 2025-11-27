import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { headers } from "next/headers";

export const POST = async (req: NextRequest) => {
  const { matchId, playerId } = await req.json();

  if (!matchId || !playerId) {
    return NextResponse.json(
      { error: "Missing matchId or playerId" },
      { status: 400 }
    );
  }

  const payload = await getPayload({ config });

  const { user } = await payload.auth({ headers: req.headers });
  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  try {
    const match = await payload.findByID({
      collection: "matches",
      id: matchId,
      depth: 2,
    });

    if (!match || !match.votingOpen) {
      return NextResponse.json({ error: "Voting is closed" }, { status: 400 });
    }
/* eslint-disable @typescript-eslint/no-explicit-any */
    const playerIds = (match.players || []).map((p: any) =>
      typeof p === "string" ? p : p.id || p._id
    );
    if (!playerIds.includes(playerId)) {
      return NextResponse.json({ error: "Invalid player" }, { status: 400 });
    }

    const existing = await payload.find({
      collection: "motm-votes",
      where: {
        and: [
          { match: { equals: matchId } },
          user
            ? { votedBy: { equals: user.id } }
            : { ipAddress: { equals: ip } },
        ],
      },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      return NextResponse.json(
        { error: "You have already voted" },
        { status: 403 }
      );
    }

    await payload.create({
      collection: "motm-votes",
      data: {
        match: matchId,
        player: playerId,
        votedBy: user?.id || undefined,
        ipAddress: user ? undefined : ip,
        userAgent: req.headers.get("user-agent") || undefined,
      },
    });

    return NextResponse.json({ success: true });
  } 
  /* eslint-disable @typescript-eslint/no-explicit-any */
  catch (err: any) {
    if (err.code === 11000) {
      return NextResponse.json(
        { error: "You have already voted" },
        { status: 403 }
      );
    }
    console.error("Vote error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
