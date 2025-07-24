import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactDom from 'react-dom';
import { ModalProps } from '../../types/ModalProps';
import { CommonHTMLAttributes } from '../../types/global';
import { Button } from 'antd';
import classNames from 'classnames';
import { ConfigContext } from '../configProvider/ConfigProvider';

const defaultZIndex = 900;

const Modal: React.FC<ModalProps & Omit<CommonHTMLAttributes, 'title'>> = function (props) {
  const contextValue = React.useContext(ConfigContext);

  const model = useMemo(() => {
    return Object.assign({ ...props }, contextValue.modal);
  }, [...Object.values(props)]);


  const {
    title = '标题',
    open,
    confirmText,
    cancelText,
    confirmLoading,
    confirmDisabled,
    noPadding,
    width = 400,
    mask = true,
    buttonAlign = 'center'
  } = model;

  const modal = useRef<HTMLDivElement>(null);
  const shadow = useRef<HTMLDivElement>(null);

  const [zIndex, setZIndex] = useState(defaultZIndex);

  useEffect(() => {
    const m = modal.current!;
    const s = shadow.current!;
    if (!open) {
      if (s.classList.contains('show')) {
        m.classList.add('uni-modal-hide');
        s.classList.add('hide');
        setZIndex(defaultZIndex);
        m.onanimationend = function () {
          m.classList.remove('uni-modal-hide');
          m.classList.remove('uni-modal-show');
          s.classList.remove('hide');
          s.classList.remove('show');
          m.onanimationend = null;
        };
      }
    } else {
      const showEls = document.querySelectorAll('.uni-shadow-mask.show');
      if (showEls && showEls.length) {
        setZIndex(defaultZIndex + showEls.length * 50);
      }
      s.classList.add('show');
      m.classList.add('uni-modal-show');
    }
  }, [open]);

  const cancel = () => {
    props.onCancel && props.onCancel();
  };
  const confirm = () => {
    props.onConfirm && props.onConfirm();
  };

  const El = (
    <div
      className={`uni-shadow-mask ${mask ? 'mask' : ''}`}
      ref={shadow}
      style={{ zIndex }}
    >
      <div
        className="uni-modal"
        style={{ width: `${width}px`}}
        ref={modal}
      >
        <div className="uni-modal-header">
          <span>{ title }</span>
          <span
            className="close"
            onClick={cancel}
          >
            {/* <IconFont type="icon-nav_shut" /> */}
            <span className="iconfont icon-nav_shut"></span>
          </span>
        </div>
        <div
          className="uni-modal-content"
          style={ noPadding ? { padding: 0 } : {}}
        >
          { props.children }
        </div>
        {
          (() => {
            if (props.footer === null) return null;
            else return <div className={classNames('uni-modal-footer', buttonAlign)}>
              {
                props.footer ? props.footer : <>
                  <Button onClick={cancel}>{cancelText || '取消'}</Button>
                  <Button type="primary" loading={confirmLoading} onClick={confirm} disabled={confirmDisabled}>{ confirmText || '确定' }</Button>
                </>
              }
            </div>;
          })()
        }
      </div>
    </div>
  );

  return ReactDom.createPortal(El, document.body);
};

export default Modal;
