import {Component, OnInit} from '@angular/core';
import {PeopleRepositoryService} from '../service/people-repository.service';
import {Person} from '../model/person';
import {MatDialog} from '@angular/material/dialog';
import {DialogAddPersonComponent} from './dialog-add-person/dialog-add-person.component';
import {SkillsRepositoryService} from "../service/skills-repository.service";
import {DialogAddSkillComponent} from "./dialog-add-skill/dialog-add-skill.component";
import {Skill} from "../model/skill";

@Component({
  selector: 'app-people-mgmt',
  templateUrl: './people-mgmt.component.html',
  styleUrls: ['./people-mgmt.component.css']
})
export class PeopleMgmtComponent implements OnInit {

  people: Set<Person>;

  constructor(private peopleRepositoryService: PeopleRepositoryService,
              private skillsRepositoryService: SkillsRepositoryService,
              public dialog: MatDialog) {
    this.people = new Set<Person>();
  }

  ngOnInit(): void {
    this.reloadPeople();
  }

  reloadPeople(): void {
    this.people = this.peopleRepositoryService.data;
  }

  openAddPersonDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPersonComponent);
    dialogRef.afterClosed().subscribe(newPerson => {
      if (!!newPerson) {
        console.log(JSON.stringify(newPerson));
        this.peopleRepositoryService.addPerson(newPerson.name, newPerson.job, newPerson.contract);
        this.reloadPeople();
      }
    });
  }

  openAddSkillDialog(): void {
    const dialogRef = this.dialog.open(DialogAddSkillComponent);
    dialogRef.afterClosed().subscribe(newSkill => {
      if (!!newSkill) {
        console.log(JSON.stringify(newSkill));
        this.skillsRepositoryService.addSkill(newSkill.name, newSkill.description, newSkill.labels);
        this.reloadSkills();
      }
    });
  }
}
