package net.bitacademy.java41.controls.sponser;

import java.io.Serializable;

public class Setting implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private int dataStart; //자료 시작행
	
	private int dataEnd;//자료 자료 종료행
	
	private int spdname_col; 
	
	private int spddate_col;//거래 일자열
	
	private int spdtype_col;//거래 적요
	
	private int spdincome_col;//거래 금액
	
	private int spdwhere_col;//취급점 위치
	
	
	public int getSpdname_col() {
		return spdname_col;
	}

	public Setting setSpdname_col(int spdname_col) {
		this.spdname_col = spdname_col;
		return this;
	}

	public int getDataStart() {
		return dataStart;
	}

	public Setting setDataStart(int dataStart) {
		this.dataStart = dataStart;
		return this;
	}

	public int getDataEnd() {
		return dataEnd;
	}

	public Setting setDataEnd(int dataEnd) {
		this.dataEnd = dataEnd;
		return this;
	}

	public int getSpddate_col() {
		return spddate_col;
	}

	public Setting setSpddate_col(int spddate_col) {
		this.spddate_col = spddate_col;
		return this;
	}

	public int getSpdtype_col() {
		return spdtype_col;
	}

	public Setting setSpdtype_col(int spdtype_col) {
		this.spdtype_col = spdtype_col;
		return this;
	}

	public int getSpdincome_col() {
		return spdincome_col;
	}

	public Setting setSpdincome_col(int spdincome_col) {
		this.spdincome_col = spdincome_col;
		return this;
	}

	public int getSpdwhere_col() {
		return spdwhere_col;
	}

	public Setting setSpdwhere_col(int spdwhere_col) {
		this.spdwhere_col = spdwhere_col;
		return this;
	}
	
	
	
}
