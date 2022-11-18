import { PrimaryColumn } from 'typeorm';

export class UserId {
  @PrimaryColumn('int', { name: 'id' })
  protected readonly value: number;

  protected constructor(value: number) {
    this.value = Number(value);
  }

  public static of(value: number): UserId {
    return new UserId(value);
  }

  public getValue(): number {
    return Number(this.value);
  }
}
