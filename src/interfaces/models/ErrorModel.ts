export default interface ErrorModel {
  error: boolean;
  msg: string;
}

export function InstanceOfErrorModel(obj: any): boolean {
  return obj instanceof Object && 'error' in obj;
}
