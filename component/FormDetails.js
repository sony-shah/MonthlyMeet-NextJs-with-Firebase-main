import React, { useEffect, useState } from 'react'
import { collection, addDoc, setDoc, doc, docs, getDocs, getDoc, updateDoc, deleteDoc, query } from "firebase/firestore";
import firebaseApp from '../firebaseConfig';
import { getFirestore, onSnapshot } from "firebase/firestore";

const db = getFirestore();

function FormDetails() {

    const [users, setUsers] = useState([]);
  const [onecheck, setOneCheck] = useState('');
  const [twocheck, setTwoCheck] = useState('');

  const usersCollectionRef = collection(db, "MonthlyMeetData");

  const [threecheck, setThreeCheck] = useState('');

  const [fourcheck, setFourCheck] = useState([]);

  const [fivecheck, setFiveCheck] = useState('');

  const [sixcheck, setSixCheck] = useState('');

  const [UserData, setUserData] = useState([]);

  const [userId, setuserId] = useState('');
  const [error, seterror] = useState(false);
  const [formsubmit, setformsubmit] = useState(false);



    
  const CreatForm = async (event) => {
    event.preventDefault();

    const data = {
      oneAns: onecheck,
      twoAns: twocheck,
      threeAns: threecheck,
      fourAns: fourcheck,
      fiveAns: fivecheck,
      sixAns: sixcheck,

    };
    if (userId === "") {
      seterror(true)
    }
    else {
      const cityRef = doc(db, 'MonthlyMeetData', userId);
      await setDoc(cityRef, data, { merge: true });
      console.log("Form data", data);
      setformsubmit(true);
    }

    // 

    // await addDoc(usersCollectionRef, data);


    setOneCheck("");
    setTwoCheck("");
    setThreeCheck("");
    setFourCheck("");
    setFiveCheck("");
    setSixCheck("");

  }

  const onChangeCheckboxFour = (event) => {
    console.log(fourcheck);
    console.log(event.target.checked);
    const isChecked = event.target.checked;
    if (isChecked) {
      setFourCheck([...fourcheck, event.target.value]);
    } else {
      let index = fourcheck.indexOf(event.target.value);
      fourcheck.splice(index, 1);
      setFourCheck(fourcheck);
    }
  }

  const onChangeCheckboxSix = (event) => {
    console.log(sixcheck);
    console.log(event.target.checked);
    const isChecked = event.target.checked;
    if (isChecked) {
      setSixCheck([...sixcheck, event.target.value]);
    } else {
      let index = sixcheck.indexOf(event.target.value);
      sixcheck.splice(index, 1);
      setSixCheck(sixcheck);
    }
  }

  const questionOne = (event) => {
    const target = event.target;
    if (target.checked) {
      setOneCheck(target.value);
    }
  };

  const questionTwo = (event) => {
    const target = event.target;
    if (target.checked) {
      setTwoCheck(target.value);
    }
  };

  const questionThree = (event) => {
    const target = event.target;
    if (target.checked) {
      setThreeCheck(target.value);
    }
  };

  const questionFour = (event) => {
    const target = event.target;
    if (target.checked) {
      setFourCheck(target.value);
    }
  };

  const questionFive = (event) => {
    const target = event.target;
    if (target.checked) {
      setFiveCheck(target.value);
    }
  };

  const questionSix = (event) => {
    const target = event.target;
    if (target.checked) {
      setSixCheck(target.value);
    }
  };

  const getUserId = (event) => {
    const target = event.target.value;

    setuserId(target);
    seterror(false);
    console.log(userId);
  };

  useEffect(() => {
    const getContent = async () => {
      const data = await getDocs(usersCollectionRef);
      // onSnapshot(collection(db, "dewdropusers3"), (snapshot) => {
      //   console.log("Suraj", snapshot);
      //   setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // })
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data);
    };

    getContent();
  }, []);
    return (
    <>
     <div>
            
       

    </div>

          {/* map the userdata  */}
        <ul>

            {
                users && users.map(formUser=>{
                    console.log(formUser);
                    return(
                    
                        <ul className="mappage">
                            <li>
                            {/* <p>id: {formUser.id}</p> */}
                            <h2>Name: {formUser.username}</h2>
                            <h4> 1. What is the top most priority in your life? : {formUser.oneAns} </h4>
                          
                            <h4>2. According to you, people work for? :  {formUser.twoAns} </h4>
                            <h4>3. Do you believe that you can help others? :  {formUser.threeAns}</h4>
                            <h4>4. What do you prefer when it comes to helping others? :  {formUser.fourAns}</h4>
                            <h4>5. What kind of people you prefer to be with? : {formUser.fiveAns}</h4>
                            <h4>6. According to you, which of the followings are important for growth? :  {formUser.sixAns} </h4>
                            
                          
                            {/* {arr.map((x, i) => <option key={i}>{x}</option>)} */}
                           

                        
                            </li>
                        </ul>
                       
                    )
                })
            }{
                users?<div></div>:null
            }
        </ul>

    </>  
    )
}

export default FormDetails
