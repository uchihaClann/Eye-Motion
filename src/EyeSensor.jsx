import React, { useEffect, useState } from "react";

const EyeTracking = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Update cursor position on mouse move
  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calculate pupil movement
  const calculatePupilPosition = (eyeCenterX, eyeCenterY) => {
    const dx = cursorPosition.x - eyeCenterX;
    const dy = cursorPosition.y - eyeCenterY;
    const distance = Math.sqrt(dx ** 2 + dy ** 2);
    const maxDistance = 20; // Max distance the pupil can move
    const factor = Math.min(maxDistance / distance, 1);

    return {
      transform: `translate(${dx * factor}px, ${dy * factor}px)`,
    };
  };

  return (
    <div className="wrapper relative flex items-center justify-center h-screen bg-gray-900">
      <div className="flex space-x-8">
        {/* Eye 1 */}
        <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center">
          <div
            className="absolute w-12 h-12 bg-black rounded-full"
            style={calculatePupilPosition(windowSize.width / 2 - 50, windowSize.height / 2)}
          ></div>
        </div>
        {/* Eye 2 */}
        <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center">
          <div
            className="absolute w-12 h-12 bg-black rounded-full"
            style={calculatePupilPosition(windowSize.width / 2 + 50, windowSize.height / 2)}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default EyeTracking;
