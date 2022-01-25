import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Board } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get('/')
    getAllBoards():Board[] {
        return this.boardsService.getAllBoards();
    }

    @Post()
    createBoard(
        //express에서는 req.body
        @Body() createBoardDto : CreateBoardDto
        ) : Board {
            return this.boardsService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id:string):Board {
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id:string):void {
        this.boardsService.deleteBoard(id);
    }
}
