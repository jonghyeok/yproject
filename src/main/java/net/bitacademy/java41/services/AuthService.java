package net.bitacademy.java41.services;

import net.bitacademy.java41.vo.LoginInfo;

public interface AuthService {
	LoginInfo getLoginInfo(String id, String password) throws Exception;
}

