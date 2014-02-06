package net.bitacademy.java41.services;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Random;

import javax.mail.MessagingException;

import net.bitacademy.java41.dao.ManagerDao;
import net.bitacademy.java41.vo.Member;
import net.bitacademy.java41.vo.TeamStudent;
import net.bitacademy.java41.vo.TeamProperty;
import net.bitacademy.java41.dao.MemberDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import sdk.mail.MailHandler;
import sdk.mail.impl.SecureMailHandler;



@Service
public class ManagerServiceImpl implements ManagerService {
	@Autowired PlatformTransactionManager txManager;
	@Autowired MemberDao memberDao;
	@Autowired ManagerDao managerDao;

	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int teamStudentAdd(TeamStudent teamStudent) throws Exception {
		try {
			return managerDao.teamStudentAdd(teamStudent);
		} catch (Throwable e) {
			throw e;
		}
	}
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int teamStudentUpdate(TeamStudent teamstudent) throws Exception {
		try{
			if(teamstudent.getTsgrad() == null){
				return managerDao.teamStudentUpdate(teamstudent);
			}
			else{
				return managerDao.teamStudentUpdate2(teamstudent);
			}
		}catch(Throwable e){
			throw e ;
		}
	}
	
	public List<TeamStudent> serchjoinmemberId(TeamStudent teamstudent) throws Exception {
		return managerDao.serchjoinmemberId(teamstudent);
	}
	
	@Override
	public int deletestudent(TeamStudent teamStudent) {
		return managerDao.deletestudent(teamStudent);
	}
	
	public List<TeamProperty> getStudentList(TeamProperty teamProperty) throws Exception {
		return managerDao.studentList(teamProperty);
	}
	
	@Override
	public List<Member> serchmemberId(String name) throws Exception {
		return managerDao.serchmemberId(name);
	}
	
	
	public TeamStudent memberView(int tsbackno) throws Exception {
		return managerDao.memberView(tsbackno);
	}

	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	@Override
	public int rollBookSend(TeamProperty teamProperty) throws Exception{
		return managerDao.rollbookSend(teamProperty);
	}

	public List<TeamProperty> getPersonalList() throws Exception{
		return managerDao.personalList();
	}

	public List<TeamStudent> TeamStudentList(TeamStudent teamStudent)  throws Exception{
		return managerDao.TeamStudentList(teamStudent);
	}
	
	public String findPassword(String id, String email) throws Exception {
		Member member = new Member();
		member.setId(id).setEmail(email);
		if (memberDao.findPassword(member) == 1) {
			String randpw=getRandomText(10,10);
			member.setRandpw(randpw);
			member.setId(id);
			memberDao.randPassword(member);

			MailHandler mail = new SecureMailHandler("spms.manager@gmail.com", "spmsadmin");
			mail.setMailServer("smtp.gmail.com");
			mail.setSender("spms.manager@gmail.com");
			mail.setSenderName("테스터");
			mail.setReceiver(email);
			mail.setSubject("Mentory");
			mail.setContent("G 메일 테스트용 메일입니다.\n <a href='http://localhost:9999/yproject/a-header/findPassword.html?rand="+randpw+"'>비밀번호 변경</a>");

			try {
				mail.SendMail();
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			} catch (MessagingException e) {
				e.printStackTrace();
			}

			return "aa";
		}else{
			return "fail";		
		}
	}

	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public List<Member> getMemberListSearch(String text) throws Exception {
		return memberDao.memberlistSearch(text);
	}

	public int newPassword(Member member)throws Exception{
		String id = memberDao.findIDtoPassword(member);
		member.setId(id);
		memberDao.newPassword(member);
		memberDao.deleteIDtopassword(member);
		return 1;
	}


	public String getRandomText(int textSize , int rmSeed){
		/* 입력받은 수 만큼 렌덤 문자를 만들어 반환한다. 
		 * 난수를 발생시켜 이에 대응하는 알파뱃 문자를 생성한다.
		 * 생성된 알파뱃을 연결해 하나의 랜덤 문자를 만든다. 
		 * */

		String rmText = "";
		Random random = new Random(System.currentTimeMillis());
		int rmNum = 0;
		char ch = 'a';
		for (int i = 0; i < textSize; i++) {
			random.setSeed(System.currentTimeMillis() * rmSeed * i + rmSeed + i);
			rmNum = random.nextInt(25);
			ch += rmNum;
			rmText = rmText + ch ;
			ch = 'a';
		}
		return rmText; 
	}
}


