import { Request, Response, NextFunction } from "express";


export const doubleCsrf = jest.fn(() => ({
  doubleCsrfProtection: (req: Request, res: Response, next: NextFunction) =>
    next(),
}));
