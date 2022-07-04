import React from "react";

import { useSpring, animated } from "react-spring";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 10,
  (x - window.innerWidth / 2) / 10,
  1,
];
const trans = (x, y, s) => `rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export default function Card(props) {
  const [p, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 },
  }));
  return (
    <div style={{ perspective: "600px" }}>
      <animated.div
        class="card"
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{ transform: p.xys.interpolate(trans) }}
      >
        {props.children}
      </animated.div>
    </div>
  );
}
