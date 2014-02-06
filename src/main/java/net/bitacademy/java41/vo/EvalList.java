package net.bitacademy.java41.vo;

import java.io.Serializable;

public class EvalList implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private int 	elno; 		//평가목록번호
	private int 	eltype; 	//평가 타입(0=정량 1=정성)
	private String elname;  //평가명
	private int 	euse;	//활동중
	
	
	
	public int getEuse() {
		return euse;
	}
	public EvalList setEuse(int euse) {
		this.euse = euse;
		return this;
	}
	public int getElno() {
		return elno;
	}
	public EvalList setElno(int elno) {
		this.elno = elno;
		return this;
	}
	public int getEltype() {
		return eltype;
	}
	public EvalList setEltype(int eltype) {
		this.eltype = eltype;
		return this;
	}
	public String getElname() {
		return elname;
	}
	public EvalList setElname(String elname) {
		this.elname = elname;
		return this;
	}
		
	
}

