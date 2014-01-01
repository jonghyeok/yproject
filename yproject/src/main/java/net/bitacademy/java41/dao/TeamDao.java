package net.bitacademy.java41.dao;

import java.util.List;

import net.bitacademy.java41.vo.Team;

public interface TeamDao {
	List<Team> teamList() throws Exception;
	
	Team teamView(int tno) throws Exception;
	
	Team getMyTeamName(int tno )throws Exception;
	int teamAdd(Team team) throws Exception;

	int teamUpdate(Team team) throws Exception;

	int teamDelete(int tno) throws Exception;
	
	Team teamCKPassword(Team team)throws Exception;

	int deleteteam(Team team) throws Exception;

	int tphotoadd(Team team) throws Exception;

	int tkphotoadd(Team team) throws Exception;
}
