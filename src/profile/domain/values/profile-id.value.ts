import { PrimaryColumn } from 'typeorm';

export class ProfileId {
  @PrimaryColumn('int', { name: 'id' })
  protected readonly value: number;

  protected constructor(value: number) {
    this.value = Number(value);
  }

  public static of(value: number): ProfileId {
    return new ProfileId(value);
  }

  public getValue(): number {
    return Number(this.value);
  }
}
