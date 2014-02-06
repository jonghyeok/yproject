package net.bitacademy.java41.vo;

import java.io.Serializable;
import java.sql.Date;

public class Sponser implements Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int spdno; //후원기록번호
	private int spcno; //거래확인번호
	private Date spddate; //거래일시
	private String spdtype; //적요
	private String spdname; //기재내용
	private int spdincome; //입금액
	private String spdwhere; //취급점
	public int getSpdno() {
		return spdno;
	}
	public Sponser setSpdno(int spdno) {
		this.spdno = spdno;
		return this;
	}
	public int getSpcno() {
		return spcno;
	}
	public Sponser setSpcno(int spcno) {
		this.spcno = spcno;
		return this;
	}
	public Date getSpddate() {
		return spddate;
	}
	public Sponser setSpddate(Date spddate) {
		this.spddate = spddate;
		return this;
	}
	public String getSpdtype() {
		return spdtype;
	}
	public Sponser setSpdtype(String spdtype) {
		this.spdtype = spdtype;
		return this;
	}
	public String getSpdname() {
		return spdname;
	}
	public Sponser setSpdname(String spdname) {
		this.spdname = spdname;
		return this;
	}
	public int getSpdincome() {
		return spdincome;
	}
	public Sponser setSpdincome(int spdincome) {
		this.spdincome = spdincome;
		return this;
	}
	public String getSpdwhere() {
		return spdwhere;
	}
	public Sponser setSpdwhere(String spdwhere) {
		this.spdwhere = spdwhere;
		return this;
	}
	
	
	
}

