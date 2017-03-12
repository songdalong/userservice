package com.dalong.sort;

import java.util.Comparator;

import com.dalong.entity.UserInfo;
import com.dalong.type.Direction;

public interface SortStrategy extends Comparator<UserInfo>{
	SortStrategy setDirection(Direction direction);
	int compare(UserInfo o1, UserInfo o2, Direction direction);
	Direction getDirection();
}
