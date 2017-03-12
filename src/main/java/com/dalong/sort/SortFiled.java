package com.dalong.sort;

public class SortFiled {
	private String sortFiled;
	private int direction;
	private SortStrategy sortStrategy;
	
	public int getDirection() {
		return direction;
	}
	public void setDirection(int direction) {
		this.direction = direction;
	}
	public SortStrategy getSortStrategy() {
		return sortStrategy;
	}
	public void setSortStrategy(SortStrategy sortStrategy) {
		this.sortStrategy = sortStrategy;
	}
	public String getSortFiled() {
		return sortFiled;
	}
	public void setSortFiled(String sortFiled) {
		this.sortFiled = sortFiled;
	}
}
