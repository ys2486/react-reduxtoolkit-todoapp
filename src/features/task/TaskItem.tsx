import { VFC } from 'react';
import { taskState } from '../../types/taskState';
import styles from './TaskItem.module.css';
import { BsTrash } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { fetchAsyncDelete, selectTask, editTask } from './taskSlice';

type TaskItemType = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
};

export const TaskItem: VFC<{ key: number } & { task: TaskItemType }> = (
  props
) => {
  const { task } = props;
  const dispatch: AppDispatch = useDispatch();
  const taskDelete = () => {
    dispatch(fetchAsyncDelete(task.id));
  };

  const clickTaskTitle = () => {
    dispatch(selectTask(task));
  };

  const taskEdit = () => {
    dispatch(editTask(task));
    dispatch(selectTask(task));
  };

  return (
    <li className={styles.listItem}>
      <span className={styles.cursor} onClick={clickTaskTitle}>
        {task.title}
      </span>
      <div>
        <button className={styles.taskIcon} onClick={taskDelete}>
          <BsTrash />
        </button>
        <button className={styles.taskIcon} onClick={taskEdit}>
          <FaEdit />
        </button>
      </div>
    </li>
  );
};
