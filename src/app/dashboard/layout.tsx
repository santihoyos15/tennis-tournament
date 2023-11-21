"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const { user, error } = await getUser();

      if (error) {
        router.push("/");
        return;
      }

      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <main>{children}</main>;
}

async function getUser() {
  try {
    const { data } = await axios.get("/api/auth/user");

    return {
      user: data,
      error: null,
    };
  } catch (e) {
    const error = e as AxiosError;

    return {
      user: null,
      error,
    };
  }
}

// TODO Commit and then figure out how the data model
