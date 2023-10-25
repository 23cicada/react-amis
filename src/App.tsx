import { render as renderAmis } from 'amis';
import axios from 'axios';
// import clipboardCopy from 'clipboard-copy';
import 'amis/lib/helper.css';
import 'amis/sdk/iconfont.css';
import 'amis/lib/themes/antd.css';

const data = {
  "type": "page",
  "initApi":"${api}?type=target&date_m=${DATETOSTR(date, 'YYYY-MM')}&org=${ISEMPTY(org) ? '8102': org}",
  "name":"report",
  "title": "test",
  "body": [
    {
      "type": "form",
      "id": "u:ace512b5f769",
      "title": "查询条件",
      "mode": "horizontal",
      "body": [
        {
          "type": "select",
          "label": "机构名称：",
          "name": "org",
          "id": "u:55c479a72b3e",
          "multiple": false,
          "searchable": true,
          "mode": "inline",
          "source": "${api}?type=org&date=&org=",
          "selectFirst": true,
          "size": "md",
          "value":"8102"
        },
        {
          "type": "input-month",
          "label": "查询月份：",
          "name": "date",
          "id": "u:c7a017b06709",
          "placeholder": "请选择月份",
          "valueFormat": "X",
          "displayFormat": "YYYY-MM",
          "minDate": "",
          "maxDate": "",
          "value": "${TODAY()}",
          "mode": "inline",
          "clearable": false
        }
      ],
      "actions": [
        {
          "type": "submit",
          "label": "查询",
          "level": "primary",
          "id": "u:8d8e00f67021"
        }
      ],
      "horizontal": {
        "left": 2,
        "right": 10,
        "offset": 2
      },
      "target": "report",
      "name": "search"
    },
    {
      "type": "flex",
      "className": "p-1",
      "items": [
        {
          "type": "container",
          "body": [
            {
              "type": "tabs",
              "tabs": [
                {
                  "title": "收支趋势图",
                  "body": [
                    {
                      "type": "chart",
                      "api":"${api}?type=${quota}&date_y=${DATETOSTR(date, 'YYYY')}&org=${ISEMPTY(org) ? '8102': org}",
                      "config": {
                        "xAxis": {
                          "type": "category",
                          "data": "${rq}",
                          "boundaryGap": false
                        },
                        "yAxis": {
                          "type": "value"
                        },
                        "series": [
                          {
                            "data": "${res_old}",
                            "type": "line",
                            "name": "${DATETOSTR(DATEMODIFY(date, -1, 'years'), 'YYYY')}"
                          },
                          {
                            "name": "${DATETOSTR(date, 'YYYY')}",
                            "type": "line",
                            "data": "${res}"
                          }
                        ],
                        "title": {
                          "text": ""
                        },
                        "tooltip": {
                          "trigger": "axis"
                        },
                        "legend": {
                          "data": [
                            "${DATETOSTR(DATEMODIFY(date, -1, 'years'), 'YYYY')}",
                            "${DATETOSTR(date, 'YYYY')}"
                          ]
                        },
                        "grid": {
                          "left": "3%",
                          "right": "4%",
                          "bottom": "3%",
                          "containLabel": true
                        }
                      },
                      "replaceChartOption": true,
                      "id": "u:12ffb8e17ec3",
                      "dataFilter": ""
                    }
                  ],
                  "id": "u:d03ab83e0ef2"
                }
              ],
              "id": "u:2c75e718b58b",
              "toolbar": [
                {
                  "type": "radios",
                  "label": "",
                  "name": "quota",
                  "options": [
                    {
                      "label": "利润",
                      "value": "profit"
                    },
                    {
                      "label": "收入",
                      "value": "income"
                    },
                    {
                      "label": "支出",
                      "value": "expend"
                    }
                  ],
                  "id": "u:701d06de426f",
                  "selectFirst": true,
                  "value": "profit"
                }
              ],
              "tabsMode": "simple"
            }
          ],
          "size": "xs",
          "style": {
            "position": "static",
            "display": "block",
            "flex": "1 1 auto",
            "flexGrow": 1,
            "flexBasis": "auto",
            "background":"#ffffff"
          },
          "wrapperBody": false,
          "isFixedHeight": false,
          "isFixedWidth": false,
          "id": "u:a96ab46d32f6"
        },
        {
          "type": "container",
          "body": [
          ],
          "size": "xs",
          "style": {
            "position": "static",
            "display": "block",
            "flex": "0 0 auto"
          },
          "wrapperBody": false,
          "isFixedHeight": false,
          "isFixedWidth": false,
          "id": "u:b9a0c747130e"
        },
        {
          "type": "container",
          "body": [
            {
              "type": "grid",
              "columns": [
                {
                  "body": [
                    {
                      "type": "static-image",
                      "name": "image_m",
                      "innerClassName": "no-border",
                      "id": "u:eb850f2f5dfb"
                    }
                  ],
                  "md": "auto",
                  "id": "u:87672c067672"
                },
                {
                  "body": [
                    {
                      "type": "tpl",
                      "tpl": "<h3>本月利润(${DATETOSTR(date, 'YYYY-MM')})</h3>\n<h2><strong>￥${profit}</strong></h2>",
                      "inline": true,
                      "id": "u:f5802aa486ea"
                    }
                  ],
                  "id": "u:fba778f6fb20"
                }
              ],
              "id": "u:0f5faef43723",
              "valign": "middle"
            },
            {
              "type": "grid",
              "columns": [
                {
                  "body": [
                    {
                    }
                  ],
                  "md": 1,
                  "id": "u:87672c067672"
                },
                {
                  "body": [
                    {
                      "type": "tpl",
                      "tpl": "上月利润："
                    }
                  ],
                  "md": "auto",
                  "id": "u:87672c067672"
                },
                {
                  "body": [
                    {
                      "type": "tpl",
                      "tpl": "￥${profit_old}"
                    }
                  ],
                  "md": "auto"
                },
                {
                  "body": [
                    {
                      "type": "tpl",
                      "tpl": "${notice1}："
                    }
                  ],
                  "md": "auto"
                },
                {
                  "body": [
                    {
                      "type": "tpl",
                      "classNameExpr": "<%= data.profit_gr > 0 ? 'text-danger' : 'text-success' %>",
                      "tpl": "${profit_gr}"
                    }
                  ],
                  "md": "auto"
                }
              ],
              "id": "u:d946ceb8cb3d"
            },
            {
              "type": "grid",
              "columns": [
                {
                  "body": [
                    {
                      "type": "divider",
                      "id": "u:01a82c45b3be",
                      "lineStyle": "solid",
                      "direction": "horizontal",
                      "rotate": 0
                    }
                  ]
                }
              ]
            },
            {
              "type": "grid",
              "columns": [
                {
                  "body": [
                    {
                      "type": "static-image",
                      "name": "image_y",
                      "innerClassName": "no-border",
                      "id": "u:af7eb0a6b4b3"
                    }
                  ],
                  "md": "auto",
                  "id": "u:87672c067672"
                },
                {
                  "body": [
                    {
                      "type": "tpl",
                      "tpl": "<h3>本年累计利润(${DATETOSTR(date, 'YYYY')})</h3>\n<h2><strong>￥${profit_total}</strong></h2>",
                      "inline": true,
                      "id": "u:f5802aa486ea"
                    }
                  ],
                  "id": "u:fba778f6fb20"
                }
              ],
              "id": "u:0f5faef43723",
              "valign": "middle"
            }
          ],
          "size": "none",
          "style": {
            "position": "static",
            "display": "flex",
            "flex": "1 1 auto",
            "flexGrow": 0,
            "flexWrap": "nowrap",
            "flexDirection": "column",
            "flexBasis": "20%",
            "background": "#ffffff"
          },
          "wrapperBody": false,
          "isFixedHeight": false,
          "isFixedWidth": false,
          "id": "u:51f4ff02b60c"
        }
      ],
      "style": {
        "position": "relative"
      },
      "id": "u:4df199bdb40f"
    },
    {
      "type": "flex",
      "className": "p-1",
      "items": [
        {
          "type": "container",
          "body": [
            {
              "type": "tabs",
              "tabs": [
                {
                  "id": "u:8273015445ec",
                  "type": "flex",
                  "className": "p-1",
                  "items": [
                    {
                      "type": "container",
                      "body": {
                        "type": "service",
                        "api": "${api}?type=incomeDetail&date_m=${DATETOSTR(date, 'YYYY-MM')}&org=${ISEMPTY(org) ? '8102': org}",
                        "body": [
                          {
                            "type": "table",
                            "source": "$rows",
                            "columns": [
                              {
                                "name": "engine",
                                "label": "收入科目",
                                "id": "u:75b7cfba4d54",
                                "type": "text"
                              },
                              {
                                "type": "text",
                                "label": "本月金额(${DATETOSTR(date, 'YYYY-MM')})",
                                "id": "u:6c719296d18b",
                                "name": "profit",
                                "value": false
                              },
                              {
                                "type": "text",
                                "label": "本年累计金额(${DATETOSTR(date, 'YYYY')})",
                                "name": "profit_total",
                                "id": "u:924ae14d8f17"
                              }
                            ],
                            "affixRow": [
                              {
                                "type": "text",
                                "text": "总计",
                                "id": "u:6d63dc75a9e7",
                                "inline": true,
                                "className": "text-md"
                              },
                              {
                                "type": "tpl",
                                "tpl": "${rows|pick:profit|sum}",
                                "id": "u:1b3332e69973",
                                "className": "text-md"
                              },
                              {
                                "type": "tpl",
                                "tpl": "${rows|pick:profit_total|sum}",
                                "id": "u:65e637f48e0d",
                                "className": "text-md"
                              }
                            ],
                            "affixRowClassName": "text-primary"
                          }
                        ]
                      },
                      "size": "xs",
                      "style": {
                        "position": "static",
                        "display": "block",
                        "flex": "1 1 auto",
                        "flexGrow": 1,
                        "flexBasis": "auto"
                      },
                      "wrapperBody": false,
                      "isFixedHeight": false,
                      "isFixedWidth": false,
                      "id": "u:239694986c44"
                    },
                    {
                      "type": "container",
                      "body": {
                        "type": "service",
                        "api": "${api}?type=expendDetail&date_m=${DATETOSTR(date, 'YYYY-MM')}&org=${ISEMPTY(org) ? '8102': org}",
                        "body": [
                          {
                            "type": "table",
                            "source": "$rows",
                            "columns": [
                              {
                                "name": "engine",
                                "label": "支出科目",
                                "id": "u:75b7cfba4d54",
                                "type": "text"
                              },
                              {
                                "type": "text",
                                "label": "本月金额(${DATETOSTR(date, 'YYYY-MM')})",
                                "id": "u:6c719296d18b",
                                "name": "profit",
                                "value": false
                              },
                              {
                                "type": "text",
                                "label": "本年累计金额(${DATETOSTR(date, 'YYYY')})",
                                "name": "profit_total",
                                "id": "u:924ae14d8f17"
                              }
                            ],
                            "affixRow": [
                              {
                                "type": "text",
                                "text": "总计",
                                "id": "u:e74a984ee460",
                                "inline": true,
                                "className": "text-md"
                              },
                              {
                                "type": "tpl",
                                "tpl": "${rows|pick:profit|sum}",
                                "id": "u:1dd8952278e6",
                                "className": "text-md"
                              },
                              {
                                "type": "tpl",
                                "tpl": "${rows|pick:profit_total|sum}",
                                "id": "u:36abbe225f3f",
                                "className": "text-md"
                              }
                            ],
                            "affixRowClassName": "text-primary"
                          }
                        ]
                      },
                      "size": "xs",
                      "style": {
                        "position": "static",
                        "display": "block",
                        "flex": "1 1 auto",
                        "flexGrow": 1,
                        "flexBasis": "auto"
                      },
                      "wrapperBody": false,
                      "isFixedHeight": false,
                      "isFixedWidth": false,
                      "id": "u:0f527c95cf1f"
                    }
                  ],
                  "style": {
                    "position": "relative",
                    "inset": "auto",
                    "flexWrap": "nowrap"
                  },
                  "isFixedHeight": false,
                  "isFixedWidth": false,
                  "themeCss": {
                    "baseControlClassName": {
                      "background:default": "linear-gradient(0deg,#ffffff 0%,#fff 100%)"
                    }
                  },
                  "title": "收支明细统计"
                }
              ],
              "id": "u:2c75e718b58b",
              "toolbar": [
              ],
              "tabsMode": "simple",
              "className": ""
            }
          ],
          "size": "xs",
          "style": {
            "position": "static",
            "display": "block",
            "flex": "1 1 auto",
            "flexGrow": 1,
            "flexBasis": "auto",
            "background":"#ffffff"
          },
          "wrapperBody": false,
          "isFixedHeight": false,
          "isFixedWidth": false,
          "id": "u:a96ab46d32f6"
        }
      ],
      "style": {
        "position": "relative"
      },
      "id": "u:4df199bdb40f"
    }
  ],
  "id": "u:7e8792e12d6b",
  "pullRefresh": {
    "disabled": true
  },
  "regions": [
    "body"
  ],
  "style": {
    "background": "#f4f4f4"
  },
  "data": {
    "api": "http://192.168.10.241:6009/syd/amis/fyquery.do",
    "image_m":"http://localhost/public/月利润.png",
    "image_y":"http://localhost/public/年利润.png"
  }
}

function App() {
  return renderAmis(
      data,
      {
        // props...
        // locale: 'en-US' // 请参考「多语言」的文档
        // scopeRef: (ref: any) => (amisScoped = ref)  // 功能和前面 SDK 的 amisScoped 一样
      },
      {
        // 下面三个接口必须实现
        fetcher: ({
          url, // 接口地址
          method, // 请求方法 get、post、put、delete
          data, // 请求数据
          responseType,
          config, // 其他配置
          headers // 请求头
        }: any) => {
          config = config || {};
          config.withCredentials = false;
          responseType && (config.responseType = responseType);

          if (config.cancelExecutor) {
            config.cancelToken = new (axios as any).CancelToken(
                config.cancelExecutor
            );
          }

          config.headers = headers || {};

          if (method !== 'post' && method !== 'put' && method !== 'patch') {
            if (data) {
              config.params = data;
            }

            return (axios as any)[method](url, config);
          } else if (data && data instanceof FormData) {
            config.headers = config.headers || {};
            config.headers['Content-Type'] = 'multipart/form-data';
          } else if (
              data &&
              typeof data !== 'string' &&
              !(data instanceof Blob) &&
              !(data instanceof ArrayBuffer)
          ) {
            data = JSON.stringify(data);
            config.headers = config.headers || {};
            config.headers['Content-Type'] = 'application/json';
          }

          return (axios as any)[method](url, data, config);
        },
        isCancel: (value: any) => (axios as any).isCancel(value),
        // copy: content => {
        //   copy(content);
        //   toast.success('内容已复制到粘贴板');
        // },
        theme: 'antd'
      }
  )
}

export default App;
