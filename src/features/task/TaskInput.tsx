import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { taskState } from '../../types/taskState';
import styles from './TaskInput.module.css';
import {
  selectEditTasks,
  editTask,
  fetchAsyncCreate,
  fetchAsyncUpdate,
  selectTask,
} from './taskSlice';

export const TaskInput = () => {
  const dispatch = useDispatch();
  const editedTask: taskState['editedTask'] = useSelector(selectEditTasks);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editedTask.id === 0
      ? dispatch(editTask({ ...editedTask, id: 0, title: e.target.value }))
      : dispatch(
          editTask({ ...editedTask, id: editedTask.id, title: e.target.value })
        );
  };

  const createClicked = () => {
    dispatch(fetchAsyncCreate(editedTask));
    dispatch(editTask({ id: 0, title: '' }));
  };

  const isDisabled = editedTask.title.length === 0;

  const updateClicked = () => {
    dispatch(fetchAsyncUpdate(editedTask));
  };

  return (
    <div>
      <input
        type="text"
        className={styles.taskInput}
        value={editedTask.title}
        onChange={handleInputChange}
      />
      <div className={styles.switch}>
        {editedTask.id === 0 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={createClicked}
            disabled={isDisabled}
          >
            Create
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={updateClicked}
            disabled={isDisabled}
          >
            Update
          </Button>
        )}
      </div>
    </div>
  );
};
