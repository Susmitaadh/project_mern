import User from "../models/user.model";
import { catchAsync } from "../utils/catchAsync.utils";
import { sendResponse } from "../utils/sendResponse.utils";

export const getAll = catchAsync(async (req, res) => {
  const filter: any = {};
  const { role } = req.query;

  if (role) {
    filter.role = role;
  }
  const users = await User.find(filter);

  sendResponse(res, {
    message: `All ${role ?? "Users"} fetched`,
    data: users,
    statusCode: 200,
  });
});
