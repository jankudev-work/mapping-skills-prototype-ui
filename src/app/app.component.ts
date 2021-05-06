import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogAddPersonComponent} from './dialog-add-person/dialog-add-person.component';
import {DialogAddSkillComponent} from './dialog-add-skill/dialog-add-skill.component';
import {DialogChangeLvlComponent} from './dialog-change-lvl/dialog-change-lvl.component';

import {MatSnackBar} from '@angular/material/snack-bar';

import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './../assets/shared.css']
})
export class AppComponent implements OnInit {

  public team = new Array<TMember>();
  public teamSkills = new Array<TSkill>();

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    const tmp = this.storage.get(STORAGE_KEY_CURRENT_SKILL_MATRIX);
    console.log(JSON.stringify(tmp));
    if (tmp && tmp.team && tmp.team.length && tmp.teamSkills && tmp.teamSkills.length) {
      this.teamSkills = tmp.teamSkills;

      this.team = new Array<TMember>();
      tmp.team.forEach((member: { name: any; skills: Iterable<readonly [string, number]>; }) => {
        this.team.push({
          name: member.name,
          skills: new Map(member.skills)
        });
      });
    } else {
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

  addSkill(name: string): void {
    this.teamSkills.push({name});

    this.team.forEach((member) => {
      member.skills.set(name, 0);
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

  openAddSkillDialog(): void {
    const dialogRef = this.dialog.open(DialogAddSkillComponent);
    dialogRef.afterClosed().subscribe(name => {
      if (!!name) {
        this.addSkill(name);
      }
    });
  }
  openChangeLvlDialog(member: TMember, skill: TSkill, style: number): void {
    const dialogRef = this.dialog.open(DialogChangeLvlComponent, {
      data: {
        memberName: member.name,
        skillName: skill.name,
        level: member.skills.get(skill.name),
        style
      }
    });
    dialogRef.afterClosed().subscribe(skillVariant => {
      if (!!skillVariant) {
        member.skills.set(skillVariant.skillName, skillVariant.level);
      }
    });
  }

  /* local storage backup */
  save(): void {
    const serializeTeam = new Array();
    this.team.forEach((member) => {
      serializeTeam.push(
        {
          name: member.name,
          skills: Array.from(member.skills.entries())
         }
      );
    });

    this.storage.set(STORAGE_KEY_CURRENT_SKILL_MATRIX, {
      team: serializeTeam,
      teamSkills: this.teamSkills
    });

    this.snackBar.open('Saved!');
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

const STORAGE_KEY_CURRENT_SKILL_MATRIX = 'local_skill_matrix_current';
