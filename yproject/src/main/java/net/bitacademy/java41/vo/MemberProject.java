package net.bitacademy.java41.vo;

import java.io.Serializable;

/* final 
 * 1. 클래스
 * final class A {} 
 * - 상속 받지 못한다. 상속을 방지하기 위함.
 * 
 * 2. 메서드
 * - final 메서드는 재정의(overriding)할 수 없다.
 * class A {
 * 		public final void m() {}
 * }
 * 
 * class B extends A {
 * 		public void m() {} // error! 
 * }
 * 
 * 3. 변수
 * - 값을 한번만 할당한다.
 * final int a = 20;
 *  
 */


public class MemberProject implements Serializable{
	private static final long serialVersionUID = 1L;
	
	public static final int LVL_LEADER = 0;
	public static final int LVL_GENERAL = 1;
	public static final int LVL_GUEST = 9;
	
	protected int no; 
	protected String title;
	protected int level;
	
	public int getNo() {
		return no;
	}
	public MemberProject setNo(int no) {
		this.no = no;
		return this;
	}
	public String getTitle() {
		return title;
	}
	public MemberProject setTitle(String title) {
		this.title = title;
		return this;
	}
	public int getLevel() {
		return level;
	}
	public MemberProject setLevel(int level) {
		this.level = level;
		return this;
	}
}
