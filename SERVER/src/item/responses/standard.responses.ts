import { Standard } from '../entities/standard.entity';

export class StandardResponse {
  id: number;

  code: string;

  name: string;

  label: string;

  description: string;

  createdAt: Date;

  createdBy: string;

  modifiedAt: Date;

  modifiedBy: string;

  constructor(standard: Standard) {
    this.id = standard.id;
    this.code = standard.code;
    this.name = standard.name;
    this.label = standard.label;
    this.description = standard.description;
    this.createdAt = standard.createdAt;
    this.createdBy = standard.createdBy;
    this.modifiedAt = standard.modifiedAt;
    this.modifiedBy = standard.modifiedBy;
  }
}
