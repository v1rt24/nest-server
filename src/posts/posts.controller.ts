import {Body, Controller, Post} from '@nestjs/common';
import {PostsService} from './posts.service';
import {Post as PostModel} from './post.model';
import {CreatePostDto} from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) {
    }

    @Post()
    create(@Body() postDto: CreatePostDto): Promise<PostModel> {
        return this.postService.createPost(postDto);
    }
}
