package com.dalong.type;


public enum Direction {
	ASC(1, "正序"), DESC(2, "降序")
	;
	private int type;
	private String desc;

	private Direction (Integer type, String desc) {
		this.type = type;
		this.desc = desc;
	}
	
	public Integer getType() {
		return type;
	}
	public String getDesc() {
		return desc;
	}
		
	public static Direction getEnumByType(Integer type){
		if (type == null)
            return null;
        for (Direction direction : Direction.values()) {
            if (direction.getType().equals(type))
                return direction;
        }
        return null;
	}
	
	public static Direction getEnumByDesc(String desc){
		if (desc == null)
            return null;
        for (Direction direction : Direction.values()) {
            if (direction.getDesc().equals(desc))
                return direction;
        }
        return null;
	}
}
