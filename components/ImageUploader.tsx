import { useImage } from '@/context/imageContext'
import React from 'react'

const ImageUploader = () => {

    const {setBase64Image} = useImage();

    const handleImageUpload = (event:Fi) => {
      event.preventDefault();

      const file = event.target.files[0];
      if(file) {
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