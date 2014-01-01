package net.bitacademy.java41.services;

import java.util.HashMap;
import java.util.List;

import net.bitacademy.java41.dao.BoardDao;
import net.bitacademy.java41.vo.Board;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;



@Service
public class BoardServiceImpl implements BoardService{
	@Autowired PlatformTransactionManager txManager;
	@Autowired BoardDao boardDao;
	
	@Override	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int boardAdd(Board board) throws Exception {
		try {
			return boardDao.boardAdd(board);
		} catch (Throwable e) {
			throw e;
		}
	}
	
	public List<Board> getBoardList(int start_Index, int pageSize) throws Exception {
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("start_Index", start_Index);
		params.put("pageSize", pageSize);
		return boardDao.boardList(params);
	}
	
	public Board boardView(int bno) throws Exception {
		 Board b = boardDao.boardView(bno);
		 b.setBcount(b.getBcount()+1); 
		 boardDao.countUp(b);
		 return	b;
	}
	
	public int boardDelete(int bno) throws Exception{
		try {
			return boardDao.boardDelete(bno);
		} catch (Exception e) {
			throw e;
		} 
	}

	@Transactional(propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public int boardUpdate(Board board) throws Exception {
		try {
			return boardDao.boardUpdate(board);
		} catch (Exception e) {
			throw e;
		} 
	}

	@Override
	public int countnotice() throws Exception {
		return boardDao.countnotice();
	}
	
}
