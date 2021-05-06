import { Component } from '@angular/core';
import { NewPerson } from '../../model/person';
import { JobEnum } from '../../model/job.enum';
import {ContractEnum} from '../../model/contract.enum';

@Component({
  selector: 'app-dialog-add-person',
  templateUrl: './dialog-add-person.component.html',
  styleUrls: ['./dialog-add-person.component.css']
})
export class DialogAddPersonComponent {
  newPerson = {} as NewPerson;
  public JobEnum = JobEnum;
  public ContractEnum = ContractEnum;
}
