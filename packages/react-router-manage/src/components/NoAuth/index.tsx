import React from 'react';

const PageConfig = {
  '401': {
    title: '无权限查看该页面',
    img: '//ysf.qiyukf.net/yx/9c9ce7793b3c0657da5d80e740a89681',
  },
  '404': {
    title: '页面不存在',
    img: 'https://ysf.nosdn.127.net/ysh/6be90dea7806767fe65e7b48982b7a61',
  },
} as Record<string, {title: string; img: string}>;

const NoAuth: React.FC<{ code?: string }> = ({ code = '401' }) => {
  const config = PageConfig[code];
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        height: '100%',
        flexDirection: 'column',
        borderRadius: 8,
      }}
    >
      <img alt={config.title} width={200} src={config?.img} />
      <div
        style={{ color: '#666666', lineHeight: '22px', textAlign: 'center', marginTop: 16 }}
      >
        {config.title}
      </div>
    </div>
  );
};

NoAuth.displayName = 'NoAuth';

export default NoAuth;
