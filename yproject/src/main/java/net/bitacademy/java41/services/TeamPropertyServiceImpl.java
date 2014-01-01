package net.bitacademy.java41.services;

import java.util.ArrayList;
import java.util.List;

import net.bitacademy.java41.dao.EvalDao;
import net.bitacademy.java41.dao.TeamGameDao;
import net.bitacademy.java41.dao.TeamPropertyDao;
import net.bitacademy.java41.dao.TeamStudentDao;
import net.bitacademy.java41.vo.EvalList;
import net.bitacademy.java41.vo.TableCk;
import net.bitacademy.java41.vo.TeamProperty;
import net.bitacademy.java41.vo.TeamStudent;
import net.bitacademy.java41.vo.calendarData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TeamPropertyServiceImpl implements TeamPropertyService {
	@Autowired PlatformTransactionManager txManager;
	@Autowired TeamPropertyDao teamPropertyDao;
	@Autowired TeamStudentDao teamStudentDao;
	@Autowired TeamGameDao teamGameDao;
	@Autowired EvalDao evalDao;
	

	public TableCk ckFindano(TeamProperty teamProperty) throws Exception{
		TeamProperty t = new TeamProperty();
		t=teamProperty;
		teamProperty=teamPropertyDao.akkFindano(t.getAno());
		
		TableCk ck = new TableCk();
		ck.setRollbookck(teamPropertyDao.rollbookck(teamProperty))
			.setTrainck(teamPropertyDao.trainck(teamProperty))
			.setGameck(teamPropertyDao.gameck(teamProperty))
			.setAno(teamProperty.getAno())
			.setAdate(teamProperty.getAdate())
			.setTname(teamProperty.getTname());
		return ck;
	}
	
	public TableCk addFindano(TeamProperty teamProperty)throws Exception{
		TableCk ck = new TableCk();
		teamPropertyDao.addFindano(teamProperty);
		TeamProperty t = new TeamProperty();
		t=teamProperty;
		teamProperty=teamPropertyDao.akkFindano(t.getAno());
		ck.setRollbookck(0)
		.setTrainck(0)
		.setGameck(0)
		.setAno(teamProperty.getAno())
		.setAdate(teamProperty.getAdate())
		.setTname(teamProperty.getTname());
		return ck;
	}
	
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public List<TeamProperty> roolbookAdd(TeamProperty teamProperty) throws Exception {
		teamProperty =  teamPropertyDao.findactivity(teamProperty); //tno가져와야됨
		List<TeamStudent> ts = teamStudentDao.teamstudentList(teamProperty.getTno()); //학생 목록 가져옴
		for(TeamStudent t : ts){
			teamProperty.setTsno(t.getTsno());//학생번호 넣음
			teamPropertyDao.rollbookAdd(teamProperty); //학생 1명에 대한 출석 기본 데이터 생성
		}
		return teamPropertyDao.load_roolbook(teamProperty);
	}
	
	
	public List<TeamProperty> load_roolbook(TeamProperty teamProperty) throws Exception{
		return  teamPropertyDao.load_roolbook(teamProperty);
	}

	
	public int rollbookUpate(List<TeamProperty> teamProperty)throws Exception{
		if(teamProperty != null){
			for(int i=0; i<teamProperty.size(); i++){
				teamPropertyDao.rollbookUpate(teamProperty.get(i));
			}
			return 1;
		}else{
			return 0;
		}
	}
	
	
	public List<TableCk> getADATEList(int tno)throws Exception{
		ArrayList<TableCk> tableCks = new ArrayList<TableCk>(); //해당 팀 최종 달력에 뿌려줄 데이터
		List<TeamProperty> teamano = teamPropertyDao.teamADATElistget(tno); // 해당 날짜의 ano 저장소 
		for(int i=0;i< teamano.size();i++){ // 해당 날짜의 저장소만큼 돌려줌
			TableCk ck = new TableCk();
			TeamProperty t=new TeamProperty();
			calendarData cad_imp = new calendarData();
			t=teamano.get(i);
			List<TeamProperty> tpp =teamPropertyDao.manager_load_roolbook(t);
			List<TeamProperty> eval_ts = teamPropertyDao.manager_load_train(t);
			
			String off_ts = "";
			for(int j=0; j<tpp.size(); j++){
				if(tpp.get(j).getRstatus() == 0 ){
				off_ts += tpp.get(j).getTsname()+"  ";
				}
			}
			cad_imp.setOffstudents(off_ts);
			
			String off_eval_ts = "";
			for(int z=0; z<eval_ts.size(); z++){
				off_eval_ts += eval_ts.get(z).getTsname()+", ";
			}
			cad_imp.setEvaloffstduents(off_eval_ts);
			
			
			String gamedata = "";
			TeamProperty tge = teamGameDao.serchGameTotal_gpe(t);
			TeamProperty tgs = teamGameDao.serchGameTotal_gps(t);
		
			if(tge == null || tgs == null){
				tge = new TeamProperty();
				gamedata = "해당 날짜의 경기 기록이 저장되있지 않습니다.";
			}else{
				gamedata = tgs.getGstart()+"(HOME) vs " + tgs.getGend() + "(GUEST) <br> 점수 : " + tgs.getGpstotal() + " : " + tge.getGpetotal();   
			}
			
			int a = teamPropertyDao.rollbookck(t);
			int b = teamPropertyDao.trainck(t);
			int c = teamPropertyDao.gameck(t);
			
			if(a>0){
				a=1;
			}
			
			if(b>0){
				b=1;
			}
			 
			if(c>0){
				
				c=1;
			}else{
				gamedata="";
			}
			
			cad_imp.setTeamGameResult(gamedata);
			
			ck.setAdate(t.getAdate())
				.setAno(t.getAno())
				.setTname(t.getTname())
				.setRollbookck(a)
				.setTrainck(b)
				.setGameck(c);
			
			
			ck.setCalendardata(cad_imp);
			
			tableCks.add(ck);
		}
		return tableCks;
	}
	
	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public List<TeamProperty> addTrain(TeamProperty teamProperty)throws Exception{
		TeamProperty tp = teamPropertyDao.tnoFindano(teamProperty);
		int tno =  teamPropertyDao.tcountFind(tp);
		tp.setTcount(tno+1);
		List<TeamStudent> ts = teamStudentDao.teamstudentList(tp.getTno());
		List<EvalList> ev = evalDao.evalationListGet(); 
		teamPropertyDao.trainAdd(tp);
		for(TeamStudent t : ts){
			tp.setTsno(t.getTsno());
				teamPropertyDao.train_recordAdd(tp);
			for(EvalList e : ev){
				tp.setElno(e.getElno());
				teamPropertyDao.evalationAdd(tp);
			}
		}
		return  teamPropertyDao.load_train(teamProperty);
	}
	
	
	
	public List<TeamProperty> load_train(TeamProperty teamProperty) throws Exception {
		return teamPropertyDao.load_train(teamProperty);
	}
	
	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public int trainUpdate(List<TeamProperty> trainkList) throws Exception {
		if(trainkList != null){
			for(int i=0; i<trainkList.size(); i++){
				teamPropertyDao.trainUpdate(trainkList.get(i));
			}
			return 1;
		}else{
			return 0;
		}
	}

	
	public int getRollBookCount(TeamProperty teamProperty)throws Exception{
		return teamPropertyDao.getRollbookcount(teamProperty);
	}
	
	
	//그외 기능들...........*******************************
	public int cktable(TeamProperty tp) throws Exception {
		int no=9;
		int resultNo = 0;

		try{
			List<TeamProperty> list;
			list = teamPropertyDao.teamADATElistget(tp.getTno());
			if(list.size() != 0){
				for(TeamProperty teamP : list){
					no=teamPropertyDao.teamADATEck(teamP);
					if(no==0){
						resultNo=3;
						break;
					}else{
						resultNo=2;
					}
				}
			}else{
				resultNo=1;
			}
		}catch(Exception e){
			resultNo = 0;
		}
		return resultNo;
	}
	
	
}

