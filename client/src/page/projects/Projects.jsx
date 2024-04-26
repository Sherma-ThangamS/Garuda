import React, { useContext, useState } from 'react';
import { makeRequest } from "../../axios";
import './projects.css';
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from '../../context/authContext';

function ProjectForm() {
    const [name, setName] = useState('');
    const [desig, setDesig] = useState('');
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [fundagen, setFundagen] = useState('');
    const [stats, setStatus] = useState('');
    const [amount, setAmount] = useState('');
    const [submission, setSubmission] = useState('');
    const [duration, setDuration] = useState('');
    const [complition, setComplition] = useState('');
    const mutation = useMutation({
        mutationFn: (newProject) => {
          return makeRequest.post("/project",newProject,{withCredentials:true});
        },
        onSuccess: () => {
            console.log("Project added");
        },
      })
      const { currentUser } = useContext(AuthContext); 
      const handleSubmit = (e) => {
        e.preventDefault();
        const userId=currentUser.userid;
        mutation.mutate({ name, desig, type, title, fundagen, stats, amount, submission, duration, complition,userId })
    };

    return (
        <div className="App2">
            <h1 ><span className="head">PROJECT FORM</span></h1>
            <form className="publication-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Title of your Project</label>
                <input type="text" id="name" className="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />

                <label htmlFor="desig">Designation </label>
                <input type="text" id="desig" className="desig" placeholder="Your Designation " value={desig} onChange={(e) => setDesig(e.target.value)} />

                <label htmlFor="type">Your project type </label>
                <select id="type" className="type" value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="Funded_Project">Funded Projects</option>
                    <option value="Consultancy">Consultancy</option>
                    <option value="Industry_Project_Details">Industry Project Details</option>
                </select>

                <label htmlFor="title">Title</label>
                <input type="text" id="title" className="title" placeholder="Title of the project" value={title} onChange={(e) => setTitle(e.target.value)} />

                <label htmlFor="fundagen">Funding Agency</label>
                <input type="text" id="fundagen" className="fundagen" placeholder="Funding Agency Name" value={fundagen} onChange={(e) => setFundagen(e.target.value)} />

                <label htmlFor="stats">Status</label>
                <input type="text" id="stats" className="stats" placeholder="Status of the work" value={stats} onChange={(e) => setStatus(e.target.value)} />

                <label htmlFor="amount">Amount</label>
                <input type="text" id="amount" className="amount" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />

                <label htmlFor="submission">Date of submission</label>
                <input type="date" id="submission" className="submission" placeholder="Date of submission" value={submission} onChange={(e) => setSubmission(e.target.value)} />

                <label htmlFor="duration">Duration of the project</label>
                <input type="text" id="duration" className="duration" placeholder="Duration of the project" value={duration} onChange={(e) => setDuration(e.target.value)} />

                <label htmlFor="complition">Date of completion</label>
                <input type="date" id="complition" className="complition" placeholder="Date of completion" value={complition} onChange={(e) => setComplition(e.target.value)} />

                <button type="submit" onSubmit={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default ProjectForm;
