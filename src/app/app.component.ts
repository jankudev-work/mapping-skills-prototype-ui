import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogAddPersonComponent} from './dialog-add-person/dialog-add-person.component';
import {DialogAddSkillComponent} from './dialog-add-skill/dialog-add-skill.component';
import {DialogChangeLvlComponent} from './dialog-change-lvl/dialog-change-lvl.component';

import {MatSnackBar} from '@angular/material/snack-bar';

import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {FileSaverService} from 'ngx-filesaver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService,
              private fileSaverService: FileSaverService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  public team = new Array<TMember>();
  public teamSkills = new Array<TSkill>();

  private static serialize(obj: object): string {
    return JSON.stringify(obj, null, 2);
  }

  /** Load from local storage, otherwise populate with default mock data */
  ngOnInit(): void {
    const tmp = this.storage.get(STORAGE_KEY_CURRENT_SKILL_MATRIX);
    if (tmp && tmp.team && tmp.team.length && tmp.teamSkills && tmp.teamSkills.length) {
      this.initializeTeamAndSkills(tmp);
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

  private initializeTeamAndSkills(tmp: Tmp): void {
    console.log(tmp);

    this.teamSkills = new Array<TSkill>();
    tmp.teamSkills.forEach((skill) => {
      console.log('adding skill: ' + skill);
      this.teamSkills.push(skill);
    });

    this.team = new Array<TMember>();
    tmp.team.forEach((member: { name: any; skills: Iterable<readonly [string, number]>; }) => {
      console.log('adding team member: ' + member.name);
      this.team.push({
        name: member.name,
        skills: new Map(member.skills)
      });
    });
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

  removeMember(name: string): void {
    this.team.splice(this.team.findIndex(value => value.name === name), 1);
  }

  removeSkill(name: string): void {
    this.teamSkills.splice(this.teamSkills.findIndex(value => value.name === name), 1);
    this.team.forEach(member => {
      member.skills.delete(name);
    });
  }

  export(): void {
    const fileName = 'skillmatrix_snapshot_' + new Date().toISOString() + '.txt';
    this.fileSaverService.save(new Blob([AppComponent.serialize(this.prepareSerializableObject())]), fileName);
  }


  handleFileInput($event: any): void {
    this.readImportFile($event.target);
  }

  readImportFile(inputValue: any): void {
    const file = inputValue.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      console.log('Importing file ' + file.name + ' (' + file.size + 'B)');
      const fileContent = fileReader.result as string;
      this.initializeTeamAndSkills(JSON.parse(fileContent));
    };
    fileReader.readAsText(file);
  }

  restart(): void {
    this.team = new Array<TMember>();
    this.teamSkills = new Array<TSkill>();
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
    const objToSerializace = this.prepareSerializableObject();

    this.storage.set(STORAGE_KEY_CURRENT_SKILL_MATRIX, objToSerializace);

    this.snackBar.open('Saved!');
  }

  private prepareSerializableObject(): object {
    const serializeTeam: any[] = [];
    this.team.forEach((member) => {
      serializeTeam.push(
        {
          name: member.name,
          skills: Array.from(member.skills.entries())
        }
      );
    });

    return {
      team: serializeTeam,
      teamSkills: this.teamSkills
    };
  }
}

export interface TSkill {
  name: string;
}

export interface TMember {
  name: string;
  skills: Map<string, number>;
}

export interface Tmp {
  team: any[];
  teamSkills: Array<TSkill>;
}

const MOCK_MEMBERS = [
  'Malcolm Reynolds',
  'Zoe Washburne',
  'Hoban Washburne',
  'Inara Sera',
  'Jayne Cobb',
  'Kaylee Frye',
  'Simon Tam',
  'River Tam'
];

const MOCK_TEAM_SKILLS = [
  'Java',
  'Kotlin',
  'JavaScript',
  'TypeScript',
  'HTML / CSS',
  'Spring / SpringBoot',
  'Hexagonal / Onion architecture',
  'Microservices',
  'DevSecOps',
  'Kafka',
  'Agile / Scrum',
  'Data processing',
  'Automated E2E testing',
  'Application support',
  'Monitoring'
];

const STORAGE_KEY_CURRENT_SKILL_MATRIX = 'local_skill_matrix_current';
