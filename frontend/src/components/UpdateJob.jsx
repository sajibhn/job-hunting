import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateJob = () => {
    const [job, setJob] = useState();
    const navigate = useNavigate()
    const id = useParams().id
    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const fetchDetails = async () => {
        const res = await axios
            .get(`http://localhost:5000/api/jobs/${id}`)
            .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };
    useEffect(() => {
        fetchDetails().then((data) => {
            setJob(data.job);
            setInputs({
                name: data.job.name,
                position: data.job.position,
                link: data.job.link,
            });
        });
    }, [id]);

    const sendRequest = async () => {
        const res = await axios
            .put(`http://localhost:5000/api/jobs/update/${id}`, {
                name: inputs.name,
                position: inputs.position,
                link: inputs.link,
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
                                                Update Job
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

export default UpdateJob