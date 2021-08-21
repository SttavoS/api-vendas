import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class AvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      // TODO: Refatorar, pq parece gambiarra
      avatarFileName: request.file?.filename as string,
    });

    return response.json(user);
  }
}
