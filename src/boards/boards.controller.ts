import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    private logger = new Logger('BoardsController');//로거 객체 생성
    constructor(private boardsService: BoardsService) {}

    @Get('/')
    getAllboard(
        @GetUser() user:User
    ) :Promise<Board[]> {
        this.logger.verbose(`User ${user.username} trying to get all boards`);
        //VERBOSE [BoardsController] User user2 trying to get all boards
        return this.boardsService.getAllBoards(user);
    }
    // @Get('/')
    // getAllBoards():Board[] {
    //     return this.boardsService.getAllBoards();
    // }


    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto,
    @GetUser() user:User ) : Promise<Board> {
        this.logger.verbose(`User ${user.username} creating a new board. Payload: ${JSON.stringify(createBoardDto)}`)
        return this.boardsService.createBoard(createBoardDto, user);
    }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     //express에서는 req.body
    //     @Body() createBoardDto : CreateBoardDto
    //     ) : Board {
    //         return this.boardsService.createBoard(createBoardDto);
    // }

    @Get('/:id')
    getBoardById(@Param('id') id:number) : Promise<Board> {
        return this.boardsService.getBoardById(id);
    }
    // @Get('/:id')
    // getBoardById(@Param('id') id:string):Board {
    //     return this.boardsService.getBoardById(id);
    // }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id,
    @GetUser() user:User
    ) :Promise<void> {
        return this.boardsService.deleteBoard(id, user);
    }

    // @Delete('/:id')
    // deleteBoard(@Param('id') id:string):void {
    //     this.boardsService.deleteBoard(id);
    // }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id:number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ) {
        return this.boardsService.updateBoardStatus(id, status);
    }
      // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id:string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus
    // ) {
    //     return this.boardsService.updateBoardStatus(id, status);
    // }
}
