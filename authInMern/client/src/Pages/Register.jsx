import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import AnimatedPage from '../Animations/AnimatedPage';
import { useEffect, useState } from 'react';
import AnimatedText from '../Animations/AnimatedText';


function Register() {
  const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

  return (
    <AnimatedPage>
    <div className="register-container" >
      
      {/* LEFT CONTAINER */}
      <div className="left-1">
        <AnimatedText><section className="copy">
          <h1>Welcome to <span>M-Care</span></h1>
          <p>All your Health tools in One Place</p>
        </section>
        </AnimatedText>
      </div>


        {/* RIGHT CONtAINER */}
      <div className="right-1">
        
        {/* FORM */}
        <AnimatedText>
        <form action='#' onSubmit={handleSubmit}>
          <section className="copy">
            <h2>Register</h2>
              <p>
                Already have an account?{" "}
              <Routes>
                <Route path='/Login' element={<Login />} />
              </Routes>
              <a href="./Login">
                  <strong>Login</strong>
                </a>
              </p>
          </section>
          <div className="input-container-name">
            <label htmlFor="fname">First Name</label>
            <input id="fname" name="firstName" onChange={handleChange} value={data.firstName} required type="text" placeholder='Enter Last Name'/>
          </div>
          <div className="input-container-name">
            <label htmlFor="fname">Last Name</label>
            <input id="fname" name="lastName" type="text" placeholder='Enter Last Name' onChange={handleChange} value={data.lastName} required/>
          </div>
          

          <div className="input-container-adhar">
            <label htmlFor="fadhar">Aadhar Number</label>
            <input id="fadhaar" name="email" type="email" placeholder='Enter Email Address' onChange={handleChange} value={data.email} required/>
          </div>
          
          <div className="input-container-password">
            <label htmlFor="fpass">Password</label>
            <input id="fpass" name="password" type="password" placeholder='Enter Password' onChange={handleChange} value={data.password} required/>
          </div>
          {error && <div className='error_msg'>{error}</div>}

          <button className="reg-btn" type="submit">
            Register
          </button>

          <section className="copy-legal">
            <p className="small">
              <span className="small">
                By continuing, you agree to accept our <br />{" "}
                <a href="#">Privacy Policy</a> &amp;{" "}
                <a href="#">Terms of Service</a>.
              </span>
            </p>
          </section>
        </form>
        </AnimatedText>
      </div>


    </div>
    </AnimatedPage>
  );
}

export default Register;
