"use client"

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:7003');

    ws.onopen = () => ("Hello, World")
    ws.onmessage = (event) => {
      console.log(event)
    }

    return () => {
      ws.close();
    }
  }, [])

  return (
    <></>
  );
}
