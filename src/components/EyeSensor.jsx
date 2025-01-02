import React, { useEffect, useState } from "react";

const EyeTracking = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Update cursor position on mouse move
  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Calculate pupil movement
  const calculatePupilPosition = (eyeCenterX, eyeCenterY) => {
    const dx = cursorPosition.x - eyeCenterX;
    const dy = cursorPosition.y - eyeCenterY;
    const distance = Math.sqrt(dx ** 2 + dy ** 2);
    const maxDistance = 10; // Max distance the pupil can move
    const factor = Math.min(maxDistance / distance, 1);

    return {
      transform: `translate(${dx * factor}px, ${dy * factor}px)`,
    };
  };

  return (
    <div className="absolute top-0 left-0 flex space-x-8 p-4">
      {/* Eye 1 */}
      <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center">
        <div
          className="absolute w-12 h-12 bg-black rounded-full"
          style={calculatePupilPosition(100, 100)}
        ></div>
      </div>
      {/* Eye 2 */}
      <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center">
        <div
          className="absolute w-12 h-12 bg-black rounded-full"
          style={calculatePupilPosition(200, 100)}
        ></div>
      </div>
    </div>
  );
};

export default EyeTracking;
