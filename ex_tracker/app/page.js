import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div>
        <p>Create a New User</p>
        <input placeholder="username"/>
        <button>Submit</button>
      </div>

      <div>
        <p>Add Exercises</p>
        <input placeholder=":_id"/>
        <input placeholder="description"/>
        <input placeholder="duration (mins.)"/>
        <input placeholder="date (yyyy-mm-dd)"/>
        <button>Submit</button>
      </div>
    
    </div>
  );
}
