// import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  // const [loadingState, setLoadingState] = useState();

  // useEffect(() => {
  //   const gifArr = [
  //     "https://media.giphy.com/media/9tZc9Mzo9K0yOYx38U/giphy.gif",
  //     "https://media.giphy.com/media/3GnKKEw2v7bXi/giphy.gif",
  //     "https://media.giphy.com/media/5cZbRBLhW4tc4/giphy.gif",
  //     "https://media.giphy.com/media/3o6QL31ZlTLXkW4NZS/giphy.gif",
  //     "https://media.giphy.com/media/j2pWZpr5RlpCodOB0d/giphy.gif",
  //   ];
  //   const random = Math.floor(Math.random() * gifArr.length);
  //   setLoadingState(gifArr[random]);
  // }, [loadingState]);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      {/* <img
        className="md:w-[75%] lg:w-[60%] max-w-[675px] object cover absolute z-0"
        src={loadingState}
        alt="marvel spinner"
      /> */}
      <ClipLoader color="red" size={`100px`} />
    </div>
  );
};

export default Loading;
