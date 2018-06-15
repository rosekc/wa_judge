新建&更新Contest
================

**简要描述：** 

- 新建contest

**请求URL：** 

- /apiv1/contests/<int:contest_id>
  
**请求方式：**

- POST
- PUT

POST为新建，不用contest_id，PUT为更新。

**参数：** 

============  ====  ======  ============================
   参数名     必选   类型               说明
============  ====  ======  ============================
name          是    string
start_time    是    string
end_time      是    string
length        是    int     end_time和length只能填写一个
permission    否    string
announcement  否    string
is_ip_check   否    bool    ip检查
============  ====  ======  ============================

**返回示例**

.. code-block:: json

    {
      "name": "WA Judge Contest Round 3",
      "is_ip_check": true,
      "length": 3600,
      "owner_user": 1,
      "create_time": "2018-06-14T13:21:57.098273+00:00",
      "id": 3,
      "permission": "PRIVATE",
      "end_time": "2018-05-17T17:45:41+00:00",
      "start_time": "2018-05-17T16:45:41+00:00",
      "announcement": null
    }


**返回参数说明** 

**备注** 
