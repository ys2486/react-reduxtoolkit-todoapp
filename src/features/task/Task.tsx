import { Header } from '../header/Header';
import styles from './Task.module.css';
import { TaskDetail } from './TaskDetail';
import { TaskInput } from './TaskInput';
import { TaskList } from './TaskList';

export const Task = () => {
  return (
    <div className={styles.containerTasks}>
      <div className={styles.appTasks}>
        <Header />
        <TaskInput />
        <TaskList />
      </div>
      <div className={styles.appDetails}>
        <TaskDetail />
      </div>
    </div>
  );
};
