(function(root){
    var moduleMap = {
        /*
            加载状态
            exports接口对象
            callback
            deps
            => 缓存
        */
    };

    function requirejs(deps, callback){
        if(deps.length === 0){
            callback();
        }

        var deplsLen = deps.length;
        var params = [];
        for(var i=0; i<deplsLen; i++){
            (function(j){
                // console.log(deps[j])
                loadModule(deps[i], function(param){
                    // console.log(param);
                    deplsLen --;
                    params[j] = param;
                    if(deplsLen === 0){
                        callback.apply(null, params);
                    }
                })
            })(i)
        }
    };
    
    function loadModule(name, callback){
        if(!moduleMap[name]){
            moduleMap[name] = {
                status: "loading"
            };
            // 加载模块 注入script
            loadScript(name, function(){
                // callback();
                requirejs(moduleMap[name].deps, function(){
                    // 执行当前被加载的模块
                    execModule(name, callback);
                })
            });
        }
    }

    function loadScript(name, callback){
        var doc = document;
        var node = doc.createElement('script');
        node.src = name + ".js"; // 路径加载策略 => 正则
        doc.body.appendChild(node);
        node.onload = function(){
            callback()
        }
    }

    function define(name, deps, callback){
        moduleMap[name] = moduleMap[name] || {};
        moduleMap[name].deps = deps;
        moduleMap[name].status = "loaded";
        moduleMap[name].callback = callback;
    };

    function execModule(name, callback){
        var exp = moduleMap[name].callback(); // 接口兑现
        moduleMap[name].exports = exp;
        callback(exp);
    }

    root.requirejs = requirejs;
    root.define = define;
})(this)