import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import {v1 as uuid} from 'uuid';
 
@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[]{
        return this.boards;
    }

    createBoard(title:string, description:string) {
        const board = {
            id :uuid(),  //id를 유니크한 아이디
            title : title,  // 두 가지가 동일할 경우에는 아래처럼 하나만 적어줘도 가능
            description, 
            status : BoardStatus.PUBLIC
        }
        this.boards.push(board);
        return board;
    }
}
