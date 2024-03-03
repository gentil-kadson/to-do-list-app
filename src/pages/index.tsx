import Image from "next/image";
import styles from "@/styles/Home.module.css";
import AddTaskIcon from "/public/assets/icons/addTaskIcon.svg";
import Link from "next/link";
import Task from "@/components/Task";
import api from "@/api/tasksApi";

type TaskProps = {
  name: string;
  due_date: string;
};

type HomeProps = {
  tasks: TaskProps[];
};

export default function Home({ tasks }: HomeProps) {
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
        {tasks.map((task: TaskProps) => {
          return <Task task={task} />;
        })}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const { data } = await api.get("/tasks");
  return { props: { tasks: data } };
}
