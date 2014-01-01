package net.bitacademy.java41.vo;

import java.io.Serializable;
import java.sql.Date;

public class Gallery implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private	int ino;
	private String mid;
	private String ititle;
    private String icontent;
    private Date iupdate;
    //TORY_IMG DB Table
    
    private int ifileno;
    private String iname;
    private String iurl;
    private long isize;
    //TORY_IMGINFO DB Table
    
	public int getIfileno() {
		return ifileno;
	}
	public void setIfileno(int ifileno) {
		this.ifileno = ifileno;
	}
	public String getIname() {
		return iname;
	}
	public void setIname(String iname) {
		this.iname = iname;
	}
	public long getIsize() {
		return isize;
	}
	public Gallery setIsize(long isize) {
		this.isize = isize;
		return this;
	}
	public int getIno() {
		return ino;
	}
	public Gallery setIno(int ino) {
		this.ino = ino;
		return this;
	}
	public String getMid() {
		return mid;
	}
	public Gallery setMid(String mid) {
		this.mid = mid;
		return this;
	}
	public String getIurl() {
		return iurl;
	}
	public Gallery setIurl(String iurl) {
		this.iurl = iurl;
		return this;
	}
	public String getIcontent() {
		return icontent;
	}
	public Gallery setIcontent(String icontent) {
		this.icontent = icontent;
		return this;
	}
	public String getItitle() {
		return ititle;
	}
	public Gallery setItitle(String ititle) {
		this.ititle = ititle;
		return this;
	}
	public Date getIupdate() {
		return iupdate;
	}
	public Gallery setIupdate(Date iupdate) {
		this.iupdate = iupdate;
		return this;
	}
}
