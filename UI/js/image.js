const CLOUDINARY_URL = ' https://api.cloudinary.com/v1_1/dlbchxlt0/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'jxyqpoom';
const upload = document.querySelector('.image');

upload.addEventListener('change', (event) => {
   let file = event.target.files[0];
   let formData = new FormData();
   formData.append('file', file);
   formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

   axios({
       url: CLOUDINARY_URL,
       method: 'POST',
       headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
       },
       data: formData
   }).then((res)=>{
    console.log(res)
    const pictureUrl = res.data.secure_url;
    
    localStorage.setItem("imageurl", pictureUrl);
   }).catch((err)=>{
     console.log(err);
   });
   
});