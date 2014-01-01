package net.bitacademy.java41.services;

import java.util.List;






import net.bitacademy.java41.dao.BoardUploadDao;
import net.bitacademy.java41.vo.Board;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;

@Service
public class BoardUploadServiceImpl implements BoardUploadService {
	@Autowired PlatformTransactionManager txManager;
	@Autowired BoardUploadDao boardUploadDao;
	@Override
	public void addFileUpload(Board board) throws Exception {
		boardUploadDao.addFile(board);
	}

	public List<Board> getPhotoList() throws Exception {
		return boardUploadDao.photoList();
	}


	public void photoDelete(int ino) throws Exception {
		boardUploadDao.photoDelete(ino);
	}

	
	public void photoUpdate(Board board) throws Exception {
		boardUploadDao.photoUpdate(board);
	}

}

