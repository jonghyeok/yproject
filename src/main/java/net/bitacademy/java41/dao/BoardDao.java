package net.bitacademy.java41.dao;

import java.util.List;
import java.util.Map;

import net.bitacademy.java41.vo.Board;


public interface BoardDao {

	int boardAdd(Board board) throws Exception ;
	
	List<Board> boardList(Map<String,Object> params) throws Exception;
	
	Board boardView(int bno) throws Exception;

	int boardDelete(int bno) throws Exception;

	int boardUpdate(Board board) throws Exception;

	int countUp(Board board)throws Exception;

	int countnotice() throws Exception;
	
	
}
