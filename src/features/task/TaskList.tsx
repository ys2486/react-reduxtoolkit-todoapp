import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncGet, selectTasks } from './taskSlice';
import { taskState } from '../../types/taskState';
import { TaskItem } from './TaskItem';
import { fetchAsyncProf } from '../login/loginSlice';

export const TaskList = () => {
  const tasks: taskState['tasks'] = useSelector(selectTasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTaskProf = async () => {
      await dispatch(fetchAsyncGet());
      await dispatch(fetchAsyncProf());
    };
    fetchTaskProf();
  }, [dispatch]);

  // console.log(tasks);
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};
