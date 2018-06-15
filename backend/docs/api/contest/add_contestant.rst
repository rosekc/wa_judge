为contest添加contestant
===========================

简要描述
-----------

为contest添加contestant，这样就能让指定的用户参加private的contest。

请求URL
-----------

- /apiv1/contest/<int:contest_id>/contestant/
  
请求方式
------------------

- GET
- POST
- PUT
- DELETE

POST为增加，PUT为整个表置换，DELETE为删除。

参数
-------------

为一个包含用户id的list。

返回示例
-----------

.. code-block:: json

    {
        "errors": [
            "uid 1 have been added in contestant list",
            "uid 3 not found"
        ],
        "data": [
            2
        ]
    }


返回参数说明
--------------------

备注
-----------------------
