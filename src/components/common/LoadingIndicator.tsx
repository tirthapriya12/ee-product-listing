import { Loader } from "lucide-react";

const LoadingIndicator = () => {
  return (
    <div
      data-testid="loading-icon"
      className="h-20 w-20 bg-black opacity-50 rounded-md flex justify-center items-center absolute top-[40%] left-[42%] md:left-[50%]"
    >
      <Loader className="h-15 w-10 animate-spin text-white" />
    </div>
  );
};

export default LoadingIndicator;
