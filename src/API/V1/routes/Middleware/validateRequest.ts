import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
import log from "../../../../utils/logger";

export const validateRequest = (schema: AnySchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (e: any) {
      log.error(e);

      return res.status(400).send(e.errors);
    }
  };
};
