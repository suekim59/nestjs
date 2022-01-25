import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
 
@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[]{
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto) {
        const {title, description} = createBoardDto;

        const board : Board = {
            id :uuid(),  //id를 유니크한 아이디
            title, 
            description, 
            status : BoardStatus.PUBLIC
        }
        this.boards.push(board);
        return board;
    }
}
