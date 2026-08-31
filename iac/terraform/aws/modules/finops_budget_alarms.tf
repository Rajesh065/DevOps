# DevPulse FinOps AWS Budget & Cost Anomaly Alerts Module

resource "aws_budgets_budget" "devops_monthly_budget" {
  name              = "devpulse-monthly-cloud-budget"
  budget_type       = "COST"
  limit_amount      = "60000"
  limit_unit        = "USD"
  time_unit         = "MONTHLY"
  time_period_start = "2026-01-01_00:00"

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 80
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = ["finops-alerts@devpulse.io"]
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 100
    threshold_type             = "PERCENTAGE"
    notification_type          = "FORECASTED"
    subscriber_email_addresses = ["sre-leads@devpulse.io"]
  }

  cost_types {
    include_tax          = true
    include_subscription = true
    use_blended          = false
    include_refund       = false
    include_credit       = false
    include_upfront      = true
    include_recurring    = true
    include_other_subscription = true
    include_support      = true
    include_discount     = true
    use_amortized        = false
  }
}

resource "aws_ce_anomaly_monitor" "service_monitor" {
  name              = "DevPulseServiceCostAnomalyMonitor"
  monitor_type      = "DIMENSIONAL"
  monitor_dimension = "SERVICE"
}

resource "aws_ce_anomaly_subscription" "anomaly_subscription" {
  name      = "DevPulseHighImpactCostAnomalyAlerts"
  frequency = "IMMEDIATE"
  monitor_arn_list = [
    aws_ce_anomaly_monitor.service_monitor.arn
  ]

  subscriber {
    type    = "EMAIL"
    address = "finops-alerts@devpulse.io"
  }

  threshold_expression {
    dimension {
      key           = "ANOMALY_TOTAL_IMPACT_ABSOLUTE"
      values        = ["500"]
      match_options = ["GREATER_THAN_OR_EQUAL"]
    }
  }
}
