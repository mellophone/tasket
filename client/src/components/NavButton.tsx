import cog from "./Cog.svg";
import cog2 from "./Cog-Hover.svg";
import home from "./Home.svg";
import home2 from "./Home-Hover.svg";
import timeline from "./Timeline.svg";
import timeline2 from "./Timeline-Hover.svg";
import add from "./Add.svg";
import add2 from "./Add-Hover.svg";
import { Link } from "react-router-dom";

function NavButton(props: { dest: string; onClick?: () => void }) {
  let img: string;
  let img_full: string;
  switch (props.dest) {
    case "settings":
      img = cog;
      img_full = cog2;
      break;
    case "timeline":
      img = timeline;
      img_full = timeline2;
      break;
    case "add":
      img = add;
      img_full = add2;
      break;
    default:
      img = home;
      img_full = home2;
      break;
  }

  return (
    <Link
      to={props.dest}
      onKeyDown={(e) => {
        if (e.keyCode === 13 && props.onClick) {
          props.onClick();
        }
      }}
    >
      <img
        src={img}
        onMouseOver={(e) => (e.currentTarget.src = img_full)}
        onMouseLeave={(e) => (e.currentTarget.src = img)}
        className="NavBar-Clickable"
        alt="img"
        onClick={props.onClick}
      />
    </Link>
  );
}

export default NavButton;
