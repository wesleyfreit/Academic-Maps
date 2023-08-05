import React from 'react'

export default function ViewLoader() {
  return (
    <div id="loading" className="w-screen h-screen flex items-center justify-center gap-3 flex-col">
        <div id='loader'></div>
      <h1 className="text-white">Carregando...</h1>
    </div>
  );
}
