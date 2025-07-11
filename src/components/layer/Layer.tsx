import { message, Spin, Button } from 'antd';
import { createRoot } from 'react-dom/client';
import React, { useEffect, useState } from 'react';
import Message from '../message/Message';

interface ModalProps {
  title: React.ReactNode;
  content: React.ReactNode;
  hideIcon?: boolean;
  confirmText?: string;
  cancelText?: string;
  onlyConfirmBtn?: boolean;
  danger?: boolean;
  iconType?: 'warning' | 'success';
  closable?: boolean;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
}

function Modal (props: ModalProps) {
  let {
    title,
    content,
    confirmText,
    cancelText,
    hideIcon = false,
    onConfirm,
    onCancel,
    onlyConfirmBtn, // 是不是提示框，如果只是提示框那么只需要一个按钮
    danger,
    iconType = 'warning',
    closable
  } = props;

  if (onlyConfirmBtn && !confirmText) {
    confirmText = '我知道了';
  }

  const locationChanged = () => {
    //  页面路径发生了变化，意味着当前页面的所有的提示框都要清除掉
    const el = document.querySelectorAll('.uni-shadow-mask-alert');
    el.forEach(i => document.body.removeChild(i));
  };
  useEffect(() => {
    window.addEventListener('popstate', locationChanged);
    return function () {
      window.removeEventListener('popstate', locationChanged);
    };
  }, []);
  const [loading, setLoading] = useState(false);

  const destoryModal = () => {
    const el = document.querySelector('.uni-shadow-mask-alert') as HTMLElement;
    const modal = el.querySelector('.uni-modal-alert')!;
    modal.classList.add('uni-modal-alert-hide');
    el.classList.add('hide');
    el.onanimationend = function () {
      document.body.removeChild(el);
      el.onanimationend = null;
    };
  };

  const cancel = async () => {
    try {
      setLoading(true);
      await onCancel?.();
    } finally {
      setLoading(false);
      destoryModal();
    }
  };

  const confirm = async () => {
    setLoading(true);
    try {
      await onConfirm?.();
      destoryModal();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="uni-modal-alert">
      <div className="uni-modal-alert-container">
        {
          !hideIcon && <span className={`iconfont icon ${iconType === 'warning' ? 'icon-tips-alert' : 'icon-ic_success'}`} />
        }
        <div className="uni-alert-right">
          <div className="uni-alert-right-title">
            <span>{ title }</span>
            {
              closable && <span className="iconfont icon-nav_shut" onClick={cancel} />
            }
          </div>
          <div className="uni-alert-right-content">{ content }</div>
        </div>
      </div>
      <div className="uni-modal-alert-btn">
        {
          !onlyConfirmBtn && <Button
            onClick={cancel}
          >
            { cancelText || '取消' }
          </Button>
        }
        <Button
          type="primary"
          danger={danger}
          onClick={confirm}
          loading={loading}
        >
          { confirmText || '确定' }
        </Button>
      </div>
    </div>
  );
}

export default (() => {
  const uniMessage = new Message();
  return {
    error: function (s: string) {
      uniMessage.error(s);
    },
    msg: function (s: string) {
      uniMessage.success(s);
    },
    warn: function (s: string) {
      uniMessage.warning(s);
    },
    info: function (s: string) {
      uniMessage.info(s);
    },
    confirm: function (props: ModalProps) {
      // if (document.querySelector('.uni-shadow-mask-alert')) return false;
      const div = document.createElement('div');
      div.classList.add('uni-shadow-mask');
      div.classList.add('mask');
      div.classList.add('uni-shadow-mask-alert');
      div.classList.add('show');
      document.body.appendChild(div);
      const root = createRoot(div);
      root.render(
        <Modal {...props} danger={props.danger} />
      );

    },
    alert: function (props: ModalProps) {
      // if (document.querySelector('.uni-shadow-mask-alert')) return false;
      const div = document.createElement('div');
      div.classList.add('uni-shadow-mask');
      div.classList.add('mask');
      div.classList.add('uni-shadow-mask-alert');
      div.classList.add('show');
      document.body.appendChild(div);
      const root = createRoot(div);
      root.render(
        <Modal
          {...props}
          onlyConfirmBtn
          danger={props.danger}
        />
      );
    },
    loading (msg = '加载中···') {
      const loadingNode = document.querySelectorAll('.uni-loading');
      if (loadingNode && loadingNode.length > 0) return false;
      const container = document.createElement('div');
      container.classList.add('uni-loading');
      document.body.appendChild(container);
      const root = createRoot(container);
      root.render(<Spin spinning fullscreen tip={msg} />);
    },
    closeLoading () {
      const loadingNode = document.querySelectorAll('.uni-loading');
      loadingNode.forEach(i => {
        document.body.removeChild(i);
      });
    }
  };
})();
