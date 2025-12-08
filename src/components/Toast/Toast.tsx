import { Toaster } from "react-hot-toast";
import styles from "./Toast.module.css";

export default function Toast() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        className: styles.toast,
        icon: (
          <div className={styles.icon}>
            <svg
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1"
                y1="1"
                x2="11"
                y2="11"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="11"
                y1="1"
                x2="1"
                y2="11"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        ),
      }}
    />
  );
}
