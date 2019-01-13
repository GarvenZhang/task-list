# indexedDB文档

## task对象仓库

```javascript
{
  id: String,
  name: String,
  priority: Number,
  startTime: String,
  endTime: String,
  status: Number,
  recordId: String
}
```

### startTime/deadline

形如 `yyyy-mm-dd hh-mm`

### status

+ 0: 目前任务
+ 1: 短期计划
+ 2: 长期计划

## record对象仓库

```javascript
{
  id: String,
  recordList: [
    {
      id: String,
      time: String,
      progress: Number,
      type: Number,
      record: String,
      img: Array
    }
  ]
}
```

### type

+ 0: 进度记录
+ 1: 任务步骤
+ 2: 总结反省

### img

如 `img: [imgId, imgId, ...]`

## img对象仓库

```javascript
{
  id: String,
  name: String,
  src: String,
  blob: Blob
}
```


