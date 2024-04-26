import React, { useContext, useState } from 'react';
import './publications.css'; 
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from '../../context/authContext';
import { makeRequest } from '../../axios';


function PublicationForm() {
    const [author, setAuthor] = useState('');
    const [dept, setDept] = useState('');
    const [title, setTitle] = useState('');
    const [journal, setJournal] = useState('');
    const [date, setDate] = useState('');
    const [ISSN, setISSN] = useState('');
    const [err,setErr]=useState();
    const mutation = useMutation({
      mutationFn: (newPublication) => {
        return makeRequest.post("/publication",newPublication,{withCredentials:true});
      },
      onSuccess: () => {
          setErr("Publication is added successfully")
      },
    })
    const { currentUser } = useContext(AuthContext); 
    const handleSubmit = (e) => {
      e.preventDefault();
      const userId=currentUser.userid;
      mutation.mutate({ author, dept, title, journal, date, ISSN ,userId})
  };
  
    return (
      <div className="App3">
        <h1 className="head">Publication Form</h1>
        <form className="publication-form" onSubmit={handleSubmit}>
          <label htmlFor="author">Name of the Author</label>
          <input type="text" id="author" className="author" placeholder="Name of the Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
  
          <label htmlFor="dept">Department of the Author</label>
          <input type="text" id="dept" className="dept" placeholder="Department" value={dept} onChange={(e) => setDept(e.target.value)} />
  
          <label htmlFor="title">Title of the Paper</label>
          <input type="text" id="title" className="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
  
          <label htmlFor="journal">Name of the Journal</label>
          <input type="text" id="journal" className="journal" placeholder="Journal" value={journal} onChange={(e) => setJournal(e.target.value)} />
  
          <label htmlFor="date">Month and Year of publication</label>
          <input type="date" id="date" className="date" value={date} onChange={(e) => setDate(e.target.value)} />
  
          <label htmlFor="ISSN">ISSN</label>
          <input type="text" id="ISSN" className="ISSN" placeholder="Enter the ISSN" value={ISSN} onChange={(e) => setISSN(e.target.value)} />
          {err && err}<br/>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  
  export default PublicationForm;
  