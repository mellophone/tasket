"use client";

import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../../components/NavBar";
import Backend from "../../components/Backend";
import LoadingScreen from "../../components/LoadingScreen";
import { UserContext, UserData } from "../../components/constants";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({} as UserData);
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
  }, [router]);

  return loading ? (
    <LoadingScreen />
  ) : (
    <>
      <NavBar />
      <UserContext.Provider value={userData}>
        <div className="content-space">
          <div className="content-area">{children}</div>
        </div>
      </UserContext.Provider>
    </>
  );
};

export default ProtectedLayout;
