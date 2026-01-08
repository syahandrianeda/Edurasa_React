export class ApiErrors extends Error {
  constructor(
    public status?: number,
    message?: string,
    public payload?: any
  ) {
    super(message)
  }
}
