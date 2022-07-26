import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Jobs = () => {
    const navigate = useNavigate()
    const [jobs, setJobs] = useState([])
    const id = localStorage.getItem("userId");


    const sendRequest = async () => {
        const res = await axios
            .get(`https://mern-job-hunting.herokuapp.com/api/jobs/user/jobs/${id}`).catch((err) => console.log(err))

        const data = await res.data;
        return data
    }

    useEffect(() => {
        sendRequest().then((data) => setJobs(data.user.jobs))
    }, [jobs])

    const deleteRequest = async (del_id) => {
        const res = await axios
            .delete(`https://mern-job-hunting.herokuapp.com/api/jobs/delete/${del_id}`)
            .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };
    const handleDelete = (del_id) => {
        deleteRequest(del_id)
            .then(() => navigate("/"))
    };

    return (
        <div className="container" style={{ marginTop: "100px" }}>
            <div className='d-flex gap-5'>
                <h3>All jobs</h3>
                <button className="btn btn-primary" onClick={() => navigate("/addjob")}><i className="fa fa-plus"></i> Add New</button>
            </div>

            <div className=" d-flex justify-content-center flex-wrap gap-5 mt-5 " >
                {jobs && jobs.map((job, index) => {
                    var dt = new Date(job?.date);

                    return (
                        <div className='border border-primary rounded job__container' key={index}>
                            <h3 className='job__title'>Company</h3>
                            <p className='job__subtitle'>{job?.name}</p>
                            <h3 className='job__title'>Position</h3>
                            <p className='job__subtitle'>{job?.position}</p>
                            <h3 className='job__title'>Date</h3>
                            <p className='job__subtitle'>{dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate()}</p>
                            <div>
                                <a href={job?.link} target="_blank" rel='noreferrer' className=' px-4 text-white btn btn-primary  text-decoration-none mb-2'>Link</a>
                            </div>
                            <button onClick={() => { navigate(`/updatejob/${job?._id}`) }} className='btn btn-success mt-3'>Edit</button>
                            <button onClick={() => handleDelete(job._id)} className='btn btn-warning mt-3 ms-2'>Delete</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Jobs