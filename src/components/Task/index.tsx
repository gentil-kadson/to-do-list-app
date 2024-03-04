import styles from "./Task.module.css";
import Image from "next/image";
import EditTaskIcon from "/public/assets/icons/editTaskIcon.svg";
import DeleteTaskIcon from "/public/assets/icons/deleteTaskIcon.svg";
import CompletedTaskIcon from "/public/assets/icons/completedTaskIcon.svg";
import { useState } from "react";
import { formatDate } from "@/utils";
import api from "@/api/tasksApi";
import Modal from "../Modal";
import EditTaskModal from "../EditTaskModal";

type TaskProps = {
  id: number;
  name: string;
  due_date: string;
  completed: boolean;
};

type TaskComponentProps = {
  task: TaskProps;
  setTasksData: (updatedTasks: TaskProps[]) => void;
};

export default function Task({ task, setTasksData }: TaskComponentProps) {
  const [showExtraActions, setShowExtraIcons] = useState<boolean>(false);
  const formattedDate = task.due_date ? formatDate(task.due_date) : "";
  const [taskData, setTaskData] = useState<TaskProps>(task);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const handleTaskChecking = () => {
    api
      .patch(`/tasks/${task.id}/`, {
        completed: !taskData.completed,
      })
      .then((success) => {
        setTaskData((prevState) => {
          return { ...prevState, completed: !taskData.completed };
        });
      });
  };

  const handleTaskDeletion = () => {
    api.delete(`/tasks/${task.id}/`).then((response) => {
      setShowModal(false);
      api.get("/tasks/").then((updatedTasks) => {
        setTasksData(updatedTasks.data);
      });
    });
  };

  return (
    <>
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
            <div
              className={styles.taskCheck}
              onClick={handleTaskChecking}
            ></div>
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
                onClick={() => setShowEditModal(true)}
              />
              <Image
                src={DeleteTaskIcon}
                width={30}
                height={30}
                alt="Ícone de exclusão"
                className={styles.actionableWhiteIcon}
                onClick={() => setShowModal(true)}
              />
            </>
          )}
          {formattedDate && formattedDate}
        </div>
      </div>
      {showModal && (
        <Modal
          show={showModal}
          setShowModal={setShowModal}
          handleTaskDeletion={handleTaskDeletion}
        />
      )}
      {showEditModal && (
        <EditTaskModal
          show={showEditModal}
          setShow={setShowEditModal}
          task={task}
          setTasksData={setTasksData}
        />
      )}
    </>
  );
}
