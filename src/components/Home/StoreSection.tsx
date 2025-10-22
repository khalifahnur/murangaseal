"use client";
import React, { useState } from "react";

export default function StoreSection() {
  const [activeKit, setActiveKit] = useState<"HOME" | "AWAY" | "THIRD KIT">(
    "HOME"
  );
  const [currentView, setCurrentView] = useState<"front" | "back">("front");

  const images = {
    HOME: {
      front:
        "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1760364825/Front-Kit-for-Web_zxqu5v.png",
      back: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1760364825/home-kit-back_fbhftk.png",
    },
    AWAY: {
      front:
        "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1760364825/Away-Front-Kit-for-Web_et0sf4.png",
      back: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1760364824/Awaykit-Back_jvabwc.png",
    },
    "THIRD KIT": {
      front:
        "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1758045309/img176_y5fkob.jpg",
      back: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1758045309/img176_y5fkob.jpg", // Replace with actual back image URL
    },
  };

  const backgroundTexts = {
    HOME: "Home",
    AWAY: "Away",
    "THIRD KIT": "Third",
  };

  const handleKitChange = (kitType: "HOME" | "AWAY" | "THIRD KIT") => {
    setActiveKit(kitType);
  };

  const toggleView = () => {
    setCurrentView(currentView === "front" ? "back" : "front");
  };

  const getButtonClass = (kitType: "HOME" | "AWAY" | "THIRD KIT") => {
    const baseClass =
      "text-1.5xl xl:text-4xl px-5 xl:px-8.5 py-5 xl:py-7 whitespace-nowrap border-transparent focus:border-transparent focus:ring-0 relative grid place-content-center uppercase font-national leading-none duration-300 ease-in-out inline-block text-center w-full";

    if (activeKit === kitType) {
      return `${baseClass} bg-gray-900 text-primary`;
    } else {
      return `${baseClass} bg-tertiary hover:bg-secondary hover:text-tertiary text-black-900`;
    }
  };

  return (
    <div className="overflow-hidden mozillaheadline" id="shop">
      <section className="bg-mono-300 uppercase">
        <div className="relative overflow-hidden">
          <div className="hidden md:flex justify-center z-0 absolute w-full top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            <p className="text-[45vw] 3xl:text-[32vw] text-primary opacity-10">
              {backgroundTexts[activeKit]}
            </p>
          </div>

          <div className="z-10 flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 flex flex-col justify-center items-center">
              <div className="text-center md:text-left">
                <p className="text-tertiary text-xl"></p>
              </div>
            </div>

            {/* Jersey Image Section */}
            <div className="z-10 relative w-full md:w-1/3 px-10 py-2 md:p-0">
              <div className="flex md:hidden justify-center absolute z-0 w-full top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                <p className="text-[90vw] text-primary leading-none opacity-10">
                  {backgroundTexts[activeKit]}
                </p>
              </div>

              <div className="relative z-10">
                <figure
                  className="with-ratio relative overflow-hidden group"
                  style={{ paddingBottom: "100%" }}
                >
                  <img
                    className="absolute top-0 left-0 object-contain w-full h-full lazyautosizes lazyloaded transition-opacity duration-300"
                    alt={`${activeKit}-${currentView}-Shirt`}
                    height="520"
                    src={images[activeKit][currentView]}
                  />

                  <button
                    onClick={toggleView}
                    className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-900 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 group-hover:opacity-100 opacity-90"
                    title={`View ${
                      currentView === "front" ? "back" : "front"
                    } of jersey`}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {currentView === "front" ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 17H4m0 0l4-4m-4 4l4 4m12-8H4m0 0l4-4m-4 4l4 4"
                        />
                      )}
                    </svg>
                  </button>
                </figure>
              </div>
            </div>

            <div className="md:w-1/3 self-center">
              <div className="flex flex-row md:flex-col items-center justify-center gap-1 md:gap-2">
                <div className="md:max-w-[116px]">
                  <button
                    type="button"
                    className={getButtonClass("HOME")}
                    onClick={() => handleKitChange("HOME")}
                  >
                    HOME
                  </button>
                </div>
                <div className="md:max-w-[116px]">
                  <button
                    type="button"
                    className={getButtonClass("AWAY")}
                    onClick={() => handleKitChange("AWAY")}
                  >
                    AWAY
                  </button>
                </div>
                <div className="md:max-w-[116px]">
                  <button
                    type="button"
                    className={getButtonClass("THIRD KIT")}
                    onClick={() => handleKitChange("THIRD KIT")}
                  >
                    THIRD KIT
                  </button>
                </div>
              </div>

              <a
                href="https://murangaseal.co.ke/shop"
                rel="noopener noreferrer"
                target="_blank"
                className="uppercase font-national leading-[75%] before:duration-500  gap-4 bg-secondary text-tertiary false button relative overflow-hidden whitespace-nowrap border-transparent focus:border-transparent focus:ring-0 inline-grid grid-flow-col items-center place-content-center cursor-pointer hover:bg-gray-500 hover:text-primary md:hidden w-full z-10 h4-national mt-2 px-6 py-2"
              >
                <span className="text-1.5xl text-center font-bold bg-linear-to-r from-primary/50 via-gray-900 to-primary/50 bg-clip-text text-transparent">
                  VISIT MSEAL STORE
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Personalize Button */}
        <div className="hidden md:flex mt-1 md:mt-4 w-full justify-center ">
          <a
            href="https://murangaseal.co.ke/shop"
            rel="noopener noreferrer"
            target="_blank"
            className="uppercase font-national leading-[75%] text-5xl before:duration-500 px-8 py-4 gap-4 bg-primary/10 text-tertiary false button relative overflow-hidden z-0 whitespace-nowrap border-transparent focus:border-transparent focus:ring-0 inline-grid grid-flow-col items-center place-content-center cursor-pointer hover:before:!scale-[3.5] hover:before:!-translate-x-1/2 z-10 h4-national md:px-12 md:py-7"
          >
            <span className="text-1.5xl text-center font-bold bg-linear-to-r from-primary via-gray-900 to-primary bg-clip-text text-transparent">
              VISIT MSEAL STORE
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}
