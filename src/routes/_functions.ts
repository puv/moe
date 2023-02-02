import { NextFunction, Request, Response } from "express";

async function checkAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  } else res.redirect("/auth?href=" + req._parsedUrl.href);
}

async function checkUnAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    return next();
  }

  res.redirect("/");
}

export { checkAuthenticated as isAuth, checkUnAuthenticated as isUnAuth }
