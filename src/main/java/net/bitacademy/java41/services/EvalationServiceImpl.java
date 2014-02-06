package net.bitacademy.java41.services;

import java.util.List;

import net.bitacademy.java41.dao.EvalDao;
import net.bitacademy.java41.vo.EvalList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EvalationServiceImpl implements EvalationService{
	
	@Autowired EvalDao evalDao;
	
	public List<EvalList> evalationListGet() throws Exception {
		return evalDao.evalationListGet();
	}

	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int evalationListAdd(EvalList eval) throws Exception {
		return evalDao.evalationListAdd(eval);
	}

	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int updateEvalationList(EvalList eval) throws Exception {
		return evalDao.updateEvalationList(eval);
	}
	
	
}
