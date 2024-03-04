import styles from "./AddTask.module.css";
import { useRef, useState } from "react";
import api from "@/api/tasksApi";
import { useRouter } from "next/router";
import Alert from "@/components/Alert";

export default function AddTaskPage() {
  const nameRef = useRef<HTMLInputElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleRegisterTask = () => {
    if (dueDateRef.current?.value) {
      api
        .post("/tasks/", {
          name: nameRef.current?.value,
          due_date: dueDateRef.current?.value,
          completed: false,
        })
        .then((success) => {
          router.push("/");
        })
        .catch((error) => {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        });
    } else {
      api
        .post("/tasks/", {
          name: nameRef.current?.value,
          completed: false,
        })
        .then((success) => {
          router.push("/");
        })
        .catch((error) => {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        });
    }
  };

  return (
    <>
      {showAlert && <Alert message="O nome da tarefa é obrigatório" />}
      <main className={styles.main}>
        <h1>Adicionar Tarefa</h1>
        <section className={styles.formSection}>
          <div className={styles.inputSection}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="task-name">
                Nome da Tarefa
              </label>
              <input
                ref={nameRef}
                className={styles.input}
                type="text"
                name="task-name"
                id="task-name"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="due-date">
                Prazo
              </label>
              <input
                ref={dueDateRef}
                className={styles.input}
                type="date"
                name="due-date"
                id="due-date"
              />
            </div>
          </div>
          <button onClick={handleRegisterTask} className={styles.addTaskButton}>
            Adicionar Tarefa
          </button>
        </section>
      </main>
    </>
  );
}
