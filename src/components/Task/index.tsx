import styles from "./Task.module.css";
import Image from "next/image";
import EditTaskIcon from "/public/assets/icons/editTaskIcon.svg";
import DeleteTaskIcon from "/public/assets/icons/deleteTaskIcon.svg";
import CompletedTaskIcon from "/public/assets/icons/completedTaskIcon.svg";
import { useState } from "react";
import { formatDate } from "@/utils";
import api from "@/api/tasksApi";

type TaskProps = {
  id: number;
  name: string;
  due_date: string;
  completed: boolean;
};

type TaskComponentProps = {
  task: TaskProps;
};

export default function Task({ task }: TaskComponentProps) {
  const [showExtraActions, setShowExtraIcons] = useState<boolean>(false);
  const formattedDate = formatDate(task.due_date);
  const [taskData, setTaskData] = useState<TaskProps>(task);

  const handleTaskChecking = async () => {
    await api
      .patch(`/tasks/${task.id}/`, {
        completed: !taskData.completed,
      })
      .then((success) => {
        setTaskData((prevState) => {
          return { ...prevState, completed: !taskData.completed };
        });
      });
  };

  return (
    <div
      className={styles.taskContainer}
      onMouseEnter={() => setShowExtraIcons(true)}
      onMouseLeave={() => setShowExtraIcons(false)}
    >
      <div className={styles.leftItems}>
        {taskData.completed ? (
          <Image
            className={styles.checkedTask}
            src={CompletedTaskIcon}
            width={48}
            height={48}
            alt="Círculo marcado"
            onClick={handleTaskChecking}
          />
        ) : (
          <div className={styles.taskCheck} onClick={handleTaskChecking}></div>
        )}

        {taskData.completed ? <s>{task.name}</s> : <span>{task.name}</span>}
      </div>
      <div className={styles.rightItems}>
        {showExtraActions && (
          <>
            <Image
              src={EditTaskIcon}
              width={30}
              height={30}
              alt="ícone de edição"
              className={styles.actionableWhiteIcon}
            />
            <Image
              src={DeleteTaskIcon}
              width={30}
              height={30}
              alt="Ícone de exclusão"
              className={styles.actionableWhiteIcon}
            />
          </>
        )}
        {formattedDate}
      </div>
    </div>
  );
}
