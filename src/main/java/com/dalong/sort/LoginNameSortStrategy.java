package com.dalong.sort;

import com.dalong.entity.UserInfo;
import com.dalong.type.Direction;

public class LoginNameSortStrategy implements SortStrategy{
	
	private Direction direction;
	
	@Override
	public int compare(UserInfo o1, UserInfo o2) {
		if(direction.getType() == Direction.ASC.getType()) {
			return o2.getLoginname().compareTo(o1.getLoginname());
		} else {
			return o1.getLoginname().compareTo(o2.getLoginname());
		}
	}

	@Override
	public int compare(UserInfo o1, UserInfo o2, Direction direction) {
		this.direction = direction;
		return compare(o1, o2);
	}

	@Override
	public SortStrategy setDirection(Direction direction) {
		this.direction = direction;
		return this;
	}

	@Override
	public Direction getDirection() {
		return direction;
	}

}
