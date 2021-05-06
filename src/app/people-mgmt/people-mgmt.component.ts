import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogAddPersonComponent} from './dialog-add-person/dialog-add-person.component';

@Component({
  selector: 'app-people-mgmt',
  templateUrl: './people-mgmt.component.html',
  styleUrls: ['./people-mgmt.component.css']
})
export class PeopleMgmtComponent implements OnInit {

  public team = new Array<TMember>();
  public teamSkills = new Array<TSkill>();

  ngOnInit(): void {
    MOCK_TEAM_SKILLS.forEach((skill) => this.teamSkills.push({
        name: skill
      }));

    MOCK_MEMBERS.forEach((member) => {
      const memberSkills = new Map<string, number>();
      MOCK_TEAM_SKILLS.forEach((skill) => {
        memberSkills.set(skill, 0);
      });
      this.team.push({
        name: member,
        skills: memberSkills
      });
    });
  }

  constructor(public dialog: MatDialog) {
  }

  /* Component logic methods */
  addTeamMember(name: string): void {
    const memberSkills = new Map<string, number>();
    this.teamSkills.forEach((skill) => {
      memberSkills.set(skill.name, 0);
    });
    this.team.push({
      name,
      skills: memberSkills
    });
  }

  /* UI components methods and events handling */
  openAddPersonDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPersonComponent);
    dialogRef.afterClosed().subscribe(name => {
      if (!!name) {
        this.addTeamMember(name);
      }
    });
  }
}

export interface TSkill {
  name: string;
}

export interface TMember {
  name: string;
  skills: Map<string, number>;
}

const MOCK_MEMBERS = [
  'Petr Novák',
  'Jan Novotný',
  'Marek Jirotka',
  'Milada Zedníčková',
  'Lukasz Slezina',
  'Richard Dočekal',
  'William Heroutchek'
];

const MOCK_TEAM_SKILLS = [
  'Java',
  'Kotlin',
  'JavaScript',
  'TypeScript',
  'HTML / CSS',
  'Enterprise architect',
  'Architektura web aplikací',
  'Psaní user-stories',
  'Psaní iniciativ',
  'Datová analytika (excel)',
  'Datová analytika (Tableau)',
  'Manuální testování',
  'Aplikační podpora',
  'Monitoring aplikací'
];
