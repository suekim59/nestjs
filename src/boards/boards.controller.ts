import { Controller } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {

    constructor(private boardsService: BoardsService) {}

    //이런 식으로 사용 가능
    //this.boardsService.getAllBoards();
}
