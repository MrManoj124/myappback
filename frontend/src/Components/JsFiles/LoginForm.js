import { useState, useContext } from "react";
import '../CssFiles/LoginForm.css';
import { AuthContext } from "../../Context/AuthContext";
import {loginUser, googleLogin, facebookLogin} from '../../Services/Api';
import {validateEmail} from '../../Utils/Validation';
import { useNavigate } from "react-router-dom";


function LoginForm(){
  const navigate=useNavigate();
  const {login}= useContext(AuthContext);


  const [formData, setFromData]=useState({
    email:'' ,
    password:''
  });
  const [errors, setErrors]=useState({});
  const [message, setMessage] =useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const {name, value}=e.target;
    setFromData ({...formData,[name] : value});

  if(errors[name]){
    setErrors({...errors,[name]:''});
  }
};

  const validateForm = () =>{
    const newErrors ={};

    if(!formData.email){
      newErrors.email='Email is Required';
    }
    else if(!validateEmail(formData.email)){
      newErrors.email='Invalid Email Format';
    }

    if(!formData.password){
      newErrors.password='Password is Required';
    }
    else if(formData.password.length<6){
      newErrors.password='Password must be at least 6 Characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length===0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if(!validateForm()){
      return;
    }
    setLoading(true);
    try{
      const data = await loginUser(formData);
      if(data.success){
        setMessage('Login Successful!');
        login(data.user, data.token);
        setTimeout(()=>navigate('/dashboard'), 1500);
      }
      else{
        setMessage(data.message || 'Login Failed');
      }
    }
    catch(error){
      setMessage(error.message || 'Error connecting to server');
    }
    finally{
      setLoading(false);
    }
  };

  const handleGoogleLogin = async ()=>{
    try{
      setLoading(true);
      const data = await googleLogin();
      if(data.success){
        login(data.user, data.token);
        navigate('/dashboard');
      }
    }
      catch(error){
        setMessage('Google login failed');
      }
      finally{
        setLoading(false);
      }
  };

  const handleFacebookLogin = async()=>{
    try{
      setLoading(true);
      const data = await facebookLogin();
      if(data.success)
      {
        login(data.user, data.token);
        navigate('/dashboard');
      }
    }
    catch(error){
      setMessage('Facebook login failed');
    }
    finally{
      setLoading(false);
    }
  };


  return(
    <div className="auth-conatainer">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Login To your Account</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" value={formData.email}
             onChange={handleChange} className={`form-input ${errors.email ? 'input-error' : ''}`} 
             placeholder="Enter your email"/>
             {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="form-gruop">
            <label className="form-label"> Password</label>
            <input type="password" name="password" value={formData.password}
            onChange={handleChange} className={`form-input ${errors.password ? 'inout-error' : ''}` }
            placeholder="Enter your password"/>
          </div>
          {message && (
            <div className={`message ${message.includes('successful')?
              'message-success' : 'message-error'}`}>{message}</div>
          )}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Logging in...':'Login'}</button>
        </form>
        <div className="divider">
          <span>OR</span>
        </div>
        <div className="social-login">
          <button onClick={handleGoogleLogin} className="social-button google-button"  disabled={loading}>
            <svg className="social-icon" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>Continue With Google
          </button>

          <button onClick={handleFacebookLogin} className="social-button facebook-button" disabled={loading}>
             <svg className="social-icon" viewBox="0 0 24 24">
              <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>Continue With Facebook
          </button>
        </div>
        <div className="auth-footer">
          <p className="footer-text">Don't have an account?{' '}
            <button onClick={()=> navigate('/register')} className="link-button">
              Register Here
            </button>
          </p>
        </div>
        <div className="forgot-password">
          <button className="forgot-button">Forgot password ? </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;