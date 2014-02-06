package net.bitacademy.java41.services;

import java.util.List;

import net.bitacademy.java41.vo.Team;
import net.bitacademy.java41.vo.TeamStudent;

public interface TeamService {
	List<Team> teamList() throws Exception;
	
	Team teamView(int tno) throws Exception;
	
	int teamAdd(Team team) throws Exception;

	int teamUpdate(Team team) throws Exception;

	
	Team getMyTeamName(int tno)throws Exception;
	
	Team teamCKPassword(Team team)throws Exception;

	int deleteteam(Team team) throws Exception;

	int tphotoadd(Team team) throws Exception;

	int tkphotoadd(Team team) throws Exception;

	List<TeamStudent> getStudentList(int tno) throws Exception;
	
	Team teamView2(int tno) throws Exception;
}













