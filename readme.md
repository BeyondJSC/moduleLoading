# 模块加载器
## 前言
    * 新手上路, 多多指教
## 思路分析
    * 在window下定义两个方法
        - define(name, deps, callback): 用来定义模块
        - requirejs(['a', 'b'], callback): 定义启动的方法
    * define方法详解
        - name String 定义模块的名称
        - deps Array 定义模块的依赖
        - callback function 模块定义的函数 => 暴露出接口函数
    * requriejs方法详解
        - 实现功能
            - 异步加载模块 => script注入 onload事件
            - 在加载完所有模块之后, 执行回调方法 => 递归处理
            - 模块缓存设置
                {
                    status: // 加载状态
                    exports: // 接口对象
                    callback: //  获取接口对象的回调函数
                    deps: // 模块依赖
                }