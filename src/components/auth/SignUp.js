import React, {useState} from 'react'
import './Auth.css'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {auth, fs} from "../../config/Config";
import {useHistory} from "react-router-dom";


const SignUp = () => {

  const history = useHistory();

  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSignup=(e)=>{
    e.preventDefault();
    // console.log(fullName, email, password);
    auth.createUserWithEmailAndPassword(email,password).then((credentials)=>{
        console.log("credentials",credentials);
        fs.collection('users').doc(credentials.user.uid).set({
            FullName: fullName,
            Email: email,
            Password: password
        }).then(()=>{
            setSuccessMsg('Signup Successfull. You will now automatically get redirected to Login');
            setFullname('');
            setEmail('');
            setPassword('');
            setErrorMsg('');

            setTimeout(()=>{
                setSuccessMsg('');
                history.push('/login');
            },3000)
        }).catch(error=>setErrorMsg(error.message));
    }).catch((error)=>{
        setErrorMsg(error.message)
    })
}

  return (
    <div className='signUpWrapper'>
      <h2>SignUp</h2>
      <hr></hr>
      {successMsg && <>
        <div className='success-msg'>{successMsg}</div>
        <br></br>
      </>}
      <form className='form-group' autoComplete='off' onSubmit={handleSignup}>
        <label>Full Name</label>
        <input type="text" className='form-control' required onChange={(e) => setFullname(e.target.value)} value={fullName} />
        <br></br>
        <label>Email</label>
        <input type="email" className='form-control' required onChange={(e) => setEmail(e.target.value)} value={email} />
        <br></br>
        <label>Password</label>
        <input type="password" className='form-control' required onChange={(e) => setPassword(e.target.value)} value={password} />
        <br></br>
        <div className='btn-form'>
          <p><span>Already have an account ! </span>
          <Link to="/login" className='link'>Login</Link></p>
          <Button type='submit' variant="secondary">SIGNUP</Button>
        </div>
      </form>
      {errorMsg && <>
        <br></br>
        <div className='error-msg'>{errorMsg}</div>
      </>}
    </div>
  )
}

export default SignUp