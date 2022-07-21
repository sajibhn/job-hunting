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
            .get(`http://localhost:5000/api/jobs/user/jobs/${id}`).catch((err) => console.log(err))

        const data = await res.data;
        return data
    }

    useEffect(() => {
        sendRequest().then((data) => setJobs(data.user.jobs))
    }, [sendRequest])

    const deleteRequest = async (del_id) => {
        const res = await axios
            .delete(`http://localhost:5000/api/jobs/delete/${del_id}`)
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

            {jobs && jobs.map((job, index) => {
                return (
                    <div className=" d-flex flex-wrap gap-5 mt-5 " key={index}>
                        <div className='px-4 py-5 border border-primary rounded'>
                            <h5 className='lead'>{job?.name}</h5>
                            <h5 className='lead'>{job?.position}</h5>
                            <a href={job?.link} target="_blank" rel='noreferrer' className='d-block text-dark text-decoration-none'>Link</a>
                            <button onClick={() => { navigate(`/updatejob/${job?._id}`) }} className='btn btn-primary mt-3'>Edit</button>
                            <button onClick={() => handleDelete(job._id)} className='btn btn-warning mt-3 ms-2'>delete</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Jobs