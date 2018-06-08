新建用户
==========

简要描述
----------

用户注册接口，支持批量注册。

请求URL
---------

- /apiv1/users/
  
请求方式
-----------

- POST 

参数 
----

========  ====  ======  ======
 参数名   必选   类型    说明
========  ====  ======  ======
username  是    string  用户名
password  是    string  密码
========  ====  ======  ======

请求示例
-----------
.. code-block:: json

    [
        {
            "username": "wawa",
            "password": "wawa"
        },
        {
            "username": "wawa123",
            "password": "wawa"
        }
    ]

返回示例
--------------

.. code-block:: json

    {
        "errors": [
            "User wawa have been created"
        ],
        "data": [
            {
                "member_since": "2018-06-08T20:07:57.920334+00:00",
                "id": 4,
                "last_seen": "2018-06-08T20:07:57.920334+00:00",
                "username": "wawa123"
            }
        ]
    }

返回参数说明
------------------


备注
--------

- 更多返回错误代码请看首页的错误代码描述
