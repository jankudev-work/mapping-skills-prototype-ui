import {Injectable} from '@angular/core';
import {Person} from '../model/person';
import {JobEnum} from '../model/job.enum';
import {ContractEnum} from '../model/contract.enum';

const MOCK_DATA = [
  new Person(1, 'Petr Novak', JobEnum.PO, ContractEnum.INT),
  new Person(2, 'Jan Novotný', JobEnum.ANS, ContractEnum.INT),
  new Person(3, 'Jitka Placha', JobEnum.DEV, ContractEnum.INT),
  new Person(4, 'Lukas Malina', JobEnum.DEV, ContractEnum.EXT),
  new Person(5, 'Jana Hlucha', JobEnum.CX, ContractEnum.INT),
  new Person(6, 'Frantisek Loudal', JobEnum.TST, ContractEnum.EXT),
  new Person(7, 'Milan Hroch', JobEnum.SGO, ContractEnum.INT)
];

@Injectable({
  providedIn: 'root'
})
export class PeopleRepositoryService {

  data: Set<Person>;

  constructor() {
    this.data = new Set<Person>(MOCK_DATA);
  }

  addPerson(name: string, job: JobEnum, contract: ContractEnum): void {
      const id = (Array.from(this.data).map(x => x.id).reduce((prev, curr) => Math.max(prev, curr))) + 1;
      this.data.add(new Person(id, name, job, contract));
  }

  removePerson(id: number): void {
    const person = Array.from(this.data).filter(x => x.id === id)[0];
    this.data.delete(person);
  }
}
