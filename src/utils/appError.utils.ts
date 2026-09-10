class AppError extends Error {
  public status: "error" | "fail";
  public success: boolean;
  constructor(
    public message: string,
    public statusCode: number,
  ) {
    super(message);
    this.statusCode = statusCode;
    // this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.status = statusCode.toString().startsWith("4") ? "fail" : "error";
    // this.status = String(statusCode).startsWith("4") ? "fail" : "error";
    this.success = false;
    Error.captureStackTrace(this, AppError);
  }
}

export default AppError;
