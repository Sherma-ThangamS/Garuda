import React, { useState } from 'react';
import './journal.scss'; 


function Journal() {
    const [author, setAuthor] = useState('');
    const [dept, setDept] = useState('');
    const [title, setTitle] = useState('');
    const [journal, setJournal] = useState('');
    const [date, setDate] = useState('');
    const [ISSN, setISSN] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted:', { author, dept, title, journal, date, ISSN });
    }; 
  
    return (
      <div className="journal">
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
  
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  
  export default Journal;
  