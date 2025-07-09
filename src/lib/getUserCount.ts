"use server";

import { db } from "@/server/db";

export async function getUserCount() {
  const users = await db.user.findMany({
    select: {
      id: true,
      imageUrl: true,
    },
    take: 6,
  });

  return {
    userCount: users.length,
    avatars: users.map((user) => ({
      id: user.id,
      imageUrl: user.imageUrl ?? "/default-avatar.png", // fallback
    })),
  };
}
