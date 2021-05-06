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
    [0, 1, 2, 3, 4].forEach(i => this.skillVariants.push({ skillName: data.skillName, level: i}));
    console.log(JSON.stringify(this.skillVariants));
  }

  closeDialog(skillVariant: SkillLevelVariant): void {
    this.dialogRef.close(skillVariant);
  }
}

export interface SkillLevelVariant {
  skillName: string;
  level: number;
}
