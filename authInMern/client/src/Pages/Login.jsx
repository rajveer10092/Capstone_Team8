import { Route, Routes } from 'react-router-dom';
import Register from './Register';
import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import AnimatedPage from '../Animations/AnimatedPage';
import AnimatedText from '../Animations/AnimatedText';


function Login() {
  const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
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
    <div className="login-container">
      <div className="left">
      <AnimatedText>
      <form  onSubmit={handleSubmit}>
          <section className="copy">
            <h2>Login</h2>
              <p>
                Don't have an account?{" "}
                <Routes>
                <Route path='/Register' element={<Register />} />
                </Routes>
                <a href="./Register">
                  <strong>Register</strong>
                </a>
              </p>
          </section>
          {/* <div className="input-container-name">
            <label htmlFor="fname">Full Name</label>
            <input id="fname" name="fname" type="text" />
          </div> */}

          <div className="input-container-adhar">
            <label htmlFor="fadhar">Email Address</label>
            <input id="fadhaar" name="email" type="email" placeholder='Enter Email Address' onChange={handleChange} value={data.email} required />
          </div>

          <div className="input-container-password">
            <label htmlFor="fpass">Password</label>
            <input id="fpass" name="password" type="password" placeholder='Enter Password' onChange={handleChange} value={data.password} required />
          </div>

          {error && <div className='error_msg'>{error}</div>}

          <button className="reg-btn" type="submit">
            Login
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

      <div className="right">
        <AnimatedText><section className="copy">
          <h1>Welcome to M-Care</h1>
          <p>All your Health tools in One Place</p>
        </section>
        </AnimatedText>
      </div>

    </div>
    </AnimatedPage>
  );
}

export default Login;
