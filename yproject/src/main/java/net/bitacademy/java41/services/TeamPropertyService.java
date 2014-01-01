package net.bitacademy.java41.services;

import java.util.List;

import net.bitacademy.java41.vo.TableCk;
import net.bitacademy.java41.vo.TeamProperty;


public interface TeamPropertyService {

	int cktable(TeamProperty tp)throws Exception;
	
	List<TableCk> getADATEList(int tno)throws Exception;
	
	
	//팀 테이블 유무확인
	TableCk ckFindano(TeamProperty teamProperty)throws Exception;
	
	//팀 ano가 0을 받으면 생성을 해서 ano를 리턴해줌
	TableCk addFindano(TeamProperty teamProperty)throws Exception;

	//팀 ano를 기준으로 tno를 찾고 학생 출석 기본 데이터를 넣고 생성해줌.
	List<TeamProperty> roolbookAdd(TeamProperty teamProperty) throws Exception;
	
	//팀 ano를 기준으로 학생 출석 데이터를 가져옴.
	List<TeamProperty> load_roolbook(TeamProperty teamProperty) throws Exception; 
	
	//출석부 업데이트
	int rollbookUpate(List<TeamProperty> teamProperty)throws Exception;

	//훈련기록 자료 가져오기
	List<TeamProperty> load_train(TeamProperty teamProperty)throws Exception;
	
	//훈련 회차 구하기
	List<TeamProperty> addTrain(TeamProperty teamProperty)throws Exception;

	int trainUpdate(List<TeamProperty> trainkList)throws Exception;
	
	int getRollBookCount(TeamProperty teamProperty)throws Exception;
}

