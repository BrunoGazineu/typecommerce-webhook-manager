"use client"

import { useEffect } from "react";

import io from 'socket.io-client'

export default function Home() {
  useEffect(() => {
    const socket = io('http://localhost:7003');

    socket.on('connect', () => {
      console.log("Conectado ao servidor");
    })

    socket.on('disconnect', () => {
      console.log("Desconectado do servidor websocket");
    })

    socket.on('message', (data) => {
      console.log("Mensagem recebida do servidor:", data)
    })

    socket.on('webhook_log_3', (data) => {
      console.log("boom")
      console.log(data)
    })

    return () => {
      socket.disconnect();
    }
  }, [])

  return (
    <></>
  );
}
