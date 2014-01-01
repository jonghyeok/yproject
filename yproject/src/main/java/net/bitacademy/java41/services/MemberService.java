package net.bitacademy.java41.services;

import java.util.List;

import net.bitacademy.java41.vo.Kamdok;
import net.bitacademy.java41.vo.LoginInfo;
import net.bitacademy.java41.vo.Member;

public interface MemberService {
	int signUp(Member member) throws Exception;
	String serchSameId(String id) throws Exception;
	List<Member> serchKamdokId(String name)throws Exception;
	LoginInfo getMember(String id,String password) throws Exception;
	int updateMember(Member member) throws Exception;
	void delete(String id) throws Exception;
	List<Member> getMemberList(int startIndex, int pageSize) throws Exception;
	public int countMember() throws Exception;
	int changePassword(String id, String changepass) throws Exception;
	LoginInfo getUser(String id) throws Exception;
	Kamdok coachView(String id) throws Exception;
	int coachUpdate(Kamdok kamdok)throws Exception;
	void updateLevel(Member member)throws Exception;
	List<Member> getMemberListSearch(String text) throws Exception;
	String findPassword(String id, String email) throws Exception;
	int newPassword(Member member) throws Exception;
}
