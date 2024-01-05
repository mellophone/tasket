import "./Centered.css";

const Centered = (params: { children: any }) => {
  return (
    <div className="outer-space">
      <div className="inner-space">{params.children}</div>
    </div>
  );
};

export default Centered;
