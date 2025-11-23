export class VariablesStorage {
  private static variables: Map<string, string> = new Map();

  static set(key: string, value: string) {
    this.variables.set(key, value);
  }

  static get(key: string): string {
    const value = this.variables.get(key);
    if (!value) {
      throw new Error(`Переменная ${key} не найдена в VariablesStorage`);
    }
    return value;
  }
}