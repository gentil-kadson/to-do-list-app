import styles from "./AddTask.module.css";

export default function AddTaskPage() {
  return (
    <main className={styles.main}>
      <h1>Adicionar Tarefa</h1>
      <section className={styles.formSection}>
        <div className={styles.inputSection}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="task-name">
              Nome da Tarefa
            </label>
            <input
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
              className={styles.input}
              type="date"
              name="due-date"
              id="due-date"
            />
          </div>
        </div>
        <button className={styles.addTaskButton}>Adicionar Tarefa</button>
      </section>
    </main>
  );
}
