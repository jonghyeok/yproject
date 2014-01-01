package net.bitacademy.java41.vo;


public class LoginInfo {

	private String 	id;
	private String 	name;
	private String 	email;
	private int 	pno;
	private String postno;
	private String address;
	private String detAddr;
	private String phone;
	private int	level;
	private int tno;


	
	
	public int getTno() {
		return tno;
	}
	public LoginInfo setTno(int tno) {
		this.tno = tno;
		return this;
	}
	public String getDetAddr() {
		return detAddr;
	}
	public LoginInfo setDetAddr(String detAddr) {
		this.detAddr = detAddr;
		return this;
	}
	public String getId() {
		return id;
	}
	public LoginInfo setId(String id) {
		this.id = id;
		return this;
	}
	public String getName() {
		return name;
	}
	public LoginInfo setName(String name) {
		this.name = name;
		return this;
	}
	public String getEmail() {
		return email;
	}
	public LoginInfo setEmail(String email) {
		this.email = email;
		return this;
	}
	public int getPno() {
		return pno;
	}
	public LoginInfo setPno(int pno) {
		this.pno = pno;
		return this;
	}
	public String getPostno() {
		return postno;
	}
	public LoginInfo setPostno(String postno) {
		this.postno = postno;
		return this;
	}
	public String getAddress() {
		return address;
	}
	public LoginInfo setAddress(String address) {
		this.address = address;
		return this;
	}
	public String getPhone() {
		return phone;
	}
	public LoginInfo setPhone(String phone) {
		this.phone = phone;
		return this;
	}
	public int getLevel() {
		return level;
	}
	public LoginInfo setLevel(int level) {
		this.level = level;
		return this;
	}


}
