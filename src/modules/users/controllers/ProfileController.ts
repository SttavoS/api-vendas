import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';
import { classToClass } from 'class-transformer';

export default class ProfileController {
  async show(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowProfileService();
    const user_id = request.user.id;

    const user = await showProfile.execute({ user_id });

    return response.json(classToClass(user));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const updateProfile = new UpdateProfileService();
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;

    const user = await updateProfile.execute({
      id: user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.json(classToClass(user));
  }
}
