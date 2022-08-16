import React from 'react'
import {Button} from 'ppfish'
import { useRouter, useBeforeLeave } from '../packages/react-router-manage/index';
import { Outlet, useParams } from 'react-router-dom';

export const Page = () => {
    const { currentRoute, navigate, routesMap } = useRouter();
    useBeforeLeave((to, from, next) => {
        next(); // 跳转
    })
    return (<div>
        <span>
        当前所在路由 {currentRoute.title}
        </span>
        <Button data-testid="__test_button" onClick={() => navigate(routesMap.PAGE2.path)}>跳转到page2</Button>
        <Button data-testid="__test_button_params" onClick={() => navigate(routesMap.PAGE5.path, {params: {id: 'apps'}})}>跳转到page5</Button>
    </div>)
}

export const Page2 = () => {
    const { currentRoute, navigate, routesMap } = useRouter();
    const onAddRoutes = useCallback(() => {
        console.log(123)
    }, [])
    return (<div>
        <span>
        当前所在路由 {currentRoute.title}
        </span>
        
        <Button onClick={() => navigate(routesMap.page1.path)}>跳转到pag1</Button>

        <Button onClick={() => onAddRoutes}>添加路由</Button>
    </div>)
}

const Page3 = () => {
    const { currentRoute, navigate, routesMap } = useRouter();

    return (<div>
        <span>
        当前所在路由 {currentRoute.title}
        </span>
    </div>)
}

const Page4 = () => {
    const { currentRoute, navigate, routesMap } = useRouter();

    return (<div>
        <span>
        当前所在路由 {currentRoute.title}
        </span>
        <Outlet />
    </div>)
}

const Page4Child = () => {
    return <div>
        这是子路由
    </div>
}

const Page5 = () => {
    const params = useParams()
    return <div>
        这是 params 页面
        <span>params: ${params.id}</span>
    </div>
}

export const routes = [
    {
        name: 'ROOT',
        title: '根路径',
        path: '/a',
        redirect: '/page1',
        code: ['staff'],
        items: [
            {
                name: 'PAGE1',
                title: '页面1',
                path: 'page1',
                component: Page,
                code: 'staff',
            },
            {
                name: 'PAGE2',
                title: '页面2',
                path: 'page2',
                code: 'admin',
                items: [
                    {
                        name: 'PAGE2_1',
                        title: '页面2-1',
                        path: 'page2_1',
                        items: [
                            {
                                name: 'PAGE2_1_1',
                                title: '页面2-1-1',
                                path: 'page2_1_1',
                                component: Page,
                            },
                            {
                                name: 'PAGE2_1_2',
                                title: '页面2-1-2',
                                path: 'page2_1_2',
                                component: Page,
                            },
                            {
                                name: 'PAGE2_1_2_detail',
                                title: '页面2-1-2详情',
                                path: 'page2_1_2/detail',
                                component: Page,
                                hidden: true,
                            }
                        ]
                    },
                    {
                        name: 'PAGE2_2',
                        title: '页面2-2',
                        path: 'noJump',
                        component: Page2,
                        beforeEnter: (to, next) => {
                            // console.log(to) // 不跳转
                        }
                    },
                    {
                        name: 'PAGE2_3',
                        title: '页面2-3',
                        path: 'jump',
                        component: Page,
                        beforeEnter: (to, next) => {
                            next(); // 正常跳转
                        }
                    },
                ]
            },
            {
                name: 'PAGE3',
                title: '页面3',
                path: 'page3',
                component: Page3,
                code: (route) => {
                    // ....
                    return true;
                },
            },
            {
                name: 'PAGE4',
                title: '页面4',
                path: '/a/page4',
                component: Page4,
                code: 'staff',
                children: [
                    {
                        name: 'PAGE4_1',
                        title: '页面4-1',
                        path: '/a/page4/page4-1',
                        component: Page4Child,
                        code: 'staff',
                    }
                ]
            },
            {
                name: 'PAGE5',
                title: '页面4',
                path: '/a/page5/:id',
                component: Page5,
                code: 'staff'
            },
            {
                name: 'PAGE6',
                title: '页面6',
                path: '/a/page6',
                code: 'staff',
                items: [
                    {
                        name: 'PAGE6_1',
                        title: '页面6_1',
                        path: '/a/page6/page6_1',
                        component: Page,
                        code: 'admin'
                    },
                    {
                        name: 'PAGE6_2',
                        title: '页面6_2',
                        path: '/a/page6/page6_2',
                        component: Page,
                        code: 'staff'
                    },
                ]
            }
        ]
    }
]
