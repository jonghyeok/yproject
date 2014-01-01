package net.bitacademy.java41.dao;

import java.util.List;

import net.bitacademy.java41.vo.Board;


public interface BoardUploadDao {

	void addFile(Board board) throws Exception;

	List<Board> photoList() throws Exception;

	void photoDelete(int ino) throws Exception;

	void photoUpdate(Board board) throws Exception;
	
}
