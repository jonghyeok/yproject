package net.bitacademy.java41.vo;

import java.sql.Date;

public class ImgFile {

    private	int fno;
    private String fname;
	private Date fregdate;
    private String fmid;
	
    public int getFno() {
		return fno;
	}
	public ImgFile setFno(int fno) {
		this.fno = fno;
		return this;
	}
	public String getFname() {
		return fname;
	}
	public ImgFile setFname(String fname) {
		this.fname = fname;
		return this;
	}
	public Date getFregdate() {
		return fregdate;
	}
	public ImgFile setFregdate(Date fregdate) {
		this.fregdate = fregdate;
		return this;
	}
	public String getFmid() {
		return fmid;
	}
	public ImgFile setFmid(String fmid) {
		this.fmid = fmid;
		return this;
	}

}
