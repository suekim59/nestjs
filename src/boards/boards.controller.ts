import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get('/')
    getAllboard() :Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }
    // @Get('/')
    // getAllBoards():Board[] {
    //     return this.boardsService.getAllBoards();
    // }


    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() CreateBoardDto: CreateBoardDto ) : Promise<Board> {
        return this.boardsService.createBoard(CreateBoardDto);
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
    deleteBoard(@Param('id', ParseIntPipe) id) :Promise<void> {
        return this.boardsService.deleteBoard(id);
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
