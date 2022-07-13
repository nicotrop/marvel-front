// import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <ClipLoader color="red" size={`100px`} />
    </div>
  );
};

export default Loading;
