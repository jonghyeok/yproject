package net.bitacademy.java41.services;

import java.util.List;

import net.bitacademy.java41.vo.Member;
import net.bitacademy.java41.vo.TeamStudent;
import net.bitacademy.java41.vo.TeamProperty;

public interface ManagerService {
	int teamStudentAdd(TeamStudent teamStudent) throws Exception;
	List<TeamProperty> getStudentList(TeamProperty teamProperty) throws Exception;
	TeamStudent memberView(int tsbackno) throws Exception;
	List<Member> serchmemberId(String name) throws Exception;
	int teamStudentUpdate(TeamStudent teamStudent) throws Exception;
	List<TeamStudent> serchjoinmemberId(TeamStudent teamstudent) throws Exception;
	int deletestudent(TeamStudent teamStudent);
	int rollBookSend(TeamProperty teamProperty) throws Exception;
	List<TeamProperty> getPersonalList() throws Exception;
	List<TeamStudent> TeamStudentList(TeamStudent teamStudent) throws Exception;
}

