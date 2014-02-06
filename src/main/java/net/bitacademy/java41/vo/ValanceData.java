package net.bitacademy.java41.vo;

import java.io.Serializable;
import java.sql.Date;

public class ValanceData implements Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	private double spdincome;
	
	private Date spddate;
	
	private String spdwhere;

	public double getSpdincome() {
		return spdincome;
	}

	public ValanceData setSpdincome(double spdincome) {
		this.spdincome = spdincome;
		return this;
	}

	public Date getSpddate() {
		return spddate;
	}

	public ValanceData setSpddate(Date spddate) {
		this.spddate = spddate;
		return this;
	}

	public String getSpdwhere() {
		return spdwhere;
	}

	public ValanceData setSpdwhere(String spdwhere) {
		this.spdwhere = spdwhere;
		return this;
	}
	
	
	
	

	
	
	
}

