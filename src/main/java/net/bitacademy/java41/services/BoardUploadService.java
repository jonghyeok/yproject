package net.bitacademy.java41.services;

import java.util.List;

import net.bitacademy.java41.vo.Board;


public interface BoardUploadService {
	void addFileUpload(Board board) throws Exception;
	List<Board> getPhotoList() throws Exception;
	void photoDelete(int ino) throws Exception;
	void photoUpdate(Board board) throws Exception;
}













