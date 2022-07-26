import React from 'react'
import { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { authActions } from './store/store';
import { useNavigate } from 'react-router-dom';


const Auth = () => {
    const [isSignup, setIsSignup] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const sendRequest = async (type = "login") => {
        const res = await axios
            .post(`https://mern-job-hunting.herokuapp.com/api/user/${type}`, {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password
            }).catch((err) => console.log(err))

        const data = await res.data;
        return data
    }

    const dummyRequest = async () => {

        const res = await axios
            .post(`https://mern-job-hunting.herokuapp.com/api/user/login`, {
                name: 'test',
                email: 'test@gmail.com',
                password: '123456'
            }).catch((err) => console.log(err))

        const data = await res.data;
        return data
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (inputs.email.trim() === '' || inputs.password.trim() === '') {
            return window.alert('please fill all fields')
        } else if (inputs.password.trim().length < 6) {
            return window.alert('minimum password length is 6')
        }


        if (isSignup) {
            sendRequest("signup")
                .then((data) => localStorage.setItem("userId", data.user._id))
                .then(() => dispatch(authActions.login()))
                .then(() => navigate("/"))
                .catch((err) => window.alert('Email already exist'))
        } else {
            sendRequest()
                .then((data) => localStorage.setItem("userId", data.user._id))
                .then(() => dispatch(authActions.login()))
                .then(() => navigate("/"))
                .catch((err) => window.alert('please check your credentials'))
        }
    }

    const dummyLogin = (e) => {
        dummyRequest()
            .then((data) => localStorage.setItem("userId", "62d9a665f53261292d475f94"))
            .then(() => dispatch(authActions.login()))
            .then(() => navigate("/"))
            .catch((err) => window.alert('There was error'))
    }
    return (
        <>
            <section className="vh-100">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: "25px" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                                {isSignup ? 'Sign up' : 'Login'}
                                            </p>

                                            <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>

                                                {isSignup && <>

                                                    <div className="d-flex flex-row align-items-center mb-4">

                                                        <div className="form-outline flex-fill mb-0">
                                                            <input type="text" name='name' value={inputs.name} className="form-control" onChange={handleChange} autoComplete="off" />
                                                            <label className="form-label">Your Name: (optional)</label>
                                                        </div>
                                                    </div>

                                                </>}

                                                <div className="d-flex flex-row align-items-center mb-4">

                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="email" name='email' value={inputs.email} className="form-control" onChange={handleChange} autoComplete="off" />
                                                        <label className="form-label" >Your Email</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">

                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" name='password' value={inputs.password} className="form-control" onChange={handleChange} autoComplete="off" />
                                                        <label className="form-label" >Password</label>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" className="btn btn-primary btn-lg">Submit</button>
                                                </div>

                                            </form>
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" className="btn btn-warning btn-lg" onClick={dummyLogin}>Dummy Login</button>
                                            </div>
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button className=" btn btn-success text-white " onClick={() => setIsSignup(!isSignup)}>{!isSignup ? 'SignUp' : 'Login'}</button>
                                            </div>

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img src="/images/login.svg"
                                                className="img-fluid" alt="login signup" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Auth