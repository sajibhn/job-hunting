import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Jobs = () => {
    const navigate = useNavigate()
    const [jobs, setJobs] = useState([])

    const sendRequest = async () => {
        const res = await axios
            .get('http://localhost:5000/api/jobs').catch((err) => console.log(err))

        const data = await res.data;
        return data
    }

    useEffect(() => {
        sendRequest().then((data) => setJobs(data.jobs))
    }, [])


    return (
        <div className="container" style={{ marginTop: "100px" }}>
            <div className='d-flex gap-5'>
                <h3>All jobs</h3>
                <button class="btn btn-primary" onClick={() => navigate("/addjob")}><i class="fa fa-plus"></i> Add New</button>
            </div>

            {jobs && jobs.map((job, index) => {
                return (
                    <div className=" d-flex flex-wrap gap-5 mt-5 " key={index}>
                        <div className='px-4 py-5 border border-primary rounded'>
                            <h5 className='lead'>{job?.name}</h5>
                            <h5 className='lead'>{job?.position}</h5>
                            <a href={job?.link} target="_blank" rel='noreferrer' className='d-block text-dark text-decoration-none'>Link</a>
                            <button className='btn btn-primary mt-3'>Edit</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Jobs