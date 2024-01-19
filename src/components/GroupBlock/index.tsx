import "./GroupBlock.css";

const GroupBlock = (params: { name: string; groupData: any }) => {
  const { name, groupData } = params;

  return (
    <div
      className="outlined-block group-block"
      style={{
        borderColor: groupData.color,
      }}
    >
      <div className="medium-large-text">{name}</div>
      <div className="medium-text">{groupData.type}</div>
    </div>
  );
};

export default GroupBlock;
