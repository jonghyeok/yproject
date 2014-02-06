package net.bitacademy.java41.dao;

import java.util.List;

import net.bitacademy.java41.vo.Member;
import net.bitacademy.java41.vo.TeamStudent;
import net.bitacademy.java41.vo.TeamProperty;

public interface ManagerDao {
	
	public List<Member> serchmemberId(String name) throws Exception;
	
	int teamStudentAdd(TeamStudent teamStudent) throws Exception;

	List<TeamProperty> studentList(TeamProperty teamProperty) throws Exception;
	
	TeamStudent memberView(int tsbackno);

	public int teamStudentUpdate(TeamStudent teamstudent);

	public List<TeamStudent> serchjoinmemberId(TeamStudent teamstudent);

	public int deletestudent(TeamStudent teamStudent);

	int rollbookSend(TeamProperty teamProperty) throws Exception;

	List<TeamProperty> personalList() throws Exception;

	public List<TeamStudent> TeamStudentList(TeamStudent teamStudent) throws Exception;

	public int teamStudentUpdate2(TeamStudent teamstudent);

}
