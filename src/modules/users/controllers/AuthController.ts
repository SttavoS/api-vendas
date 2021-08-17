import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class AuthController {
  async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticate = new LoginService();

    const user = await authenticate.execute({ email, password });

    return response.json(user);
  }
}
