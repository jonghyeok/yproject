package net.bitacademy.java41.dao;

import java.util.List;

import net.bitacademy.java41.vo.EvalList;

public interface EvalDao {

	List<EvalList> evalationListGet()throws Exception;
	
	int evalationListAdd(EvalList eval)throws Exception;
	
	int updateEvalationList(EvalList eval)throws Exception;
}
