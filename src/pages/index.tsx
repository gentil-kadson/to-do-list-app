import Image from "next/image";
import styles from "@/styles/Home.module.css";
import AddTaskIcon from "/public/assets/icons/addTaskIcon.svg";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.inputContainer}>
        <input
          className={styles.searchTaskInput}
          type="text"
          name="search-task"
          id="search-task"
        />
        <button className={styles.searchButton}>
          <Image
            className={styles.searchButtonIcon}
            src={AddTaskIcon}
            width={40}
            height={40}
            alt="Search icon"
          />
        </button>
      </div>
    </main>
  );
}
