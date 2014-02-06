package net.bitacademy.java41.vo;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

public class SponserCheck implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private int spcno;
	
	private String spcaccno;
	
	private Date spcstart;
	
	private Date spcend;
	
	private String spcdata;
	
	private String spcname;
	
	private Date spctime;
	
	private List<Sponser> suport;

	private String spcstart_string;
	
	private String spcend_string;
	
	private String spdname;	


	public String getSpdname() {
		return spdname;
	}

	public SponserCheck setSpdname(String spdname) {
		this.spdname = spdname;
		return this;
	}

	public String getSpcstart_string() {
		return spcstart_string;
	}

	public SponserCheck setSpcstart_string(String spcstart_string) {
		this.spcstart_string = spcstart_string;
		return this;

	}

	public String getSpcend_string() {
		return spcend_string;
	}

	public SponserCheck setSpcend_string(String spcend_string) {
		this.spcend_string = spcend_string;
		return this;

	}

	public String getSpcname() {
		return spcname;
	}

	public SponserCheck setSpcname(String spcname) {
		this.spcname = spcname;
		return this;
	}

	public Date getSpctime() {
		return spctime;
	}

	public SponserCheck setSpctime(Date spctime) {
		this.spctime = spctime;
		return this;
	}

	public String getSpcdata() {
		return spcdata;
	}

	public SponserCheck setSpcdata(String spcdata) {
		this.spcdata = spcdata;
		return this;
	}

	public int getSpcno() {
		return spcno;
	}

	public SponserCheck setSpcno(int spcno) {
		this.spcno = spcno;
		return this;
	}

	public String getSpcaccno() {
		return spcaccno;
	}

	public SponserCheck setSpcaccno(String spcaccno) {
		this.spcaccno = spcaccno;
		return this;
	}

	public Date getSpcstart() {
		return spcstart;
	}

	public SponserCheck setSpcstart(Date spcstart) {
		this.spcstart = spcstart;
		return this;
	}

	public Date getSpcend() {
		return spcend;
	}

	public SponserCheck setSpcend(Date spcend) {
		this.spcend = spcend;
		return this;
	}

	public List<Sponser> getSuport() {
		return suport;
	}

	public SponserCheck setSuport(List<Sponser> suport) {
		this.suport = suport;
		return this;
	}
	
	
	
	
}

