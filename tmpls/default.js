`${info.status.toUpperCase()}:${info.alerts.length}  [${info.commonLabels.alertname}](#)

${info.alerts.map(p => `--------------------------------  

**告警级别:**  ${({ 'normal': '💚', 'yellow': '💛💛', 'red': '❤❤❤' })[p.labels.severity] ?? '💚'}  

**触发时间:**   \`${dayjs(p.startsAt).format('YYYY-MM-DD HH:mm:ss')}\`  

**事件信息:**  
${Object.entries(p.annotations).map(([k, v]) => `> - ${k}:  ${v}`).join('\n')}

**事件标签:**  
${Object.entries(p.labels).map(([k, v]) => `> - ${k}:  ${v}`).join('\n')}

`).join('')}


`