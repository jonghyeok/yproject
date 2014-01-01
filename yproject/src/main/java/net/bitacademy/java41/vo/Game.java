package net.bitacademy.java41.vo;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

public class Game implements Serializable {
	private static final long serialVersionUID = 1L;
	private int gno;
	private int ano;
	private String gtitle; //경기제목
	private String gplace; // 경기장소
	private String gstart; // 초팀명
	private String gend;//말팀명
	private int gsh; //초팀 홈런
	private int geh; //말팀 홈런
	private int gse; //초팀 에러
	private int gee; //말팀 에러
	private int gsb; //초팀 볼
	private int geb; //말팀 볼
	private String gdet;//경기내용
	private String getc;//기타사항
	
	
	private Date adate;//경기일
	
	private List<GamePoint> gamePoint;//게임 점수 정보

	public int getGno() {
		return gno;
	}

	public Game setGno(int gno) {
		this.gno = gno;
		return this;
	}

	public int getAno() {
		return ano;
	}

	public Game setAno(int ano) {
		this.ano = ano;
		return this;
	}

	public String getGtitle() {
		return gtitle;
	}

	public Game setGtitle(String gtitle) {
		this.gtitle = gtitle;
		return this;
	}

	public String getGplace() {
		return gplace;
	}

	public Game setGplace(String gplace) {
		this.gplace = gplace;
		return this;
	}

	public String getGstart() {
		return gstart;
	}

	public Game setGstart(String gsstart) {
		this.gstart = gsstart;
		return this;
	}

	public String getGend() {
		return gend;
	}

	public Game setGend(String gend) {
		this.gend = gend;
		return this;
	}

	public int getGsh() {
		return gsh;
	}

	public Game setGsh(int gsh) {
		this.gsh = gsh;
		return this;
	}

	public int getGeh() {
		return geh;
	}

	public Game setGeh(int geh) {
		this.geh = geh;
		return this;
	}

	public int getGse() {
		return gse;
	}

	public Game setGse(int gse) {
		this.gse = gse;
		return this;
	}

	public int getGee() {
		return gee;
	}

	public Game setGee(int gee) {
		this.gee = gee;
		return this;
	}

	public int getGsb() {
		return gsb;
	}

	public Game setGsb(int gsb) {
		this.gsb = gsb;
		return this;
	}

	public int getGeb() {
		return geb;
	}

	public Game setGeb(int geb) {
		this.geb = geb;
		return this;
	}

	public String getGdet() {
		return gdet;
	}

	public Game setGdet(String gdet) {
		this.gdet = gdet;
		return this;
	}

	public String getGetc() {
		return getc;
	}

	public Game setGetc(String getc) {
		this.getc = getc;
		return this;
	}

	public Date getAdate() {
		return adate;
	}

	public Game setAdate(Date adate) {
		this.adate = adate;
		return this;
	}

	public List<GamePoint> getGamePoint() {
		return gamePoint;
	}

	public Game setGamePoint(List<GamePoint> gamePoint) {
		this.gamePoint = gamePoint;
		return this;
	}
	
	
	
	
	
	

	
	
	
	
	
}

