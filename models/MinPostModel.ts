import { PostEntity } from '../entities/PostEntity';

/**
    *  @example
    *  {
    *    "id": 1,
    *    "user_id": 1,
    *    "name": "Post 1",
    *    "text": "This is a post",
    *    "image_url": "https://a.ppy.sh/1",
    *    "createdAt": "2021-04-20T20:00:00.000Z"
    * }
*/

export class MinPostModel
{
    id: number = 0;
    name: string = "";
    text: string = "";
    image_url: string = "";
    createdAt: Date = new Date();
    
    constructor(PostEntity: PostEntity)
    {
        this.id = PostEntity.id;
        this.name = PostEntity.name;
        this.text = PostEntity.text;
        this.image_url = PostEntity.image_url;
        this.createdAt = PostEntity.createdAt;
    }
}