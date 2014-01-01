package net.bitacademy.java41.dao;

import java.util.List;

import net.bitacademy.java41.vo.TeamProperty;

public interface TeamPropertyDao {

	int activityAdd(TeamProperty temProperty)throws Exception;
	

	
	int trainAdd(TeamProperty temProperty)throws Exception;
	
	void evalationAdd(TeamProperty teamProperty)throws Exception;

	int train_recordAdd(TeamProperty teamProperty)throws Exception;
	
	
	String findLastTcount(int ano)throws Exception;
	
	List<TeamProperty> teamADATElistget(int tno)throws Exception;
	
	int teamADATEck(TeamProperty teamProperty)throws Exception;
	
	
	int gameAdd(TeamProperty teamProperty)throws Exception;
	
	
	//팀 테이블 체크 관련
	int rollbookck(TeamProperty teamProperty)throws Exception;
	int trainck(TeamProperty teamProperty)throws Exception;
	int gameck(TeamProperty teamProperty)throws Exception;
	
	//팀 ano가 0일때 생성시켜주는 것
	int addFindano(TeamProperty teamProperty)throws Exception;
	
	//ativity에서 ano를 넣고 tno를 빼옴
	TeamProperty findactivity(TeamProperty teamProperty)throws Exception;
	
	//출석부 생성
	void rollbookAdd(TeamProperty teamProperty)throws Exception;

	//출석부 불러오기
	List<TeamProperty>load_roolbook(TeamProperty temProperty)throws Exception;
	
	List<TeamProperty>manager_load_roolbook(TeamProperty temProperty)throws Exception;
	
	//출석부 업데이트
	int rollbookUpate(TeamProperty teamProperty)throws Exception;


	//훈련자료 불러오기
	List<TeamProperty> load_train(TeamProperty teamProperty)throws Exception;
	
	//훈련 회차 알아내기
	int tcountFind(TeamProperty teamProperty)throws Exception;
	
	//ano로 tno 알아내기
	TeamProperty tnoFindano(TeamProperty teamProperty)throws Exception;

	//평가 업데이트
	int trainUpdate(TeamProperty teamProperty)throws Exception;
	
	TeamProperty akkFindano(int teamProperty)throws Exception;
	
	//출석기록 갯수 알아보기
	int getRollbookcount(TeamProperty teamProperty)throws Exception;
	
	List<TeamProperty> findNocheckStudent(TeamProperty teamProperty);


	List<TeamProperty> manager_load_train(TeamProperty teamProperty)throws Exception;
	
}
