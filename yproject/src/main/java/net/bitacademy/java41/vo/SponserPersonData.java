package net.bitacademy.java41.vo;

import java.io.Serializable;
import java.util.List;

public class SponserPersonData implements Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int spno; //후원인 번호
	private String mid;
	private String mname;
	private String spacname;
	private int sppc;
	private String spname;
	private double valance;
	private List<ValanceData> valanceRecord;
	private String sppc_string;
	
	private String mphone;
	
	private String serchData;
	
	
	private String spdname;
	
	
	private int spdno;
	

	
	
	
	
	public int getSpdno() {
		return spdno;
	}
	public SponserPersonData setSpdno(int spdno) {
		this.spdno = spdno;
		return this;
	}
	public String getSpdname() {
		return spdname;
	}
	public SponserPersonData setSpdname(String spdname) {
		this.spdname = spdname;
		return this;
	}
	public String getMphone() {
		return mphone;
	}
	public SponserPersonData setMphone(String mphone) {
		this.mphone = mphone;
		return this;
	}
	public String getSppc_string() {
		return sppc_string;
	}
	public SponserPersonData setSppc_string(String sppc_string) {
		this.sppc_string = sppc_string;
		return this;
	}
	public String getSerchData() {
		return serchData;
	}
	public SponserPersonData setSerchData(String serchData) {
		this.serchData = serchData;
		return this;
	}
	public String getMname() {
		return mname;
	}
	public SponserPersonData setMname(String mname) {
		this.mname = mname;
		return this;
	}
	public int getSpno() {
		return spno;
	}
	public SponserPersonData setSpno(int spno) {
		this.spno = spno;
		return this;
	}
	public String getMid() {
		return mid;
	}
	public SponserPersonData setMid(String mid) {
		this.mid = mid;
		return this;
	}
	public String getSpacname() {
		return spacname;
	}
	public SponserPersonData setSpacname(String spacname) {
		this.spacname = spacname;
		return this;
	}
	public int getSppc() {
		return sppc;
	}
	public SponserPersonData setSppc(int sppc) {
		this.sppc = sppc;
		return this;
	}
	public String getSpname() {
		return spname;
	}
	public SponserPersonData setSpname(String spname) {
		this.spname = spname;
		return this;
	}
	public double getValance() {
		return valance;
	}
	public SponserPersonData setValance(double valance) {
		this.valance = valance;
		return this;
	}
	public List<ValanceData> getValanceRecord() {
		return valanceRecord;
	}
	public SponserPersonData setValanceRecord(List<ValanceData> valanceRecord) {
		this.valanceRecord = valanceRecord;
		return this;
	}
	
	
	
	

	
	
	
}

