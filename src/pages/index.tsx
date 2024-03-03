import Image from "next/image";
import styles from "@/styles/Home.module.css";
import AddTaskIcon from "/public/assets/icons/addTaskIcon.svg";
import Link from "next/link";
import Task from "@/components/Task";
import api from "@/api/tasksApi";
import Alert from "@/components/Alert";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

type TaskProps = {
  id: number;
  name: string;
  due_date: string;
  completed: boolean;
};

type HomeProps = {
  tasks: TaskProps[];
};

export default function Home({ tasks }: HomeProps) {
  const [searchText, setSearchText] = useState<string>("");
  const [tasksData, setTasksData] = useState<TaskProps[]>(tasks);
  const router = useRouter();

  useEffect(() => {
    if (searchText.length !== 0) {
      const filteredTasks = tasks.filter((task) => {
        return task.name.includes(searchText);
      });
      setTasksData(filteredTasks);
    } else {
      setTasksData(tasks);
    }
  }, [searchText]);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.inputContainer}>
          <input
            className={styles.searchTaskInput}
            type="text"
            name="search-task"
            id="search-task"
            onChange={(event) => setSearchText(event.target.value)}
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
          {tasksData.map((task: TaskProps) => {
            return <Task task={task} />;
          })}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await api.get("/tasks");
  return { props: { tasks: data } };
}
