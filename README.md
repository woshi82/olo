# olo

  一个自动化前端开发工程流的工具包。里面包括**seo**、**seo-php**模式。
  > _共同点_：都是具有PC端SEO优化的工作流程。都采用了node服务，通过fis3进行资源定位及优化。  
  > _区别_：  
        **seo-php**用的是generator-biketo的开发流程，模版渲染部分由PHP负责。最后产出在后台的服务上运行项目。  
        **seo**采用了node服务，以handlebars为模版引擎，实现了页面的自动路由功能。最后产出在node服务上运行。  

## 安装
    npm i olo -g

## 基本命令  
> 所有命令的参数都可以通过`olo ** -h`查看  

#### 初始化
    olo init  
#### 生成视图
    olo v view-name  
#### 生成组件
    olo c component-name  
#### 监听项目
    olo w
> 启动项目中包括清空本地fis3服务文件的`server clean`，清空编译缓存、自动刷新、实时监听`release -clw`。

#### 开启服务  
    olo s  
#### 发布  
    olo r
## 新建项目
    mkdir my-project
    cd my-project
    olo init
    olo v view-name (可选)
    olo c component-name (可选)
    olo s (或者) npm run start
    olo w (或者) npm run watch
#### 一. 公用配置
![config配置](assets/config.jpg)
#### 二. seo-php
> 功能、用法与`generator-biketo`相类似。

##### 目录结构
![seo-php目录结构](assets/seo-php.jpg)  
**assets** 静态文件，包括图片和初始化css;   
**c** 组件;  
**libs** 公用类库;  
**server** node服务;  
**views** 页面视图;  
**config.json** 发布产出、接口配置;  
**fis-conf.js** fis 配置;  
**package.json** 项目包配置.
##### 注意事项
1. `{{#if dev}}`*handlebars*语法区分纯前端开发和后台模板开发；
2. `{{> cmp}}`引入组件；
3. 可以自行加入`helper`并在_conf.js_中的*handlebars*配置项中配置；

#### 三. seo

##### 目录结构
![seo目录结构](assets/seo.png)

**|--assets** 静态文件，包括图片和初始化css;  
**|--views** 页面视图;  
**|--components** 组件;  
**|--libs** 公用类库;

**|--controllers** 页面路由;  
**|--routes** 路由;  
**|--service** 接口路由;  
**|--middleware** 中间件;  
**|--utils** 工具函数;  

**|--app.js** node服务;  
**|--config.json** 发布产出、接口配置;  
**|--fis-conf.js** fis 配置;  
**|--package.json** 项目包配置.
##### 注意事项
1、 页面路由  **controllers>index.js**
```javascript
module.exports = {
	路由名称: ［中间件（可选）,函数］,
	路由名称: 函数,
	index: [midUser.hasLogin,function(req,res){
		res.render('index',{username: req.session.username});
	}]
	index1 : function(req,res){
		res.render('index',{username: req.session.username});
	}
};
```
2、 页面路由配置  **controllers>page.json**   
```javascript
一级路由:接口名称
一级路由:{
    二级路由:接口名称
}(或)
一级路由/二级路由: 接口名称,

"/": "index",                //一级路由默认索引到对应的"一级路由名称.js", 此处"/"默认索引到index.js.接口对应"index.js>index"
"/about": {  
    "/": about,              //二级路由默认索引到它的一级路由 "一级路由名称.js", 此处"/"默认索引到about.js
    "/member": member,
    "/member/:type": type,
},
"/about/member": member,     //与上面的"/member"功能相同
"/detail": {
    "/:id": detail,
}  
```
3、 接口路由  **service>loginout.js**
```javascript
module.exports = {
	路由名称: 函数,
	login : function(req,res){
		//一般在这里进行数据请求
	}
};
```
4、 接口路由配置  **service>api.json**   
```javascript
一级路由:[请求方式，接口名称]
一级路由:{
    二级路由:［请求方式，接口名称］
}(或)
一级路由/二级路由: ［请求方式，接口名称］,

"/loginout":["get(post)","login"],       //一级路由默认索引到对应的"一级路由名称.js".接口对应"loginout.js>login"
(或者)
"/loginout": {                     
    "/":["get(post)","login"]           //与上面的"/loginout"功能相同
    "/login": ["get","login"]
}    
```
