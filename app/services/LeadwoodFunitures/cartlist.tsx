import React from 'react'
import { useState } from 'react';
const Cartlist = () => {
 const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };
  if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

   return (
    <div className="fixed  w-screen h-dvh bg-black text-white flex justify-center items-center z-70">
      <p>Here am the exorection</p>
    </div>
  );
}

export default Cartlist