package net.bitacademy.java41.services;

import java.util.List;

import net.bitacademy.java41.vo.EvalList;


public interface EvalationService {
	
	
	List<EvalList> evalationListGet()throws Exception;
	
	int evalationListAdd(EvalList eval)throws Exception;
	
	int updateEvalationList(EvalList eval)throws Exception;
}

