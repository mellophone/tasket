import Image from "next/image";
import Centered from "../Centered";
import "./LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <Centered>
      <div className="loading-area">
        <Image
          src="/favicon.ico"
          width={40}
          height={40}
          alt={"Tasket Logo"}
        ></Image>
        <span className="large-text">Loading...</span>
      </div>
    </Centered>
  );
};

export default LoadingScreen;
