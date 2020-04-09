import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.less';

const store = configureStore();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

// B/C 架构下， 开发模式下用 HtmlWebpackPlugin 创建 html 的文件是 root div 标签的
if (!document.getElementById('root')) {
  const root = document.createElement('div');
  root.id = 'root';
  document.querySelector('body')!.appendChild(root);
}

document.addEventListener('DOMContentLoaded', () =>
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  )
);
