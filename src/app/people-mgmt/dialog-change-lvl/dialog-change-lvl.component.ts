import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-change-lvl',
  templateUrl: './dialog-change-lvl.component.html',
  styleUrls: ['./dialog-change-lvl.component.css']
})
export class DialogChangeLvlComponent {

  skillVariants: Array<SkillLevelVariant>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {memberName: string, skillName: string, level: number, style: number},
    public dialogRef: MatDialogRef<DialogChangeLvlComponent>) {
    this.skillVariants = new Array<SkillLevelVariant>();

    [
      { level: 0, levelName: 'novice', levelDesc: 'no usable knowledge'},
      { level: 1, levelName: 'advanced beginner', levelDesc: 'basic knowledge, performs basic tasks, requires supervision and training'},
      { level: 2, levelName: 'competent', levelDesc: 'performs regular tasks, requires mentoring and guidance on complex tasks'},
      { level: 3, levelName: 'proficient', levelDesc: 'performs any tasks with a hollistic view'},
      { level: 4, levelName: 'expert', levelDesc: 'expert on the topic capable of teaching others'}].forEach(i => this.skillVariants.push(
        { skillName: data.skillName, level: i.level, levelName: i.levelName, levelDesc: i.levelDesc}));
  }

  closeDialog(skillVariant: SkillLevelVariant): void {
    this.dialogRef.close(skillVariant);
  }
}

export interface SkillLevelVariant {
  skillName: string;
  level: number;
  levelName: string;
  levelDesc: string;
}
