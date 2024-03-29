import styles from "./EditTaskModal.module.css";
import { useEffect, useRef, useState } from "react";
import api from "@/api/tasksApi";
import Alert from "../Alert";

type TaskProps = {
  id: number;
  name: string;
  due_date: string;
  completed: boolean;
};

type EditTaskModalProps = {
  show: boolean;
  task: TaskProps;
  setShow: (show: boolean) => void;
  setTasksData: (tasks: TaskProps[]) => void;
};

export default function EditTaskModal({
  show,
  task,
  setShow,
  setTasksData,
}: EditTaskModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [taskNameEdit, setTaskNameEdit] = useState<string>(task.name);
  const [dueDateEdit, setDueDateEdit] = useState<string>(
    task.due_date ? task.due_date : ""
  );
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleTaskEdit = () => {
    if (dueDateEdit.length === 0) {
      api
        .patch(`/tasks/${task.id}/`, {
          name: taskNameEdit,
          due_date: null,
        })
        .then((success) => {
          api.get("/tasks/").then((response) => {
            setTasksData(response.data);
            setShow(false);
          });
        })
        .catch((error) => {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        });
    } else {
      api
        .patch(`/tasks/${task.id}/`, {
          name: taskNameEdit,
          due_date: dueDateEdit,
        })
        .then((success) => {
          api.get("/tasks/").then((response) => {
            setTasksData(response.data);
            setShow(false);
          });
        })
        .catch((error) => {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        });
    }
  };

  useEffect(() => {
    if (show) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [show]);

  return (
    <>
      {showAlert && <Alert message="O nome da tarefa é obrigatório" />}
      <dialog className={styles.dialog} ref={dialogRef}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="task-name-edit">
            Nome
          </label>
          <input
            className={styles.taskName}
            type="text"
            name="task-name-edit"
            id="task-name-edit"
            value={taskNameEdit}
            onChange={(event) => setTaskNameEdit(event.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="due-date-edit">
            Data
          </label>
          <input
            className={styles.dueDate}
            type="date"
            name="due-date-edit"
            id="due-date-edit"
            value={dueDateEdit ? dueDateEdit : ""}
            onChange={(event) => setDueDateEdit(event.target.value)}
          />
        </div>
        <button className={styles.saveButton} onClick={handleTaskEdit}>
          Salvar
        </button>
      </dialog>
    </>
  );
}
