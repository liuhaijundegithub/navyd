### 使用

```bash
yarn add unid
```

### 更新日志

> [change log](https://github.com/liuhaijundegithub/unid/blob/master/CHANGELOG.zh-CN.md)

### 颜色系统

内置的颜色

```css
:root {
  --uni-border-color: #D9E0EC;
  --uni-font-color-grey: #8C99B0;
  --uni-main-color: #118DF9;
  --uni-border-radius: 4px;
  --uni-font-color: #393939;
}
```

> NOTICE: **如需有更改主题色的需求，将您的项目中的这些颜色变量覆盖即可**
>
> ！！！--uni-main-color必须使用十六进制

### Button

| 名称     | 类型                                 | 是否必传 | 默认值  | 描述         |
| -------- | ------------------------------------ | -------- | ------- | ------------ |
| type     | `primary\| danger \| default \| link` | 否       | default | 按钮的类型   |
| disabled | boolean                              | 否       | false   | 是否禁用按钮 |
| size     | `large \| small \| normal`           | 否       | normal  | 按钮的大小   |
| loading  | boolean                              | 否       | false   | 按钮loading  |

### Modal

| 名称            | 类型             | 是否必传 | 默认值       | 描述                                                                        |
| --------------- | ---------------- | -------- | ------------ | --------------------------------------------------------------------------- |
| open            | boolean          | 是       | false        | 是否显示Modal                                                               |
| title           | string           | 否       |              | Modal的标题                                                                 |
| width           | number           | 否       | 400          | Modal的宽度                                                                 |
| confirmText     | string           | 否       | ‘’确定‘’ | 确认按钮的文案                                                              |
| cancelText      | string           | 否       | ‘’取消‘’ | 取消按钮的文案                                                              |
| confirmLoading  | boolean          | 否       | false        | 确定按钮是否loading状态                                                     |
| confirmDisabled | boolean          | 否       | false        | 确定按钮是否disabled状态                                                    |
| noPadding       | boolean          | 否       | false        | Modal的content元素padding置为0                                              |
| footer          | null\| ReactNode | 否       |              | 为null则没有footer部分，不传默认为居中的按钮组，否则footer为传递的ReactNode |
| onCancel        | () => void       | 否       |              | 点击取消或者关闭icon触发的回调                                              |
| onConfirm       | () => void       | 否       |              | 点击确定按钮触发的回调                                                      |

### layer

| 方法                          | 描述                     |
| ----------------------------- | ------------------------ |
| loading(msg = '加载中···') | 打开一个全屏的loading    |
| closeLoading()                | 关闭全屏的loading        |
| alert(props: ModalProps)      | 显示一个modal形状的通知  |
| confirm(props: ModalProps)    | 打开一个确认框           |
| error(message: string)        | 显示一个toast 错误消息   |
| msg(message: string)          | 显示一个toast 成功消息   |
| warn(message: string)         | 显示一个toast 警告消息   |
| info(message: string)         | 显示一个toast 普通的消息 |

### Drawer

| 名称            | 类型             | 是否必传 | 默认值       | 描述                                                                        |
| --------------- | ---------------- | -------- | ------------ | --------------------------------------------------------------------------- |
| open            | boolean          | 是       | false        | 是否显示Drawer                                                              |
| mask            | boolean          | 否       | true         | 是否显示遮罩层                                                              |
| title           | ReactNode        | 否       |              | Drawer的标题                                                                |
| width           | number           | 否       | 320          | Drawer的宽度                                                                |
| confirmText     | string           | 否       | ‘’确定‘’ | 确认按钮的文案                                                              |
| cancelText      | string           | 否       | ‘’取消‘’ | 取消按钮的文案                                                              |
| confirmLoading  | boolean          | 否       | false        | 确定按钮是否loading状态                                                     |
| confirmDisabled | boolean          | 否       | false        | 确定按钮是否disabled状态                                                    |
| padding         | number           | 否       | 16           | Drawer的content元素padding                                                  |
| footer          | null\| ReactNode | 否       |              | 为null则没有footer部分，不传默认为右侧的按钮组，否则footer为传递的ReactNode |
| onCancel        | () => void       | 否       |              | 点击取消或者关闭icon触发的回调                                              |
| onConfirm       | () => void       | 否       |              | 点击确定按钮触发的回调                                                      |
