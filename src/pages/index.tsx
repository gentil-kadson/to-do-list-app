import Image from "next/image";
import styles from "@/styles/Home.module.css";
import AddTaskIcon from "/public/assets/icons/addTaskIcon.svg";
import Link from "next/link";
import Task from "@/components/Task";

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
        <Link href="/add-task">
          <button className={styles.searchButton}>
            <Image
              className={styles.searchButtonIcon}
              src={AddTaskIcon}
              width={40}
              height={40}
              alt="Search icon"
            />
          </button>
        </Link>
      </div>
      <div className={styles.tasksContainer}>
        <Task />
        <Task />
        <Task />
      </div>
    </main>
  );
}
