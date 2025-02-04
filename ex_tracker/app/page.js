"use client"
import { useState } from "react";
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";

export default function Home() {

  const router = useRouter();
  const [username, SetUsername] = useState("");
  const [id, SetId] = useState("");
  const [desc, SetDesc] = useState("");
  const [duration, SetDuration] = useState(0);
  const [currDate, SetCurrDate] = useState("");



  const changeId = (e) => {
    SetId(e.target.value);
    console.log(id);
  }

  const changeDesc = (e) => {
    SetDesc(e.target.value);
  }

  const changeDuration = (e) => {
    SetDuration(e.target.value);
  } 

  const changeDate = (e) => {
    let newDate = new Date(e.target.value).toISOString().split('T')[0];
    SetCurrDate(newDate);
  }

  const changeUsername = (e) => {
    SetUsername(e.target.value);
  }

  const handleNewUser = (e) => {
    e.preventDefault();

    fetch("/api/users", {
      method: 'POST',
      body: JSON.stringify({username: username}),
    }).then((response) => {
      if(response.status == 200){
        alert(`User : ${username} created`);
      }

      if(response.status == 404){
        alert(`Username : ${username} already exists`);
      }

      if(response.status == 500){
        alert(`Something went wrong on our end! Check back in a few`);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleNewExercise = (e) => {
    e.preventDefault();

    fetch(`/api/users/${id}/exercises`, {
      method: "POST",
      body: JSON.stringify({
          description: desc,
          duration: duration,
          date: currDate 
      })
    }).then((response) => {
      console.log(response);
      if(response.status == 200) {
        alert("Exercise added");
      }

      if(response.status == 404) {
        alert("User not found");
      }

      if(response.status == 400){
        alert("Invalid User ID format");
      }

      if(response.status == 500) {
        alert("Something went wrong on our end! Check back in a few");
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  

  return (
    <div className={styles.page}>
      <form onSubmit={handleNewUser} method="POST">
        <p>Create a New User</p>
        <input  type="text" id="username" placeholder="username" value={username} onChange={changeUsername}/>
        <button type="submit">Submit</button>
      </form>

      <form onSubmit={handleNewExercise} method="POST">
        <p>Add Exercises</p>
        <input required placeholder=":_id" value={id} onChange={changeId}/>
        <input required placeholder="description" value={desc} onChange={changeDesc}/>
        <input required placeholder="duration (mins.)" type="number" value={duration} onChange={changeDuration}/>
        <input placeholder="date (yyyy-mm-dd)" type="date" value={currDate} onChange={changeDate}/>
        <button type="submit">Submit</button>
      </form>
    
    </div>
  );
}
