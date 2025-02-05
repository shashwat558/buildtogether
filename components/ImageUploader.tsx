/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useImage } from '@/context/imageContext'
import React from 'react'

const ImageUploader = () => {
   //@ts-ignore
    const {setBase64Image} = useImage();

    const handleImageUpload = (event:React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();

      const files = event.target.files;
      if (files && files[0]) {
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend =() => {
          setBase64Image(reader.result);

        };
        reader.readAsDataURL(file)
      }
    }


     
  return (
    <div>
      <input type="file" name="" accept='image/*' onChange={handleImageUpload} id="" />
    </div>
  )
}

export default ImageUploader