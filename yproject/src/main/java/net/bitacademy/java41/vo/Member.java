package net.bitacademy.java41.vo;

import java.io.Serializable;
import java.util.Date;

public class Member implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String 	id;		// 아이디
	private int 	tno;
	private String 	name;	// 이름
	private String 	password;// 비밀번호
	private String 	email;	//이메일
	private String 	postno;	//우편번호
	private String 	address;//주소
	private String 	detAddr;//상세주소
	private String 	phone; // 휴대폰 번호
	private Date 	regDate; // 가입일
	private int	level;		//등급
	private String randpw;
	
	private String spacname;
	private int sppc;
	
	
	
	public String getSpacname() {
		return spacname;
	}
	public Member setSpacname(String sppcname) {
		this.spacname = sppcname;
		return this;

	}
	public int getSppc() {
		return sppc;
	}
	public Member setSppc(int sppc) {
		this.sppc = sppc;
		return this;

	}
	public String getRandpw() {
		return randpw;
	}
	public Member setRandpw(String randpw) {
		this.randpw = randpw;
		return this;
	}
	public int getTno() {
		return tno;
	}
	public Member setTno(int tno) {
		this.tno = tno;return this;
	}
	public String getDetAddr() {
		return detAddr;
	}
	public Member setDetAddr(String detAddr) {
		this.detAddr = detAddr;
		return  this;
	}
	public String getId() {
		return id;
	}
	public Member setId(String id) {
		this.id = id;
		return this;
	}
	public String getName() {
		return name;
	}
	public Member setName(String name) {
		this.name = name;
		return this;
	}
	public String getPassword() {
		return password;
	}
	public Member setPassword(String password) {
		this.password = password;
		return this;
	}
	public String getEmail() {
		return email;
	}
	public Member setEmail(String email) {
		this.email = email;
		return this;
	}

	public String getPostno() {
		return postno;
	}
	public Member setPostno(String postno) {
		this.postno = postno;
		return this;
	}
	public String getAddress() {
		return address;
	}
	public Member setAddress(String address) {
		this.address = address;
		return this;
	}

	public String getPhone() {
		return phone;
	}
	public Member setPhone(String phone) {
		this.phone = phone;
		return this;
	}
	public Date getRegDate() {
		return regDate;
	}
	public Member setRegDate(Date regDate) {
		this.regDate = regDate;
		return this;
	}
	public int getLevel() {
		return level;
	}
	public Member setLevel(int level) {
		this.level = level;
		return this;
	}
	
	
}

