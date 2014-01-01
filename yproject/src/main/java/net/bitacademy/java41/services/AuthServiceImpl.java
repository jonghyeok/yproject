package net.bitacademy.java41.services;

import java.util.HashMap;

import net.bitacademy.java41.dao.MemberDao;
import net.bitacademy.java41.vo.LoginInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
	@Autowired MemberDao memberDao;
	
	public LoginInfo getLoginInfo(String id, String password) throws Exception {
		HashMap<String,String> paramMap = new HashMap<String,String>();
		paramMap.put("id", id);
		paramMap.put("password", password);
		LoginInfo loginInfo = memberDao.getLoginInfo(paramMap);
		return loginInfo;
	}

}














