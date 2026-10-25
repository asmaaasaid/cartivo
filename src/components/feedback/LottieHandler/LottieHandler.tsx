import { Lottie } from "lottie-react";
import notFound from "@assets/lottieFiles/notFound.json";
import cartEmptyState from "@assets/lottieFiles/cartEmptyState.json";
import cartLoadingState from "@assets/lottieFiles/cartLoadingState.json";
import errorAnimation from "@assets/lottieFiles/errorAnimation.json";
import loading from "@assets/lottieFiles/loading.json";

const lottieFilesMap = {
  notFound,
  cartEmptyState,
  cartLoadingState,
  errorAnimation,
  loading
};

type lottieHandlerProps = {
  type: keyof typeof lottieFilesMap;
  message?: string;
};
const LottieHandler = ({ type, message }: lottieHandlerProps) => {
  const lottie = lottieFilesMap[type];
  const messageStyle = type == "errorAnimation" ? {fontSize: "19px", color: '#F7323F'} : {fontSize: "19px"}
  return (
    <div className="d-flex my-5 justify-content-center align-items-center flex-column">
      <Lottie
        src={lottie}
        autoplay
        loop
        style={{ width: "300px"}}
      />
      {message && <h3 style={messageStyle} className="text-capitalize">{message}</h3>}
    </div>
  );
};

export default LottieHandler;
