import styles from "./Alert.module.css";

type AlertProps = {
  message: string;
  screenTime: number;
};

export default function Alert({ message, screenTime }: AlertProps) {
  return <div className={styles.alertContainer}>Isso é um alerta</div>;
}
