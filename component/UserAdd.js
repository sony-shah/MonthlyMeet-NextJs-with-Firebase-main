import React, {useEffect, useState } from 'react'
import { useRouter } from "next/router";
import style from '../styles/Home.module.css'
import { collection, addDoc, setDoc, doc, docs, getDocs, getDoc, updateDoc, deleteDoc, query} from "firebase/firestore";
import firebaseApp from '../firebaseConfig';
import Link from "next/link";
import { getFirestore, onSnapshot } from "firebase/firestore";
import { Timestamp } from '@firebase/firestore';


const db = getFirestore();

function UserAdd() {

    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');

    const usersCollectionRef = collection(db, "MonthlyMeetData");
    const router = useRouter(); 

    

const createUser=async(event)=>{
    event.preventDefault();
    let dt = new Date().toLocaleDateString();
    let tm = new Date().toLocaleTimeString();
    //setDate(dt);
    const data={
        username:username,
        loginTime:tm,
        loginDate:dt,
    }
    console.log("User data",data);
   await addDoc(usersCollectionRef,data);
    setUsername("");
}

    useEffect(() => {
    const getContent = async () => {
      const data = await getDocs(usersCollectionRef);
      // onSnapshot(collection(db, "dewdropusers3"), (snapshot) => {
      //   console.log("Suraj", snapshot);
      //   setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // })
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id:doc.id })));
      console.log(data);
    };

    getContent();
  }, []);


  return (

    <>
        <div>
            <form>
                    <div className="input-field">
                    <input type="text" 
                        value={username}
                        onChange={( event ) => {
                        setUsername(event.target.value)}} />
                    </div>

                    <div>
                        <button 
                        type="submit"
                        onClick={createUser}>
                            Add User
                        </button>
                    </div>
            </form>
        </div>

        {/* //map the userdata */}

        {
            users && users.map(formUser=>{
                console.log(formUser);
                return(
                    <div className="formUser">

                        <p>Name: {formUser.username}</p>
                        <p>id: {formUser.id}</p>
                        
                        {/* <Link href={"/userDetails/[formid]"} as={"/userDetails/" + formUser.id}>
                        <a >link</a>
                        </Link> */}

                    </div>
                )
            })
        }{
            users?<div></div>:null
        }

    </>
    )
}

export default UserAdd
