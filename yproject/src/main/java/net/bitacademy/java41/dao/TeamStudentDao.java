package net.bitacademy.java41.dao;

import java.util.List;

import net.bitacademy.java41.vo.TeamStudent;


public interface TeamStudentDao {

	List<TeamStudent> teamstudentList(int tno)throws Exception;
	
	
}
