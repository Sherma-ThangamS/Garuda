import React, { useContext, useState } from 'react';
import { makeRequest } from "../../axios";
import './patent.css'; 
import { useMutation, useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../context/authContext';

function PatentForm() {
    const [title, setTitle] = useState('');
    const [appnum, setAppNum] = useState('');
    const [invtname, setInvtName] = useState('');
    const [patent, setPatent] = useState('');
    const [status, setStatus] = useState('');
    const [applied, setApplied] = useState('');
    const [published, setPublished] = useState('');
    const [granted, setGranted] = useState('');
    const [applicant, setApplicant] = useState('');
    const [submitRes,setSubmitRes]=useState("");
    const [file, setFile] = useState(null);
    const setNull=()=>{
        setAppNum("");
        setApplicant("");
        setApplied("")
        setGranted("");
        setInvtName("")
        setPatent("");
        setPublished("");
        setStatus("");
        setTitle("");
        setFile(null);
    }
    const mutation = useMutation({
        mutationFn: (newPatent) => {
          return makeRequest.post("/patent",newPatent,{withCredentials:true});
        },
        onSuccess: () => {
            setSubmitRes("Data is added successfully!");
        },
      })
      const upload=async()=>{
        try{
          const formData=new FormData();
          formData.append('file',file)
          const res = await makeRequest.post("/upload",formData)
          return res.data
        }
        catch(err){
          console.log(err)
        }
      }
      const { currentUser } = useContext(AuthContext); 
      const handleSubmit = async(e) => {
        e.preventDefault();
        const userId=currentUser.userid;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("appnum", appnum);
        formData.append("applicant",applicant)
        formData.append("invtname",invtname)
        formData.append("patent",patent)
        formData.append("status",status)
        formData.append("applied",applied)
        formData.append("published",published)
        formData.append("granted",granted)
        formData.append("userId",userId)
        mutation.mutate(formData)
        setNull();
    }; 

    return (
        <div className="patent">
            <h1 className="head">Patent Form</h1>
            <form className="publication-form" onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" className="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

                <label htmlFor="invtname">Name Of The Applicant</label>
                <input type="text" id="appname" className="appname" placeholder="Name of the Applicant" value={applicant} onChange={(e) => setApplicant(e.target.value)} />

                <label htmlFor="invtname">Name Of The Inventors</label>
                <input type="text" id="invtname" className="invtname" placeholder="Name of the inventors" value={invtname} onChange={(e) => setInvtName(e.target.value)} />

                <label htmlFor="appnum">Application Number</label>
                <input type="text" id="appnum" className="appnum" placeholder="Application Number" value={appnum} onChange={(e) => setAppNum(e.target.value)} />

                <label htmlFor="patent">Type Of Your Patent</label>
                <select id="patent" className="patent" value={patent} onChange={(e) => setPatent(e.target.value)}>
                    <option value="">Type of your patent</option>
                    <option value="Design">Design</option>
                    <option value="Invention">Invention</option>
                </select>

                <label htmlFor="status">Status of your patent</label>
                <select id="status" className="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">What's your status</option>
                    <option value="Granted">Granted</option>
                    <option value="Filed">Filed</option>
                    <option value="Published">Published</option>
                </select>

                <label htmlFor="applied">Date of application</label>
                <input type="date" id="applied" className="applied" placeholder="Date of application" value={applied} onChange={(e) => setApplied(e.target.value)} />

                <label htmlFor="published">Date of publication</label>
                <input type="date" id="published" className="published" placeholder="Date of publication" value={published} onChange={(e) => setPublished(e.target.value)} />

                <label htmlFor="granted">Date of granted</label>             
                <input type="date" id="granted" className="granted" placeholder="Date of granted" value={granted} onChange={(e) => setGranted(e.target.value)} />

                <label htmlFor="file">Upload File</label>
                <input type="file" id="file" accept="application/pdf" onChange={(e) => {setFile(e.target.files[0]); }}/>
                {submitRes && submitRes}
                <button type="submit" onSubmit={()=>handleSubmit()}>Submit</button>
            </form>
            
        </div>
    );
}

export default PatentForm;
