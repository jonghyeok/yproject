package net.bitacademy.java41.services;

import java.util.List;

import net.bitacademy.java41.dao.TeamDao;
import net.bitacademy.java41.dao.TeamStudentDao;
import net.bitacademy.java41.vo.Team;
import net.bitacademy.java41.vo.TeamStudent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TeamServiceImpl implements TeamService {
	@Autowired PlatformTransactionManager txManager;
	@Autowired TeamDao teamDao;
	@Autowired TeamStudentDao teamStudentDao;
	
	public List<Team> teamList() throws Exception {
		return teamDao.teamList();  
	}

	public Team teamView(int tno) throws Exception {
		
		Team t = teamDao.teamView(tno); 
		String tinfo = t.getTinfo().replace("\n", "<br>");
		t.setTinfo(tinfo);
		return t;
	}

	public Team teamView2(int tno) throws Exception {
		return teamDao.teamView(tno);
	}
	
	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public int teamAdd(Team Team) throws Exception {
		try {
			return teamDao.teamAdd(Team);
		} catch (Throwable e) {
			throw e;
		}
	}

	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int teamUpdate(Team Team) throws Exception {
			return teamDao.teamUpdate(Team);
	}

	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public int teamDelete(int tno) throws Exception{
			return teamDao.teamDelete(tno);
	}
	
	
	public Team teamCKPassword(Team team) throws Exception {
		return teamDao.teamCKPassword(team);
	}

	public Team getMyTeamName(int tno) throws Exception {
	Team team =teamDao.getMyTeamName(tno);
		return teamDao.getMyTeamName(tno);
	}

	public int deleteteam(Team team) throws Exception {
		return teamDao.deleteteam(team);
	}

	public int tphotoadd(Team team) throws Exception {
		return teamDao.tphotoadd(team);
	}

	public int tkphotoadd(Team team) throws Exception {
		return teamDao.tkphotoadd(team);
	}
	
	public List<TeamStudent> getStudentList(int tno) throws Exception {
		return teamStudentDao.teamstudentList(tno);
	}


}

