import { NextFunction, Request, Response } from "express";
// import httpStatus from 'http-status'
const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(400).json({
    success: false,
    message: "API not found",
    error: "",
  });
};

export default notFound;
