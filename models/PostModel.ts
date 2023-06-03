
import { MinPostModel } from './MinPostModel';

export class PostModel extends MinPostModel
{
    id: number = 0;
    user_id: number = 0;
    likes: number = 0;
}