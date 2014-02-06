package net.bitacademy.java41.vo;

import java.io.Serializable;
import java.sql.Date;

public class TeamStudent implements Serializable {
	private static final long serialVersionUID = 1L;
	private String tname;
	private int 	tsno;      //학생 아이디
	private int 	tno; 		//팀번호
	private int 	tsbackno; 	//등번호
	private String	tsname; 	//이름
	private Date 	tsbirth; 		//생일
	private String 	tsaddr;		//주소
	private String 	tshobby;	//취미
	private String 	tsphoto;	//사진
	private int 	fno;		//파일번호
	private int		tsfam1;		//가족관계1
	private int		tsfam2;		//가족관계2
	private int		tsfam3;		//가족관계3
	private String	tsdad;	//부모 부
	private String 	tsmom;	//부모 모 
	private String 	tsphone;	//연락처
	private String 	tsprophone;	//보호자 연락처
	private String 	tsother;	//기타사항
	private int		tsstatus;
	private String	tsemail;
	private Date		tsgrad;
	
	
	
	public Date getTsgrad() {
		return tsgrad;
	}
	public TeamStudent setTsgrad(Date tsgrad) {
		this.tsgrad = tsgrad;
		return this;
	}
	public String getTname() {
		return tname;
	}
	public TeamStudent setTname(String tname) {
		this.tname = tname; return this;
	}
	public Date getTsbirth() {
		return tsbirth;
	}
	public TeamStudent setTsbirth(Date tsbirth) {
		this.tsbirth = tsbirth;return this;
	}
	public String getTsemail() {
		return tsemail;
	}
	public TeamStudent setTsemail(String tsemail) {
		this.tsemail = tsemail;return this;
	}
	public int getTsstatus() {
		return tsstatus;
	}
	public TeamStudent setTsstatus(int tsstatus) {
		this.tsstatus = tsstatus;return this;
	}
	public String getTsprophone() {
		return tsprophone;
	}
	public TeamStudent setTsprophone(String tsprophone) {
		this.tsprophone = tsprophone;return this;
	}
	public String getTsdad() {
		return tsdad;
	}
	public TeamStudent setTsdad(String tsdad) {
		this.tsdad = tsdad;
		return this;
	}
	public String getTsmom() {
		return tsmom;
	}
	public TeamStudent setTsmom(String tsmom) {
		this.tsmom = tsmom;
		return this;
	}
	public int getTsno() {
		return tsno;
	}
	public TeamStudent setTsno(int tsno) {
		this.tsno = tsno;
		return this;
	}
	public int getTno() {
		return tno;
	}
	public TeamStudent setTno(int tno) {
		this.tno = tno;
		return this;
	}
	public int getTsbackno() {
		return tsbackno;
	}
	public TeamStudent setTsbackno(int tsbackno) {
		this.tsbackno = tsbackno;
		return this;
	}
	public String getTsname() {
		return tsname;
	}
	public TeamStudent setTsname(String tsname) {
		this.tsname = tsname;
		return this;
	}
	
	public String getTsaddr() {
		return tsaddr;
	}
	public TeamStudent setTsaddr(String tsaddr) {
		this.tsaddr = tsaddr;
		return this;
	}
	public String getTshobby() {
		return tshobby;
	}
	public TeamStudent setTshobby(String tshobby) {
		this.tshobby = tshobby;
		return this;
	}
	public String getTsphoto() {
		return tsphoto;
	}
	public TeamStudent setTsphoto(String tsphoto) {
		this.tsphoto = tsphoto;
		return this;
	}
	public int getFno() {
		return fno;
	}
	public TeamStudent setFno(int fno) {
		this.fno = fno;
		return this;
	}
	public int getTsfam1() {
		return tsfam1;
	}
	public TeamStudent setTsfam1(int tsfam1) {
		this.tsfam1 = tsfam1;
		return this;
	}
	public int getTsfam2() {
		return tsfam2;
	}
	public TeamStudent setTsfam2(int tsfam2) {
		this.tsfam2 = tsfam2;
		return this;
	}
	public int getTsfam3() {
		return tsfam3;
	}
	public TeamStudent setTsfam3(int tsfam3) {
		this.tsfam3 = tsfam3;
		return this;
	}
	
	public String getTsphone() {
		return tsphone;
	}
	public TeamStudent setTsphone(String tsphone) {
		this.tsphone = tsphone;
		return this;
	}
	
	public String getTsother() {
		return tsother;
	}
	public TeamStudent setTsother(String tsother) {
		this.tsother = tsother;
		return this;
	}
	
	
	
}

