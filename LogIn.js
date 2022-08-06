import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
import './SignUp.css'
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function LogIn() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  
  const login = async () => 
  {
     try{
       const result= await signInWithEmailAndPassword(auth, email, password);
       console.log(result);
     } 
     catch (error) {
      alert(error.message);
     } handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>Log In</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}> 
        <form>
        <center>
         <img
          className="app__headerImage"
          src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
          alt=''
         />
        </center>
        <div className="signup__form">
        <Input
         placeholder="username"
         type="text"
         value={username}
         onChange={(e) => setUsername(e.target.value)}
         />
        <Input
        placeholder="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        /> <Button onClick={login}>Log In</Button>
        </div>
        </form>
        </Box>
      </Modal>
    </div>
  );
}
