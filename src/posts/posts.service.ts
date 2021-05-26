import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Post} from './post.model';
import {CreatePostDto} from './dto/create-post.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post)
        private readonly postModel: typeof Post,
    ) {
    }

    async createPost(postDto: CreatePostDto): Promise<Post> {
        try {
            return await this.postModel.create(postDto);
        } catch (error) {
            console.log(error);
        }
    }
}
