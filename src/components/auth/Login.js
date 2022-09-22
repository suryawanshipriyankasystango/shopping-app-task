import React, {useState} from 'react'
import './Auth.css'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {auth, fs} from "../../config/Config";
import {useHistory} from "react-router-dom";

const Login = () => {

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");


  const handleLogin = (e) => {
    e.preventDefault();
    // console.log(email,password);
    auth.signInWithEmailAndPassword(email,password).then(() => {
      setSuccessMsg('login Successfull. You will now automatically get redirected to Home');
      setEmail('');
            setPassword('');
            setErrorMsg('');
            setSuccessMsg('');

            setTimeout(()=>{
                history.push('/');
            })
    }).catch(error=>setErrorMsg(error.message));
  }

  return (
    <div className='signUpWrapper'>
      <h2>Login</h2>
      <hr></hr>
      {successMsg && <>
        <div className='success-msg'>{successMsg}</div>
        <br></br>
      </>}
      <form className='form-group' autoComplete='off' onSubmit={handleLogin}>
      <label>Email</label>
        <input type="email" className='form-control' required onChange={(e) => setEmail(e.target.value)} value={email} />
        <br></br>
        <label>Password</label>
        <input type="password" className='form-control' required onChange={(e) => setPassword(e.target.value)} value={password} />
        <br></br>
        <div className='btn-form'>
          <p><span>Don't have an account ! </span>
            <Link to="/signup" className='link'>SignUp</Link></p>
          <Button type='submit' variant="secondary">Login</Button>
        </div>
      </form>
      {errorMsg && <>
        <br></br>
        <div className='error-msg'>{errorMsg}</div>
      </>}
    </div>
  )
}

export default Login