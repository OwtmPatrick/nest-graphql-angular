import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Comment } from './entities/comment.entity';
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    return this.commentsService.create(createCommentInput);
  }

  @Query(() => Comment, { name: 'comment' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.commentsService.findOne(id);
  }

  @Mutation(() => Comment)
  updateComment(
    @Args('updateCommentInput')
    updateCommentInput: UpdateCommentInput,
  ) {
    return this.commentsService.update(
      updateCommentInput.id,
      updateCommentInput,
    );
  }

  @Mutation(() => Comment)
  removeComment(@Args('id', { type: () => String }) id: string) {
    return this.commentsService.remove(id);
  }
}
