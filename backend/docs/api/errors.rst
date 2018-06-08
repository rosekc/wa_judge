错误代码约定
==============

内部错误
---------
以下引用内部返回的错误文档。

.. automodule:: wa_judge.utils.errors
   :members:

以下为其他常见错误。

405 METHOD NOT ALLOWED
    表示方法不允许，比如POST误用为未实现的PUT。

其他错误
-----------
500 INTERNAL SERVER ERROR
    服务器代码逻辑炸了，请pm写出粪代码的苦逼后端。