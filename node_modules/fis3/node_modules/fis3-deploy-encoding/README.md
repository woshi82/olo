# fis3-deploy-encoding

## INSTALL

```bash
npm install [-g] fis3-deploy-encoding
```

## USE

```js
fis.match('**', {
    charset: 'gbk',
    deploy: [
        fis.plugin('encoding'),
        fis.plugin('local-deliver')
    ]
});
```

> encoding 处理以后文本内容变为 buffer 类型，无法再进行文本 replace 操作，所以文本 replace 操作应该在转码之前
