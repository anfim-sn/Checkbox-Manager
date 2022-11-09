import React, {useState} from 'react';
import type {ITask} from "../../typings";

type TaskProps = {
  task: ITask
}

const Task = ({task = {id: 0, text: '', isDone: false}}: TaskProps) => {
  const {text, isDone} = task
  const [checked, setChecked] = useState(isDone);


  const checkHandler: React.ChangeEventHandler = () => {
    setChecked(!checked)
  }

  return (
    <div>
      <input type={"checkbox"} checked={checked} onChange={checkHandler}/>
      {text}
    </div>
  );
};

export default Task;