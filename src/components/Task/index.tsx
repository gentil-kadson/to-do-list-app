import styles from "./Task.module.css";
import Image from "next/image";
import CalendarIcon from "/public/assets/icons/calendarIcon.svg";
import EditTaskIcon from "/public/assets/icons/editTaskIcon.svg";
import DeleteTaskIcon from "/public/assets/icons/deleteTaskIcon.svg";
import { useState } from "react";

type TaskProps = {
  name: string;
  due_date: string;
};

type TaskComponentProps = {
  task: TaskProps;
};

export default function Task({ task }: TaskComponentProps) {
  const [showExtraActions, setShowExtraIcons] = useState<boolean>(false);

  return (
    <div
      className={styles.taskContainer}
      onMouseEnter={() => setShowExtraIcons(true)}
      onMouseLeave={() => setShowExtraIcons(false)}
    >
      <div className={styles.leftItems}>
        <div className={styles.taskCheck}></div>
        {task.name}
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
        <Image
          src={CalendarIcon}
          width={30}
          height={30}
          alt="Ícone de calendário"
          className={styles.whiteIcon}
        />{" "}
        12 Jul. 2024
      </div>
    </div>
  );
}
