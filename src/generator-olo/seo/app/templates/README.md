### editorconfig 配置

sublime-text插件：EditorConfig

其余编辑器插件下载参考：http://editorconfig.org/#download

### eslint配置与运行代码检查，使用Airbnb JavaScript代码标准

~~```npm install eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y eslint -g```~~


~~```eslint <file_name>```~~
** 更新：**

```
install --save-dev eslint-config-airbnb-base eslint@^3.0.1 eslint-plugin-import@^1.10.3
```
.eslintrc通用配置：
* ES6 标准：
    ```"extends": "airbnb-base"```
* ES5 标准：
   ```"extends": "airbnb-base/legacy"```

### eslint 检查 sublime text 配置

1. 安装检查插件`SublimeLinter`，`SublimeLinter-contrib-eslint`

2. 配置文件：.eslintrc

3. 错误信息显示在sublime text 的 status bar 

#### Webstorm相关配置：
1. eslint 检查模式：
    * Background：实时检查
    * Load/save ：读取保存时检查
    * Save only ：保存时检查
    * Manual ：手动检查

2. gutter theme：报错显示样式配置

3. mark style : 代码标记样式

4. 配置 sublime text status bar
    * 安装插件`PackageResourceViewer`
    * ctrl-shift-p  > open Resource > Theme - Default > Default : sublime-theme
    * 加入：
    ```    
    {
        "class": "label_control",
        "parents": [{"class": "status_bar"}],
        "font.size": 15（自定义）
    }
    ```

### eslint 检查 Webstorm 配置
1. setting > Languages and Frameworks > JavaScript > Code Quality Tools > ESLint > ESlint package 选择本项目安装的 eslint包

2. 配置文件：.eslintrc

3. configuration file 选择 search for .eslintrc
