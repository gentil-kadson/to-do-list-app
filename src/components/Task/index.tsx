import styles from "./Task.module.css";

export default function Task() {
  return (
    <div className={styles.taskContainer}>
      <div className={styles.leftItems}>
        <div className={styles.taskCheck}></div> nome
      </div>
      <div>due date</div>
    </div>
  );
}
