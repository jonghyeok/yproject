package net.bitacademy.java41.services;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

import javax.mail.MessagingException;

import net.bitacademy.java41.dao.MemberDao;
import net.bitacademy.java41.dao.SponserDao;
import net.bitacademy.java41.vo.Kamdok;
import net.bitacademy.java41.vo.LoginInfo;
import net.bitacademy.java41.vo.Member;
import net.bitacademy.java41.vo.SponserPersonData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import sdk.mail.MailHandler;
import sdk.mail.impl.SecureMailHandler;

@Service
public class MemberServiceImpl implements MemberService {
	@Autowired PlatformTransactionManager txManager;
	@Autowired MemberDao memberDao;
	@Autowired SponserDao sponserDao;
	
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int signUp(Member member) throws Exception {
		try {
			return memberDao.signUp(member);
		} catch (Exception e) {
			throw e;
		} 
	}

	public String serchSameId(String id) throws Exception {
		return memberDao.serchSameId(id);
	}

	@Override
	public List<Member> serchKamdokId(String name) throws Exception {
		return memberDao.serchKamdokId(name);
	}

	public List<Member> getMemberList(int startIndex, int pageSize) throws Exception {
		HashMap<String,Object> params = new HashMap<String,Object>();
		params.put("startIndex", startIndex);
		params.put("pageSize", pageSize);
		
		List<Member> list = memberDao.memberlist(params);

		for(int i=0;i<list.size();i++){
			
			if(list.get(i).getLevel()==1){
				
				SponserPersonData spd = new SponserPersonData();
				
				spd.setMid(list.get(i).getId()).setSpacname("").setSppc(0);
				
				spd.setSpname(list.get(i).getName());
				
				if(sponserDao.serch_count_torysponser(spd)==0){
					sponserDao.make_sponser_data(spd);
				}
				
				list.set(i,memberDao.sponserdata(list.get(i).getId()));
				
			}
			
		}
		
		
		
		return list;
		
	}

	public int countMember() throws Exception {
		return memberDao.size();
	}

	public LoginInfo getMember(String id,String password) throws Exception {
		HashMap<String,String> paramMap = new HashMap<String,String>();
		paramMap.put("id", id);
		paramMap.put("password", password);
		LoginInfo loginInfo = memberDao.getLoginInfo(paramMap);
		return loginInfo;
	}

	@Transactional(
			propagation=Propagation.REQUIRED,
			rollbackFor=Throwable.class)
	public int changePassword(String id, String password) throws Exception {
		HashMap<String,String> paramMap = new HashMap<String,String>();
		paramMap.put("id", id);
		paramMap.put("password", password);
		return memberDao.changePassword(paramMap);
	}

	@Transactional(	propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int updateMember(Member member) throws Exception {
		if (memberDao.update(member) == 0) {
			throw new Exception("멤버 변경 오류!");
		}
		return 1;
	}

	@Transactional(
			propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public void delete(String id) throws Exception {
		try {
			memberDao.delete(id);
		} catch (Exception e) {
			throw e;
		}
	}

	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public LoginInfo getUser(String id) throws Exception {
		try{
			return memberDao.getUser(id);
		}catch(Exception e){
			throw e;
		}
	}


	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public Kamdok coachView(String id) throws Exception {
		return memberDao.coachView(id);
	}

	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int coachUpdate(Kamdok kamdok) throws Exception {
		try{
			memberDao.coachDelete(kamdok.getMid());
			return memberDao.coachAdd(kamdok);
		}catch(Exception e){
			throw e;
		}
	}

	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public void updateLevel(Member member) throws Exception {
		try {
			memberDao.updateLevel(member);
			
			if(member.getLevel()==1){
		
				SponserPersonData spd = new SponserPersonData();
				
				spd.setMid(member.getId()).setSpacname(member.getSpacname()).setSppc(member.getSppc());
				
				LoginInfo log = memberDao.getUser(member.getId());
				
				spd.setSpname(log.getName());
				
				if(sponserDao.serch_count_torysponser(spd)==0){
					sponserDao.make_sponser_data(spd);
				}else{
					sponserDao.sponser_spcname_Setup(spd);
				}
			}

		} catch (Exception e) {
			throw e;
		}
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
			mail.setSenderName("관리자");
			mail.setReceiver(email);
			mail.setSubject("Mentory");
			mail.setContent("Mentoree 비밀번호 찾기 메일입니다.\n <a href='http://yproject.cafe24.com/a-header/findPassword.html?rand="+randpw+"'>비밀번호 변경</a>");

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

