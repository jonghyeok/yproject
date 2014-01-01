package net.bitacademy.java41.vo;

import java.io.Serializable;

public class calendarData  implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private int  totalstudent;
	
	private String teamGameResult;

	private String offstudents;
	
	private String evaloffstduents;

	public int getTotalstudent() {
		return totalstudent;
	}

	public calendarData setTotalstudent(int totalstudent) {
		this.totalstudent = totalstudent;
		return this;
	}

	public String getTeamGameResult() {
		return teamGameResult;
	}

	public calendarData setTeamGameResult(String teamGameResult) {
		this.teamGameResult = teamGameResult;
		return this;
	}

	public String getOffstudents() {
		return offstudents;
	}

	public calendarData setOffstudents(String offstudents) {
		this.offstudents = offstudents;
		return this;
	}

	public String getEvaloffstduents() {
		return evaloffstduents;
	}

	public calendarData setEvaloffstduents(String evaloffstduents) {
		this.evaloffstduents = evaloffstduents;
		return this;
	}
	
	
	
}
