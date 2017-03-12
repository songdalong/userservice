package com.dalong.sort;

import com.dalong.entity.UserInfo;
import com.dalong.type.Direction;

public class IdSortStrategy implements SortStrategy{
	
	private Direction direction;
	
	@Override
	public int compare(UserInfo o1, UserInfo o2) {
		if(direction.getType() == Direction.ASC.getType()) {
			return (int)(o2.getId() - o1.getId());
		} else {
			return (int)(o1.getId() - o2.getId());
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
