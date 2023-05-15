import { Request, Response, NextFunction } from 'express';
import statusCode from '../utils/statusCode';

async function validateTeamLogic(req: Request, res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    return res.status(statusCode.unprocessable).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }
  next();
}

export default validateTeamLogic;
