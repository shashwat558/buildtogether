"use client"

import React from 'react'
import { Bounce, ToastContainer } from "react-toastify";
const toastNotification = () => {
  return (
    <div>
        <ToastContainer
         position="top-right"
         autoClose={5000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick={false}
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="dark"
         transition={Bounce}
/>
    </div>
  )
}

export default toastNotification