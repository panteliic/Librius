import passport from "../passport"; // PROVERI DA LI JE PUTANJA DOBRA
import { Request, Response, NextFunction } from "express";

export const optionalAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies?.accessToken) {
    return next(); // Ako nema tokena, nastavlja bez prijave
  }

  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (user) {
      (req as any).user = user;
    }
    next();
  })(req, res, next);
};
