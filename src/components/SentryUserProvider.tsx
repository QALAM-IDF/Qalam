"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import * as Sentry from "@sentry/nextjs";

export function SentryUserProvider() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    if (user) {
      Sentry.setUser({
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        username: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
      });
      Sentry.setTag("clerk_user_id", user.id);
    } else {
      Sentry.setUser(null);
    }
  }, [user, isLoaded]);

  return null;
}

