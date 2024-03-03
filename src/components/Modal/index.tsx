import styles from "./Modal.module.css";

export default function Modal() {
  return (
    <dialog>
      <h1>Tem certeza que deseja excluir a tarefa?</h1>
      <div>
        <button>Sim</button>
        <button>Não</button>
      </div>
    </dialog>
  );
}
