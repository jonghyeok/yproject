package net.bitacademy.java41.vo;


public class GamePoint {
	
	private int gno; //경기기록번호
	private int gpinning; //회수
	private int gpspoint; // 초팀 획득점수
	private int gpepoint; // 말팀 획득점수
	public int getGno() {
		return gno;
	}
	public GamePoint setGno(int gno) {
		this.gno = gno;
		return this;
	}
	public int getGpinning() {
		return gpinning;
	}
	public GamePoint setGpinning(int gpinning) {
		this.gpinning = gpinning;
		return this;
	}
	public int getGpspoint() {
		return gpspoint;
	}
	public GamePoint setGpspoint(int gpspoint) {
		this.gpspoint = gpspoint;
		return this;
	}
	public int getGpepoint() {
		return gpepoint;
	}
	public GamePoint setGpepoint(int gpepoint) {
		this.gpepoint = gpepoint;
		return this;
	}
	
	
	
	
}
