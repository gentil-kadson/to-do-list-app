import styles from "./EditTaskModal.module.css";
import { useEffect, useRef, useState } from "react";
import api from "@/api/tasksApi";

type TaskProps = {
  id: number;
  name: string;
  due_date: string;
  completed: boolean;
};

type EditTaskModalProps = {
  show: boolean;
  task: TaskProps;
};

export default function EditTaskModal({ show, task }: EditTaskModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [taskNameEdit, setTaskNameEdit] = useState<string>(task.name);
  const [dueDateEdit, setDueDateEdit] = useState<string>(task.due_date);

  const handleTaskEdit = () => {};

  useEffect(() => {
    if (show) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [show]);

  return (
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
          value={dueDateEdit}
          onChange={(event) => setDueDateEdit(event.target.value)}
        />
      </div>
      <button className={styles.saveButton} onClick={handleTaskEdit}>
        Salvar
      </button>
    </dialog>
  );
}
