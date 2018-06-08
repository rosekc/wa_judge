数据字典
=============

User
----

============  ===========  ===  ====  ============================
    字段         类型      空   默认              注释
============  ===========  ===  ====  ============================
id            int          否   ..    ..
email         varchar(64)  否   ..    ..
password      varchar      否   ..    密码
username      varchar      否   ..    用户名
member_since  datetime     是   ..    注册时间
last_seen     datetime     是   ..    上次访问时间
role          varchar      否   USER  角色，有ADMIN，MANAGER，USER
============  ===========  ===  ====  ============================
