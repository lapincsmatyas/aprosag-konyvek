import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading = new BehaviorSubject(false);
  transparent = false;

  processes: Set<string> = new Set<string>();

  constructor() { }

  addProcess(id: string, options: {transparent: boolean } = {transparent: false}){
    this.processes.add(id);
    this.transparent = options.transparent;
    this.loading.next(true);
  }

  removeProcess(id: string){
    this.processes.delete(id);
    if(this.processes.size == 0){
      this.loading.next(false);
    }
  }

  clearProcesses(){
    this.processes.clear();
    this.loading.next(false);
  }
}
