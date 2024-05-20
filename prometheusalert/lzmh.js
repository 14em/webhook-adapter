exports.template = function(body) {
    //prometheus alert manager webhook ： https://prometheus.io/docs/alerting/configuration/#webhook_config
    // 1. 除了prometheus, 额外兼容skyworking 入参格式
    /*
      [{
         "scopeId": 1,
         "scope": "SERVICE",
         "name": "serviceA",
         "id0": 12,
         "id1": 0,
         "ruleName": "service_resp_time_rule",
         "alarmMessage": "alarmMessage xxxx",
         "startTime": 1560524171000
        }]
     */
    var alerts = body.alerts;
    var content;
    if (alerts !== undefined) {
        content = alerts.map(
            alert => {
                return [`Name:${alert.labels.alertname}`]
                    .concat(Object.entries(alert.labels).map(label => `${label[0]}:${label[1]}`))
                    .concat("Annotations:")
                    .concat(Object.entries(alert.annotations).map(annotation => `${annotation[0]}:${annotation[1]}`))
                    .join("\n")
            }
        ).concat(`Status:${body.status}`).join("\n\n");
    } else {
        content = body.map(
            alert => {
                return [`Name:${alert.name}`]
                    .concat(`scope:${alert.scope}`)
                    .concat(`ruleName:${alert.ruleName}`)
                    .concat(`alarmMessage:${alert.alarmMessage}`)
                    .join("\n")
            }
        ).concat(``).join("\n\n");
    }

    return {

        type: "text",
        textMsg: {
            content: content
        }
    }
}
