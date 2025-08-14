'use client';

import Image from "next/image";
import {FormEvent, useState} from 'react';

export default function Home() {
  const [message, setMessage] = useState();
  
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget);
    fetch('/api/submit', {method:"POST", body: formData}).then(response => response.json()).then(data => {
      setMessage(data.message)
    }).catch(console.log);
  }
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <form onSubmit={onSubmit} method="POST">
          <input type="text" name="username" />
          <input type="password" name="password" />
          <button type="submit">Submit</button>
        </form>
        {message}
      </main>
    </div>
  );
}
