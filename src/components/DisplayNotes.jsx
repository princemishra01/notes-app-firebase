import { useState} from 'react';
import {v4 as uuid} from 'uuid';
import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth , app } from '../backend/firebase';
import {  signOut } from "firebase/auth";
import { getFirestore , collection , addDoc , query , where , getDocs , deleteDoc , doc } from 'firebase/firestore';
// import { faCommentDollar } from '@fortawesome/free-solid-svg-icons';
import Login from './Login';
import SignUp from './SignUp';


const firestore = getFirestore(app);
const x = window.localStorage.getItem("isUserLoggedIn");

const DisplayNotes = () => {
  
    const [loggedIn,setLoggedIn] = useState(x);
    const [showSignUp,setShowSignUp] = useState(false);
    const [user] = useAuthState(auth);
    const getDocByQuery = async () => {
      // console.log(user);
      const q = query(collection(firestore , 'notes' ) , where('userId' , '==' , user.uid));
      const snapshot = await getDocs(q);
      const newArrayOfNotes = snapshot.docs.map((doc) => doc.data());
      // snapshot.forEach(data => newArrayOfNotes.push(data.data()));
      setNoteArray(noteArray => newArrayOfNotes);

    }

    function checkCondition(getDocByQuery) {
      if (user != null) {
        getDocByQuery();
      } else {
        setTimeout(function() {
          checkCondition(getDocByQuery);
        }, 100); // Retry after 1 second
      }
    }

    checkCondition(getDocByQuery);

    const [noteArray, setNoteArray] = useState([]);

    const handleLogOut = (e) => {
        e.preventDefault();
        signOut(auth).then(() => {
          window.localStorage.removeItem("isUserLoggedIn");
          setLoggedIn(false);
        });
    }

    const handleAddNote = (e) => {
        e.preventDefault();
        const newNote = {
          id: uuid(),
          userId : user.uid ,
          title: document.querySelector("input").value ,
          body: document.querySelector("textarea").value  
        }
        // console.log(noteArray);

        addDoc(collection(firestore , 'notes' ) , newNote);

        getDocByQuery();
        // setNoteArray([...noteArray, newNote]);
        document.querySelector("input").value = ""; 
        document.querySelector("textarea").value = ""; 
    }

    const handleEdit = async (e) => {
        const noteId = e.target.parentNode.parentNode.parentNode.id;
        //
        const noteToEdit = noteArray.filter((note) => note.id === noteId);
        const q = query(collection(firestore , 'notes' ) , where('id' , '==' , noteId));
        const snapshot = await getDocs(q);

        let x = "";

        snapshot.forEach((doc) => {
          x = doc.ref.id;
        })
        // console.log(x);
        await deleteDoc(doc( firestore , "notes", x));
        getDocByQuery();
        //
        document.querySelector("input").value = noteToEdit[0].title; 
        document.querySelector("textarea").value = noteToEdit[0].body; 
        // setNoteArray(noteArray => noteArray.filter((note) => note.id !== noteId));
    }

    const handleDelete = async (e) => {
        const noteId = e.target.parentNode.parentNode.parentNode.id;
        // setNoteArray(noteArray.filter((note) => note.id !== noteId));
        const q = query(collection(firestore , 'notes' ) , where('id' , '==' , noteId));
        const snapshot = await getDocs(q);

        let x = "";

        snapshot.forEach((doc) => {
          x = doc.ref.id;
        })
        // console.log(x);
        await deleteDoc(doc( firestore , "notes", x));
        getDocByQuery();
    }

    return (

        loggedIn ? <>
        <div className="container">
        <div className="make-note">
          <div className = "top-title">
            <h1 >
              Make a Note
            </h1>
            <button className='btn-log-out' onClick={handleLogOut} >Log Out</button>
          </div>
          <input type="text" placeholder = "Give Title of Your Note" />
          <textarea placeholder ="Write Note" name="" id="" cols="30" rows="10"></textarea>
          <button onClick={handleAddNote}>Add Note</button>
        </div>

        <div className="display-notes">

          {
            noteArray.map((note) => {
                return (
                  <div key = {note.id} id = {note.id} className="note">
                    <div className="note-head">
                      <div className='note-title'>
                        <h2>{note.title}</h2>
                      </div>
                      <div className="note-icons">
                        <i onClick = {handleEdit} className = "btn-edit fa-solid fa-pen-to-square"></i>
                        <i onClick = {handleDelete} className = "btn-delete fa-solid fa-trash"></i>
                      </div>
                    </div>
                  <hr />
                  <p>{note.body}</p>
                </div>
                )
            })
          }

        </div>
      </div>
      </> 
      : showSignUp ? <SignUp loggedIn = {loggedIn} setLoggedIn = {setLoggedIn} showSignUp = {showSignUp} setShowSignUp = {setShowSignUp}/> 
      : <Login loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}  showSignUp = {showSignUp} setShowSignUp = {setShowSignUp}/>
  )
}

export default DisplayNotes