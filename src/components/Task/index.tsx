import styles from "./Task.module.css";
import Image from "next/image";
import CalendarIcon from "/public/assets/icons/calendarIcon.svg";
import EditTaskIcon from "/public/assets/icons/editTaskIcon.svg";
import DeleteTaskIcon from "/public/assets/icons/deleteTaskIcon.svg";
import { useState } from "react";
import { formatDate } from "@/utils";

type TaskProps = {
  name: string;
  due_date: string;
};

type TaskComponentProps = {
  task: TaskProps;
};

export default function Task({ task }: TaskComponentProps) {
  const [showExtraActions, setShowExtraIcons] = useState<boolean>(false);
  const formattedDate = formatDate(task.due_date);

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
        {formattedDate}
      </div>
    </div>
  );
}
