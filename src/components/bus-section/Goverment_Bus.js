import React from "react";

const Goverment_Bus = () => {
  return (
    <div className="flex bg-white justify-around">
      <div className="flex flex-col w-1/6 items-center">
        <div className="flex flex-col gap-3 items-center">
          <img
            src="https://gos3.ibcdn.com/apsrtc_logo-1649928651.png"
            alt="APSRTC" className="w-8"
          />
          <p className="-mt-4 font-medium">APSRTC</p>
        </div>
        <p>Andhra Pradesh State Road Transport Corporation</p>
      </div>
      <div className="flex flex-col w-1/6 items-center">
        <div className="flex flex-col gap-3 items-center">
          <img
            src="https://gos3.ibcdn.com/hrtc_logo-1649928862.png"
            alt="HRTC" className="w-8"
          />
          <p className="-mt-4 font-medium">HRTC</p>
        </div>
        <p>Himachal Road Transport Corporation</p>
      </div>
    </div>
  );
};

export default Goverment_Bus;
