"use client";

import { useEffect, useRef } from "react";
import { Game } from '../game/game';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const game = new Game(context);
    game.run();

    return () => {
                       
    };
  }, []);

  return <canvas ref={canvasRef} />;
}