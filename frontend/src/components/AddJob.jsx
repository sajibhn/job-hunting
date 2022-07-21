import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddJob = () => {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        name: "",
        position: "",
        link: "",
    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const sendRequest = async () => {
        const res = await axios
            .post(`http://localhost:5000/api/jobs/add`, {
                name: inputs.name,
                position: inputs.position,
                link: inputs.link,
                user: localStorage.getItem("userId")
            }).catch((err) => console.log(err))

        const data = await res.data;
        console.log(data)
        return data
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        sendRequest()
            .then((data) => navigate('/'))
    }
    return (
        <>
            <section className="vh-100" style={{ backgroundColor: "#eee" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: "25px" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                                Add A New Job
                                            </p>
                                            <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                                                <div className="d-flex flex-row align-items-center mb-4">

                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" name='name' value={inputs.name} className="form-control" onChange={handleChange} />
                                                        <label className="form-label">Company Name</label>
                                                    </div>
                                                </div>


                                                <div className="d-flex flex-row align-items-center mb-4">

                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" name='position' value={inputs.position} className="form-control" onChange={handleChange} />
                                                        <label className="form-label" >Position</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">

                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" name='link' value={inputs.link} className="form-control" onChange={handleChange} />
                                                        <label className="form-label" >Link</label>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" className="btn btn-primary btn-lg px-5">Add</button>
                                                </div>
                                            </form>
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

export default AddJob