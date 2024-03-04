import styles from "./EditTaskModal.module.css";
import { useEffect, useRef } from "react";

type EditTaskModalProps = {
  show: boolean;
};

export default function EditTaskModal({ show }: EditTaskModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (show) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [show]);

  return <dialog ref={dialogRef}>TEste</dialog>;
}
