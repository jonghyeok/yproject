package net.bitacademy.java41.vo;

import java.sql.Date;


public class TableCk {
	private int rollbookck;
	private int trainck;
	private int gameck;
	private int ano;
	
	private Date adate;
	private String tname;
	private int tcount;
	private calendarData calendardata;
	private String offStudent ; 
	private String trainoffStudent;
	
	
	
	
	
	
	public String getOffStudent() {
		return offStudent;
	}
	public TableCk setOffStudent(String offStudent) {
		this.offStudent = offStudent;
		return this;
	}
	public String getTrainoffStudent() {
		return trainoffStudent;
	}
	public TableCk setTrainoffStudent(String trainoffStudent) {
		this.trainoffStudent = trainoffStudent;
		return this;
	}
	public calendarData getCalendardata() {
		return calendardata;
	}
	public TableCk setCalendardata(calendarData calendardata) {
		this.calendardata = calendardata;
		return this;
	}
	public Date getAdate() {
		return adate;
	}
	public TableCk setAdate(Date adate) {
		this.adate = adate;
		return this;
	}
	public String getTname() {
		return tname;
	}
	public TableCk setTname(String tname) {
		this.tname = tname;
		return this;
	}
	public int getTcount() {
		return tcount;
	}
	public TableCk setTcount(int tcount) {
		this.tcount = tcount;
		return this;
	}
	public int getRollbookck() {
		return rollbookck;
	}
	public TableCk setRollbookck(int rollbookck) {
		this.rollbookck = rollbookck;
		return this;
	}
	public int getTrainck() {
		return trainck;
	}
	public TableCk setTrainck(int trainck) {
		this.trainck = trainck;
		return this;
	}
	public int getGameck() {
		return gameck;
	}
	public TableCk setGameck(int gameck) {
		this.gameck = gameck;
		return this;
	}
	public int getAno() {
		return ano;
	}
	public TableCk setAno(int ano) {
		this.ano = ano;
		return this;
	}
	
	
					
}
