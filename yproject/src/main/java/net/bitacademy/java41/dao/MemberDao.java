package net.bitacademy.java41.dao;

import java.util.List;
import java.util.Map;

import net.bitacademy.java41.vo.Kamdok;
import net.bitacademy.java41.vo.LoginInfo;
import net.bitacademy.java41.vo.Member;

public interface MemberDao {

	LoginInfo getLoginInfo(Map<String,String> paramMap) throws Exception;
	
	List<Member> serchKamdokId(String id) throws Exception;
	
	String serchSameId(String id) throws Exception;
	
	int signUp(Member member) throws Exception;
	 
	int update(Member member) throws Exception;
	
	int levelUpdate(Map<String,String> paramMap) throws Exception;
	
	int delete(String id) throws Exception;
	
	int changePassword(Map<String,String> paramMap) throws Exception;
	
	List<Member> memberlist(Map<String,Object> params) throws Exception;
	
	int size() throws Exception;

	LoginInfo getUser(String id)throws Exception;

	Kamdok coachView(String id)throws Exception;
	
	int coachAdd(Kamdok kamdok)throws Exception;
	
	int coachDelete(String id)throws Exception;

	int updateLevel(Member member) throws Exception;

	List<Member> memberlistSearch(String text) throws Exception;
	
	int findPassword(Member member) throws Exception;
	
	int randPassword(Member member) throws Exception;
	
	String findIDtoPassword(Member memeber)throws Exception;
	
	int newPassword(Member member) throws Exception;

	int deleteIDtopassword(Member member)throws Exception;

	List<Member> getSponsorData()throws Exception;
	
	Member sponserdata(String id)throws Exception;
}




