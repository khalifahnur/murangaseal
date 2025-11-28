import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { headers } from "next/headers";

export const POST = async (req: NextRequest) => {
  const { monthId, playerId } = await req.json();

  if (!monthId || !playerId) {
    return NextResponse.json(
      { error: "Missing monthId or playerId" },
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
    const potmMonth = await payload.findByID({
      collection: "player-of-the-month",
      id: monthId,
      depth: 2,
    });

    if (!potmMonth) {
      return NextResponse.json({ error: "Month not found" }, { status: 404 });
    }

    if (!potmMonth.isActive) {
      return NextResponse.json({ error: "Voting is closed for this month" }, { status: 400 });
    }

    const candidateIds = (potmMonth.candidates || [])
      .map((p: any) => (typeof p === "string" ? p : p.id || p._id))
      .filter(Boolean);

    if (!candidateIds.includes(playerId)) {
      return NextResponse.json({ error: "This player is not a candidate" }, { status: 400 });
    }

    const existingVote = await payload.find({
      collection: "potm-votes",
      where: {
        and: [
          { month: { equals: monthId } },
          user
            ? { votedBy: { equals: user.id } }
            : { ipAddress: { equals: ip } },
        ],
      },
      limit: 1,
    });

    if (existingVote.docs.length > 0) {
      return NextResponse.json(
        { error: "You have already voted this month" },
        { status: 403 }
      );
    }

    await payload.create({
      collection: "potm-votes",
      data: {
        month: monthId,
        player: playerId,
        votedBy: user?.id || undefined,
        ipAddress: user ? undefined : ip,
        userAgent: req.headers.get("user-agent") || undefined,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err.code === 11000) {
      return NextResponse.json(
        { error: "You have already voted this month" },
        { status: 403 }
      );
    }

    console.error("POTM Vote error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};