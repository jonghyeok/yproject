package net.bitacademy.java41.vo;

import java.sql.Date;

public class TeamProperty {
	
	private int tno; //팀번호
	private int ano; //팀활동 일련번호
	private Date adate;//팀 활동 날짜
	
	
	private String tname;
	
	private int atype; 
	// 팀활동 종류 
	//1 = 출석만
	//2 = 출석 + 평가
	//3 = 출석 + 경기
	//4 = 출석 + 평가 + 경기 

	private int tsno;//학생 번호
	private String tsname;//학생이름
	private int rstatus;//출석 상태
	private String retc;//출석 비고란
	
	private int tsbackno; //학생 등번호
	private String tsphoto;//학생사진
	
	
	private int eno;//훈련기록번호
	private String tretc;//훈련 비고란
	
	private int tcount;
	
	private int elno;
	private int escore;

	private int eltype;
	private  String elname;
	
	
	private int tableStatus;//테이블 상태(0-하나도 없음, 1-하나이상 있지만 없음,2-이미 있음)
	
	private String gplace;//경기장소
	private int gno;//경기번호

	private int gpstotal;
	
	private int gpetotal;
	
	private String gstart;
	
	private String gend;
	
	
	
	
	
	public int getGpstotal() {
		return gpstotal;
	}
	public TeamProperty setGpstotal(int gpstotal) {
		this.gpstotal = gpstotal;
		return this;
	}
	public int getGpetotal() {
		return gpetotal;
	}
	public TeamProperty setGpetotal(int gpetotal) {
		this.gpetotal = gpetotal;
		return this;
	}
	public String getGstart() {
		return gstart;
	}
	public TeamProperty setGstart(String gstart) {
		this.gstart = gstart;
		return this;
	}
	public String getGend() {
		return gend;
	}
	public TeamProperty setGend(String gend) {
		this.gend = gend;
		return this;
	}
	public String getTname() {
		return tname;
	}
	public TeamProperty setTname(String tname) {
		this.tname = tname;
		return this;
	}
	public String getTsphoto() {
		return tsphoto;
	}
	public TeamProperty setTsphoto(String tsphoto) {
		this.tsphoto = tsphoto;
		return this;
	}
	public int getTsbackno() {
		return tsbackno;
	}
	public TeamProperty setTsbackno(int tsbackno) {
		this.tsbackno = tsbackno;
		return this;
	}
	public String getTsname() {
		return tsname;
	}
	public TeamProperty setTsname(String tsname) {
		this.tsname = tsname;
		return this;
	}
	public String getGplace() {
		return gplace;
	}
	public TeamProperty setGplace(String gplace) {
		this.gplace = gplace;
		return this;

	}
	public int getGno() {
		return gno;
	}
	public TeamProperty setGno(int gno) {
		this.gno = gno;
		return this;

	}
	public int getAtype() {
		return atype;
	}
	public TeamProperty setAtype(int atype) {
		this.atype = atype;
		return this;
	}
	public int getTsno() {
		return tsno;
	}
	public TeamProperty setTsno(int tsno) {
		this.tsno = tsno;
		return this;
	}
	public int getTableStatus() {
		return tableStatus;
	}
	public TeamProperty setTableStatus(int tableStatus) {
		this.tableStatus = tableStatus;
		return this;
	}
	public int getEltype() {
		return eltype;
	}
	public TeamProperty setEltype(int eltype) {
		this.eltype = eltype;
		return this;
	}
	public String getElname() {
		return elname;
	}
	public TeamProperty setElname(String elname) {
		this.elname = elname;
		return this;
	}
	public int getTno() {
		return tno;
	}
	public TeamProperty setTno(int tno) {
		this.tno = tno;
		return this;
	}
	public int getAno() {
		return ano;
	}
	public TeamProperty setAno(int ano) {
		this.ano = ano;
		return this;
	}
	public Date getAdate() {
		return adate;
	}
	public TeamProperty setAdate(Date adate) {
		this.adate = adate;
		return this;
	}

	public int getRstatus() {
		return rstatus;
	}
	public TeamProperty setRstatus(int rstatus) {
		this.rstatus = rstatus;
		return this;
	}
	public String getRetc() {
		return retc;
	}
	public TeamProperty setRetc(String retc) {
		this.retc = retc;
		return this;
	}
	public int getEno() {
		return eno;
	}
	public TeamProperty setEno(int eno) {
		this.eno = eno;
		return this;
	}
	public String getTretc() {
		return tretc;
	}
	public TeamProperty setTretc(String tretc) {
		this.tretc = tretc;
		return this;
	}
	public int getTcount() {
		return tcount;
	}
	public TeamProperty setTcount(int tcount) {
		this.tcount = tcount;
		return this;
	}
	public int getElno() {
		return elno;
	}
	public TeamProperty setElno(int elno) {
		this.elno = elno;
		return this;
	}
	public int getEscore() {
		return escore;
	}
	public TeamProperty setEscore(int escore) {
		this.escore = escore;
		return this;
	}
	
	
	
	
	
	
}
