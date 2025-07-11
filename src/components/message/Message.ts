const initMessageContent = () => {
  const el = document.querySelector('.uni-message-content');
  if (el) return el as HTMLDivElement;
  else {
    const div = document.createElement('div');
    div.classList.add('uni-message-content');
    document.body.appendChild(div);
    return div as HTMLDivElement;
  }
};

type MessageType = 'success' | 'warning' | 'error' | 'info';
// 消息队列元素接口
interface MessageQueueItem {
  message: string;
  type: MessageType;
}

const iconMap: Record<MessageType, string> = {
  success: 'icon-ic_success',
  warning: 'icon-icon-Fill',
  error: 'icon-cuowu',
  info: 'icon-icon-Fill'
};
export default class Message {
  private content: HTMLDivElement;
  private queue: MessageQueueItem[] = []; // 消息队列
  private isProcessing = false; // 队列处理状态标志
  constructor () {
    this.content = initMessageContent();
  }

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;
    this.isProcessing = true;
    while (this.queue.length > 0) {
      const item = this.queue.shift()!; // 从队列取出第一条消息
      this.showToast(item.message, item.type); // 显示消息
      await new Promise(resolve => setTimeout(resolve, 120)); // 等待200ms
    }
    this.isProcessing = false;
  }
  private showToast (message: string, type: MessageType) {
    const itemWrapper = document.createElement('div');
    const item = document.createElement('div');
    const icon = document.createElement('span');
    const text = document.createElement('span');
    text.innerText = message;
    icon.classList.add('uni-iconfont', 'iconfont', iconMap[type]);
    item.appendChild(icon);
    item.appendChild(text);
    itemWrapper.appendChild(item);
    itemWrapper.classList.add('uni-message-item-wrapper', type);
    this.content.appendChild(itemWrapper);
    setTimeout(() => {
      itemWrapper.classList.add('fade-out');
      itemWrapper.addEventListener('animationend', () => {
        itemWrapper.classList.remove('fade-out');
        this.content.removeChild(itemWrapper);
      });
    }, 3000);
  }

  private addToQueue(message: string, type: MessageType) {
    this.queue.push({ message, type }); // 消息入队
    this.processQueue(); // 触发队列处理
  }

  success (msg: string) {
    this.addToQueue(msg, 'success');
  }

  warning (msg: string) {
    this.addToQueue(msg, 'warning');
  }

  error (msg: string) {
    this.addToQueue(msg, 'error');
  }

  info (msg: string) {
    this.addToQueue(msg, 'info');
  }
}