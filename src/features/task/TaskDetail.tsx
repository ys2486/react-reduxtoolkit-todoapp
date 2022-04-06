import { useSelector } from 'react-redux';
import { taskState } from '../../types/taskState';
import styles from './TaskDetail.module.css';
import { selectSelectedTasks } from './taskSlice';

export const TaskDetail = () => {
  const selectedTask: taskState['selectedTask'] =
    useSelector(selectSelectedTasks);

  return (
    <div className={styles.details}>
      {selectedTask.title && (
        <>
          <h2>{selectedTask.title}</h2>
          <p>Created at</p>
          <h3>{selectedTask.created_at}</h3>
          <p>Updated at</p>
          <h3>{selectedTask.updated_at}</h3>
        </>
      )}
    </div>
  );
};
