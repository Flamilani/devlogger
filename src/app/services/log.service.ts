import { Injectable } from '@angular/core';
import { Log } from '../models/Log.interface';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class LogService {
logs: Log[];

private logSource = new BehaviorSubject<Log>({id: null, text: null, date: null});

selectedLog = this.logSource.asObservable();

private stateSource = new BehaviorSubject<boolean>(true);

stateClear = this.stateSource.asObservable();

  constructor() {
   /*  this.logs = [
      {
        id: '1',
        text: 'Generated components',
        date: new Date('27/12/2018 19:33:00')
    },
    {
      id: '2',
      text: 'Add login',
      date: new Date('27/12/2018 19:33:00')
  }
    ]; */
    this.logs = [];
  }

  getLogs(): Observable<Log[]> {
    if (localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }

    return of(this.logs.sort((a, b) => {
      return b.date = a.date;
    }));
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);

    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id === cur.id) {
        this.logs.splice(index, 1);
      }
    });

    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }

}
