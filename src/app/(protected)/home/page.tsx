"use client";
import { useContext } from "react";
import { UserContext } from "../../../components/constants";
import GroupBlock from "../../../components/GroupBlock";

const Home = () => {
  const userData = useContext(UserContext);

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div className="medium-large-text" style={{ userSelect: "none" }}>
          Your Groups
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
        >
          {Object.keys(userData.groups).map((groupName) => (
            <GroupBlock
              key={groupName}
              name={groupName}
              groupData={userData.groups[groupName]}
            />
          ))}
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <div className="medium-large-text" style={{ userSelect: "none" }}>
          Upcoming Reminders
        </div>
      </div>
    </>
  );
};

export default Home;
