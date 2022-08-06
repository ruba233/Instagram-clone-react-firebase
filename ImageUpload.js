import React, {useState, useEffect} from 'react';
import { db, storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@mui/material';

const ImageUpload = ({username}) => {
    const [imageUpload, setImageUpload] = useState(null);
    // eslint-disable-next-line
    const [imageUrls, setImageUrls] = useState([]);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState("");
    const imageListRef = ref(storage, "images/");

    const newPosts = async (url) => {
      await addDoc(collection(db, "posts"), {
        caption: caption,
        imageUrl: url,
        username: username,
        timestamp: serverTimestamp()
      });
    };
    const uploadImage = () => {
     if (imageUpload == null) return;
     const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
     
     uploadBytes(imageRef, imageUpload).then((snapshot) => //image upload
      { const progress = Math.floor( (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      getDownloadURL(snapshot.ref).then((url) => 
       { newPosts(url);
        setImageUrls((prev) => [...prev, url]);// display at website
       })
  }) };

     useEffect(() => { // add image to storage
     // eslint-disable-next-line 
        listAll(imageListRef).then((response) => { // reference of images
          response.items.forEach((item) => {  //loop through all items
            getDownloadURL(item).then((url) => {  // get urls
              setImageUrls((prev) => [...prev, url]); // add urls to image list
      }); 
          }); // eslint-disable-next-line
        });  
      }, [] ) ;
 
  return (
    <div className="imageupload">
        <progress className="progressBar" value={progress} max="100" />
        <input 
        placeholder= "Enter caption" value={caption} 
        onChange={(e) => setCaption(e.target.value)}
        />
        <input
        type="file"
        onChange={(e) => {
          setImageUpload(e.target.files[0]);
        }}
        />
   
   <Button className="imageupload__button" onClick={uploadImage}> Upload Image</Button>
      </div>
  );
}

export default ImageUpload;