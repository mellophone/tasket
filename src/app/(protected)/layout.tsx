"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../../components/NavBar";
import Backend from "../../components/Backend";
import LoadingScreen from "../../components/LoadingScreen";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Backend.getUser().then((userResponse) => {
      if (userResponse.errors) {
        router.push("/login");
        return;
      }

      setUserData(userResponse);
      setLoading(false);
    });
  }, [children, router]);

  return loading ? (
    <LoadingScreen />
  ) : (
    <>
      <NavBar />
      <div className="content-space">{children}</div>
    </>
  );
};

export default ProtectedLayout;
