package net.bitacademy.java41.vo;

import java.io.Serializable;

public class SheetData implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private int row;
	
	private int col;
	
	private String data;

	public int getRow() {
		return row;
	}

	public SheetData setRow(int row) {
		this.row = row;
		return this;
	}

	public int getCol() {
		return col;
	}

	public SheetData setCol(int col) {
		this.col = col;
		return this;
	}

	public String getData() {
		return data;
	}

	public SheetData setData(String data) {
		this.data = data;
		return this;
	}

	

}

