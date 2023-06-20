import { Component, DoCheck } from '@angular/core';
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck
{

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');

  constructor()
  {
  }

  ngDoCheck(): void
  {
    this.setLocalStorage();
  }

  public setEmitTaskList(task: string)
  {
    this.taskList.push({ task: task, checked: false });
  }

  public deleteItemTaskList(id: number)
  {
    this.taskList.splice(id, 1);
  }

  public deleteAllTaskList()
  {
    const confirm = window.confirm("Você realmente deseja deletar tudo?");
    if(confirm)
    this.taskList = [];
  }

  public validationInput(task:string, index: number)
  {

    !task.trim().length ?
      window.confirm('Task esta vazia, deseja deletar?') ?
        this.deleteItemTaskList(index) : null : null;

  }

  public setLocalStorage()
  {
    if (this.taskList)
    {
      this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked));
      localStorage.setItem('list', JSON.stringify(this.taskList));
    }
  }

}
