exports.template = function(body) {
    //prometheus alert manager webhook ： https://prometheus.io/docs/alerting/configuration/#webhook_config
    var alerts = body.alerts;
    var content = alerts.map(
        alert => {
            return [`Name:${alert.labels.alertname}`]
            .concat(Object.entries(alert.labels).map(label => `${label[0]}:${label[1]}`))
            .concat("Annotations:")
            .concat(Object.entries(alert.annotations).map(annotation => `${annotation[0]}:${annotation[1]}`))
            .join("\n")
        }
    ).concat(`Status:${body.status}`).join("\n\n");
    return {

        type: "text",
        textMsg: {
            content: content
        }
    }
}