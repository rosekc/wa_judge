Contest权限控制
================

简要描述
-----------

用户当前有3类，对应权限关系如下。

=======  ==============================================================
 Role                                 简介
=======  ==============================================================
ADMIN    最高权限用户，可以看全部比赛。
MANAGER  管理者，可以创建比赛，管理自己的比赛，然而不能管理别人的比赛。
USER     普通用户，普通地参加比赛，普通地不能创建比赛
=======  ==============================================================

进入比赛的权限
----------------
下面情况均可进入比赛。

1为是，0为否，a为均可。

==================  ===============  ======  ==============
in_contestant_list  contest_running  public  admin_or_owner
==================  ===============  ======  ==============
a                   a                a       1
a                   1                1       a
1                   1                0       a
==================  ===============  ======  ==============
