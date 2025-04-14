import React, {useEffect, useRef} from 'react';
import {DrawerProps} from '../../types/DrawerProps';
import ReactDom from 'react-dom';
import Button from '../button/Button';

const Drawer: React.FC<DrawerProps> = function (props) {
  const {
    title,
    open,
    mask = true,
    confirmText,
    cancelText,
    confirmLoading,
    confirmDisabled,
    padding,
    width = 320
  } = props;
  const drawer = useRef<HTMLDivElement>(null);
  const shadow = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const m = drawer.current!;
    const s = shadow.current!;
    if (!open) {
      if (s.classList.contains('show')) {
        s.classList.add('hide');
      }
      if (m.classList.contains('uni-drawer-show')) {
        m.classList.add('uni-drawer-hide');
        m.onanimationend = function () {
          m.classList.remove('uni-drawer-hide');
          m.classList.remove('uni-drawer-show');
          s.classList.remove('hide');
          s.classList.remove('show');
          m.onanimationend = null;
        };
      }
    } else {
      if (mask) {
        s.classList.add('show');
      }
      m.classList.add('uni-drawer-show');
    }
  }, [open]);

  const cancel = () => {
    props.onCancel && props.onCancel();
  };
  const confirm = () => {
    props.onConfirm && props.onConfirm();
  };
  const El = (
    <>
      <div className={`uni-shadow-mask ${mask ? 'mask' : ''}`} ref={shadow}></div>
      <div
        className="uni-drawer"
        style={{ width: `${width}px` }}
        ref={drawer}
      >
        <div className="uni-drawer-header">
          <span>{ title }</span>
          <span
            onClick={cancel}
            className="close"
          >
            <span className="iconfont icon-nav_shut"></span>
          </span>
        </div>
        <div
          className="uni-drawer-content"
          style={ { padding: padding + 'px', height: props.footer === null ? 'calc(100vh - 61px)' : 'calc(100vh - 122px)'}}
        >
          { props.children }
        </div>
        {
          (() => {
            if (props.footer === null) return null;
            else return <div className="uni-drawer-footer">
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
    </>);
  return ReactDom.createPortal(El, document.body);
};
export default Drawer;
