import styles from "./Alert.module.css";

type AlertProps = {
  message: string;
};

export default function Alert({ message }: AlertProps) {
  return <div className={styles.alertContainer}>{message}</div>;
}
