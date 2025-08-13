import { useEffect, useState } from "react";

interface RainDrop {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  opacity: number;
}

const LogoRain = () => {
  const [rainDrops, setRainDrops] = useState<RainDrop[]>([]);

  useEffect(() => {
    // Create 25 logo rain drops
    const drops: RainDrop[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // Random position across screen width
      animationDuration: Math.random() * 3 + 4, // 4-7 seconds fall time
      animationDelay: Math.random() * 5, // 0-5 seconds delay
      size: Math.random() * 30 + 20, // 20-50px size
      opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4 opacity
    }));

    setRainDrops(drops);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {rainDrops.map((drop) => (
        <div
          key={drop.id}
          className="absolute animate-fade-in"
          style={{
            left: `${drop.left}%`,
            top: "-100px",
            animationName: "logoFall",
            animationDuration: `${drop.animationDuration}s`,
            animationDelay: `${drop.animationDelay}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
          }}
        >
          <img
            src="/lovable-uploads/fa8c1598-094b-41c9-94da-4e5dff4aecfe.png"
            alt="PECALI Logo Rain"
            style={{
              width: `${drop.size}px`,
              height: "auto",
              filter: "brightness(0.8) contrast(1.2)",
              transform: `rotate(${Math.random() * 20 - 10}deg)`,
              opacity: drop.opacity,
            }}
            className="hover:scale-110 transition-transform duration-200"
          />
        </div>
      ))}
    </div>
  );
};

export default LogoRain;