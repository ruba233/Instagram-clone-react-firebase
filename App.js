import React, {useState, useEffect} from 'react';
import './App.css';
import ImageUpload from './ImageUpload';
import SignUp from './SignUp';
import LogIn from './LogIn';
import Post from './Post';
import { auth, db } from './firebase';
import { collection, getDocs, orderBy } from 'firebase/firestore';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import Button from '@mui/material/Button';
import { Avatar } from '@mui/material';

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");

useEffect(() => { 
   onAuthStateChanged(auth, (user) => {
  if(user) 
   { setUsername(user.displayName);
    console.log(user);
    setUser(user);
   } 
  else { setUser(null); }
}); 
}, []);

  
  //useState- short term memory storage
  //useEffect- runs a piece of code based on specific condition
  // useeffect is called whenever page renders
 useEffect(() => {
     //everytime a new post is added, this code fires
    //map is like for loop, access all docs one after other
    const getPosts = async () => {
      const data = await getDocs(collection(db, "posts"));
    setPosts(data.docs.map((doc) => ({post: doc.data(), id: doc.id })));
    orderBy('timestamp', 'desc');
    };
      getPosts();
     console.log(posts); // eslint-disable-next-line
  }, []) ;
  
  const signout = async () => {
    await signOut(auth);
    };

  return (
    <div className="App">  
      <div className="app__header">
       <center>
         <img
          className="app__headerImage"
          src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
          alt=''
         />
        </center> 
         <div >
         {
           user?.displayName?
           (  
            <div className="app__headerRight">
             <Button onClick={signout}> Sign Out </Button>
            <Avatar 
            className="app__headerAvatar"
            alt={username}
            src="/static/images/avatar/1.jpg"
            />
            </div>
           )  : 
           ( 
            <div className="buttons">
            <LogIn /> <SignUp />
            </div>
           )}
         </div>
       </div>
           { user?.displayName ?
             ( <div>
             <ImageUpload username = {user.displayName} />
              </div>  ) :
             ( <h3> Log In to Upload </h3>) 
            }  

             <div className="app__posts">
            { 
              posts.map(({ id, post}) => (      //firebase login- CLI-allow
              <Post key={id}                   //firebase init
              caption={post.caption}           // select hosting
              imageUrl={post.imageUrl}         // use existing project- select project
              username={post.username}         //build
               />                              //npm run build
               ) )                            //firebase deploy - link generated
            }                                 {/*done!!*/}
          </div>     
          </div>
  );
}
    export default App;
