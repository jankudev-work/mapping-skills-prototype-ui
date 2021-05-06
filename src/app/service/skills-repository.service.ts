import {Injectable} from '@angular/core';
import {Skill} from '../model/skill';

const MOCK_DATA = [
  // CX
  new Skill(1, 'Zakaznicke cesty', 'cx-group', 'Tvorba zakaznickych cest, identifikace pains/gains klienta.', ['cx']),
  new Skill(2, 'Persony', 'cx-group', 'Popis person reprezentujici typy klientu', ['cx']),
  new Skill(3, 'Pilire a CX DNA', 'cx-group', '', ['cx']),
  new Skill(4, 'Primarni vyzkum', 'cx-group', 'Vyzkum na zaklade vlastniho sberu dat, dotazniky, komunikace s klienty', ['cx']),
  new Skill(5, 'Sekundarni vyzkum', 'cx-group', 'Vyzkum a prace na zaklade externich dat', ['cx']),
  new Skill(6, 'Discovery (pdlc)', 'cx-group', '', ['cx']),
  new Skill(7, 'Mala komunikace', 'cx-group', '', ['cx']),
  new Skill(8, 'Sketching', 'cx-group', '', ['cx']),
  new Skill(9, 'Produkty, procesy a metodika', 'cx-group', '', ['cx']),

  // Design
  new Skill(10, 'Architektonicke modelovani', 'des-group', 'Priprava modelu v UML, BPMP, Archimate', ['design']),
  new Skill(11, 'Realizace high level odhadu', 'des-group', 'Schopnost hrube odhadovat naklady / pracnost / casovani / omezeni', ['design']),
  new Skill(12, 'Solution design', 'des-group', 'Detailni znalost technologii, schopnost definovat technologicke pozadavky, vhodne platformy, navrhy, architekturu', ['design']),
  new Skill(13, 'Enterprise design a lifecycle-management', 'des-group', 'Design z pohledu "enterprise" (organization-wide)', ['design']),

  // Dev - ide
  new Skill(14, 'IntelliJ IDEA', 'dev-group', 'IDE - JetBrains IntelliJ IDEA', ['dev-ide', 'java']),
  new Skill(15, 'Visual Studio', 'dev-group', 'IDE - Microsoft Visual Studio', ['dev-ide', '.net', 'c/c++', 'c#']),
  new Skill(16, 'SQL Developer', 'dev-group', 'IDE - Oracle SQL Developer', ['dev-ide', 'sql']),
  // Dev - lang
  new Skill(17, 'Java', 'dev-group', 'Java programming', ['dev-lang', 'java']),
  new Skill(18, '.NET core', 'dev-group', '.NET core programming', ['dev-lang', '.net']),
  new Skill(19, 'Kotlin', 'dev-group', 'Kotlin programming', ['dev-lang', 'kotlin', 'android']),
  new Skill(20, 'JavaScript', 'dev-group', 'JavaScript programming', ['dev-lang', 'javascript', 'frontend'])
];


@Injectable({
  providedIn: 'root'
})
export class SkillsRepositoryService {
  data: Set<Skill>;
  labels: Set<string>;

  constructor() {
    this.data = new Set(MOCK_DATA);
    this.labels = new Set<string>();

    this.reloadLabels();
  }

  addSkill(name: string, description: string, labels: string[]): void {
    const id = (Array.from(this.data).map(x => x.id).reduce((prev, curr) => Math.max(prev, curr))) + 1;
    this.data.add(new Skill(id, name, 'other', description, labels));

    this.reloadLabels();
  }

  reloadLabels(): void {
    this.labels = new Set(Array.from(this.data).map(skill => Array.from(skill.labels.values())).reduce((acc, val) => acc.concat(val), []));
  }
}
