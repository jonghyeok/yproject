package net.bitacademy.java41.vo;

import java.io.Serializable;
import java.sql.Date;

public class Board implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private int 	bno; 		//공지사항번호
	private String 	btitle; 		//제목
	private String 	bcontent; 	//내용
	private Date	 bdate; 	//날짜
	private int 	bcount; 		//조회수
	private int 	bfileno;		//파일번호
	
	private String bfurl;
	private String bfurl2;
	
	
	public String getBfurl2() {
		return bfurl2;
	}
	public Board setBfurl2(String bfurl2) {
		this.bfurl2 = bfurl2;
		return this;
	}
	public String getBfurl() {
		return bfurl;
	}
	public Board setBfurl(String bfurl) {
		this.bfurl = bfurl;
		return this;
	}
	public int getBno() {
		return bno;
	}
	public Board setBno(int bno) {
		this.bno = bno;
		return this;
	}
	public String getBtitle() {
		return btitle;
	}
	public Board setBtitle(String btitle) {
		this.btitle = btitle;
		return this;
	}
	public String getBcontent() {
		return bcontent;
	}
	public Board setBcontent(String bcontent) {
		this.bcontent = bcontent;
		return this;
	}
	public Date getBdate() {
		return bdate;
	}
	public Board setBdate(Date bdate) {
		this.bdate = bdate;
		return this;
	}
	public int getBcount() {
		return bcount;
	}
	public Board setBcount(int bcount) {
		this.bcount = bcount;
		return this;
	}
	public int getBfileno() {
		return bfileno;
	}
	public Board setBfileno(int bfileno) {
		this.bfileno = bfileno;
		return this;
	}
	

	
	
	
	
	
}

