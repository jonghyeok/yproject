package net.bitacademy.java41.vo;


public class Team {
	
	private int tno;
	private String tinfo;
	private String tkname;
	private String tname;
	private String tkinfo;
	private String tkphoto;
	private String tphoto;
	private String tcoordx;
	private String tcoordy;
	private int    tuse;
	private String taddress;
	private String name;
	
	
	
	
	public String getName() {
		return name;
	}
	public Team setName(String name) {
		this.name = name;return this;
	}
	public String getTcoordx() {
		return tcoordx;
	}
	public Team setTcoordx(String tcoordx) {
		this.tcoordx = tcoordx;return this;
	}
	public String getTcoordy() {
		return tcoordy;
	}
	public Team setTcoordy(String tcoordy) {
		this.tcoordy = tcoordy;return this;
	}
	public String getTname() {
		return tname;
	}
	public Team setTname(String tname) {
		this.tname = tname;
		return this;
	}
	public int getTno() {
		return tno;
	}
	public Team setTno(int tno) {
		this.tno = tno;
		return this;
	}
	public String getTinfo() {
		return tinfo;
	}
	public Team setTinfo(String tinfo) {
		this.tinfo = tinfo;
		return this;
	}
	public String getTkname() {
		return tkname;
	}
	public Team setTkname(String tkname) {
		this.tkname = tkname;
		return this;
	}
	public String getTkinfo() {
		return tkinfo;
	}
	public Team setTkinfo(String tkinfo) {
		this.tkinfo = tkinfo;
		return this;
	}
	public String getTkphoto() {
		return tkphoto;
	}
	public Team setTkphoto(String tkphoto) {
		this.tkphoto = tkphoto;
		return this;
	}
	public String getTphoto() {
		return tphoto;
	}
	public Team setTphoto(String tphoto) {
		this.tphoto = tphoto;
		return this;
	}
	
	public int getTuse() {
		return tuse;
	}
	public Team setTuse(int tuse) {
		this.tuse = tuse;
		return this;
	}
	public String getTaddress() {
		return taddress;
	}
	public Team setTaddress(String taddress) {
		this.taddress = taddress;
		return this;
	}
	
	
}
