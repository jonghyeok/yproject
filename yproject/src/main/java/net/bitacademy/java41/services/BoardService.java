package net.bitacademy.java41.services;

import java.util.List;

import net.bitacademy.java41.vo.Board;

public interface BoardService {
	int boardAdd(Board board) throws Exception;
	List<Board> getBoardList(int start_Index, int pageSize) throws Exception;
	Board boardView(int bno) throws Exception;
	int boardDelete(int bno) throws Exception;
	int boardUpdate(Board board) throws Exception;
	int countnotice() throws Exception;
}
