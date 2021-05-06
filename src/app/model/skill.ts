export interface NewSkill {
  name: string;
  group: string;
  description: string;
  labels: Set<string>;
}

export class Skill {
  id: number;
  name: string;
  group: string;
  description: string;
  labels: Set<string>;

  constructor(id: number, name: string, group: string, description: string, labels: string[]) {
    this.id = id;
    this.name = name;
    this.group = group;
    this.description = description;
    this.labels = new Set<string>(labels);
  }
}
