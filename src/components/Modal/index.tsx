import styles from "./Modal.module.css";
import { useRef, useEffect } from "react";

type ModalProps = {
  show: boolean;
  setShowModal: (newShow: boolean) => void;
  handleTaskDeletion: () => void;
};

export default function Modal({
  show,
  setShowModal,
  handleTaskDeletion,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (show) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [show, dialogRef.current]);

  return (
    <dialog className={styles.dialog} ref={dialogRef}>
      <h1>Tem certeza que deseja excluir a tarefa?</h1>
      <div className={styles.buttonsContainer}>
        <button
          className={`${styles.button} ${styles.deleteTask}`}
          onClick={handleTaskDeletion}
        >
          Sim
        </button>
        <button className={styles.button} onClick={() => setShowModal(false)}>
          Não
        </button>
      </div>
    </dialog>
  );
}
