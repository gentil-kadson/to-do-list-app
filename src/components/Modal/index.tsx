import styles from "./Modal.module.css";
import { useRef, useEffect } from "react";

type ModalProps = {
  show: boolean;
  setShowModal: (newShow: boolean) => void;
};

export default function Modal({ show, setShowModal }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (show) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [show, dialogRef.current]);

  return (
    <dialog ref={dialogRef}>
      <h1>Tem certeza que deseja excluir a tarefa?</h1>
      <div>
        <button>Sim</button>
        <button onClick={() => setShowModal(false)}>Não</button>
      </div>
    </dialog>
  );
}
