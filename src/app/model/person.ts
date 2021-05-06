import {JobEnum} from './job.enum';
import {ContractEnum} from './contract.enum';

export interface NewPerson {
  name: string;
  job: JobEnum;
  contract: ContractEnum;
}

export class Person {
  id: number;
  contract: ContractEnum;
  job: JobEnum;
  name: string;

  constructor(id: number, name: string, job: JobEnum, contract: ContractEnum) {
    this.id = id;
    this.name = name;
    this.job = job;
    this.contract = contract;
  }
}
